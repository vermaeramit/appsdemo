import { WorkerMailer } from "worker-mailer";

interface Env {
  ASSETS: Fetcher;
  SMTP_HOST: string;        // e.g. smtp.zoho.in
  SMTP_PORT?: string;       // optional, defaults to 465 (SSL)
  SMTP_USER: string;        // mailbox to authenticate as
  SMTP_PASS: string;        // Zoho App Password
  SMTP_FROM: string;        // From address shown to recipients
  SMTP_TO?: string;         // optional override; defaults to info@appsdemo.in
  TURNSTILE_SECRET?: string; // optional — Cloudflare Turnstile secret key; when absent, captcha check is skipped
}

const ALLOWED_FIELDS = ["name", "email", "phone", "company", "topic", "message"] as const;
const MAX_LEN = { name: 80, email: 120, phone: 20, company: 120, topic: 60, message: 4000 } as const;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/**
 * Verify a Cloudflare Turnstile token. Returns true when:
 * - TURNSTILE_SECRET is not configured (captcha disabled), OR
 * - the token is valid per Cloudflare's siteverify endpoint.
 * Returns false only when captcha IS configured and the token is missing or invalid.
 */
async function verifyTurnstile(token: string, env: Env, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", env.TURNSTILE_SECRET);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch (err) {
    console.error("turnstile siteverify error:", err);
    return false;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  // Parse form data
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, message: "Invalid form data." }, 400);
  }

  // Honeypot — bots tick this, humans don't see it
  const botcheck = form.get("botcheck");
  if (botcheck && botcheck !== "" && botcheck !== "off") {
    return json({ success: true, message: "Thanks!" });
  }

  // Turnstile captcha — only enforced when TURNSTILE_SECRET is configured
  const turnstileToken = form.get("cf-turnstile-response");
  const captchaOk = await verifyTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : "",
    env,
    request.headers.get("CF-Connecting-IP")
  );
  if (!captchaOk) {
    return json({ success: false, message: "Captcha verification failed. Please reload the page and try again." }, 400);
  }

  // Collect + validate
  const data: Record<string, string> = {};
  for (const f of ALLOWED_FIELDS) {
    const v = form.get(f);
    if (typeof v === "string") data[f] = v.trim();
  }

  if (!data.name || !data.email || !data.phone || !data.message) {
    return json({ success: false, message: "Name, email, mobile number and message are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }
  // Loose phone check — must contain at least 7 digits. Allows +, spaces, dashes, parens.
  if ((data.phone.match(/\d/g) || []).length < 7) {
    return json({ success: false, message: "Please enter a valid mobile number." }, 400);
  }
  for (const f of ALLOWED_FIELDS) {
    const max = MAX_LEN[f as keyof typeof MAX_LEN];
    if (data[f] && data[f].length > max) {
      return json({ success: false, message: `${f} is too long.` }, 400);
    }
  }

  const recipient = env.SMTP_TO || "vermaeramit@gmail.com";
  const subject = `[AppsDemo enquiry] ${data.topic || "general"} — ${data.name}`;
  const port = env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : 465;
  const secure = port === 465;

  const textBody = [
    `New enquiry from the AppsDemo website`,
    ``,
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    `Company: ${data.company || "—"}`,
    `Topic:   ${data.topic || "—"}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `— Reply directly to this email to respond to the sender.`,
  ].join("\n");

  const htmlBody = `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;color:#0f172a;max-width:600px">
  <h2 style="color:#4f46e5">New enquiry from the AppsDemo website</h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Name</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Phone</td><td><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a> · <a href="https://wa.me/${escapeHtml(data.phone.replace(/\D/g, ""))}">WhatsApp</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Company</td><td>${escapeHtml(data.company || "—")}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Topic</td><td>${escapeHtml(data.topic || "—")}</td></tr>
  </table>
  <h3 style="margin-top:24px;color:#475569;font-size:13px;text-transform:uppercase;letter-spacing:.08em">Message</h3>
  <p style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0">${escapeHtml(data.message)}</p>
  <p style="color:#64748b;font-size:12px;margin-top:24px">Reply directly to this email to respond to the sender.</p>
</body></html>`;

  try {
    const mailer = await WorkerMailer.connect({
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
      authType: "plain",
      host: env.SMTP_HOST,
      port,
      secure,
    });

    await mailer.send({
      from: { name: "AppsDemo Contact Form", email: env.SMTP_FROM },
      to: { email: recipient },
      replyTo: { name: data.name, email: data.email },
      subject,
      text: textBody,
      html: htmlBody,
    });

    return json({ success: true, message: "Thanks! Your message is on its way." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("contact-form send failed:", msg);
    return json(
      { success: false, message: "We couldn't send your message. Please try again or email us directly." },
      502
    );
  }
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, message: "Invalid form data." }, 400);
  }

  const botcheck = form.get("botcheck");
  if (botcheck && botcheck !== "" && botcheck !== "off") {
    return json({ success: true, message: "Thanks!" });
  }

  // Turnstile captcha — only enforced when TURNSTILE_SECRET is configured
  const turnstileToken = form.get("cf-turnstile-response");
  const captchaOk = await verifyTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : "",
    env,
    request.headers.get("CF-Connecting-IP")
  );
  if (!captchaOk) {
    return json({ success: false, message: "Captcha verification failed. Please reload the page and try again." }, 400);
  }

  const emailRaw = form.get("email");
  const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
  if (!email) return json({ success: false, message: "Please enter an email." }, 400);
  if (email.length > 120) return json({ success: false, message: "Email is too long." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: "Please enter a valid email." }, 400);
  }

  const sourceRaw = form.get("source");
  const source = typeof sourceRaw === "string" ? sourceRaw.slice(0, 60) : "";

  const recipient = env.SMTP_TO || "vermaeramit@gmail.com";
  const port = env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : 465;
  const secure = port === 465;

  const subject = `[AppsDemo subscribe] ${email}`;
  const textBody = [
    `New newsletter subscriber on AppsDemo`,
    ``,
    `Email:  ${email}`,
    `Source: ${source || "—"}`,
    `When:   ${new Date().toISOString()}`,
    ``,
    `— Add this address to whichever mailing list service you use (Brevo, Zoho Campaigns, etc).`,
  ].join("\n");

  const htmlBody = `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;color:#0f172a;max-width:600px">
  <h2 style="color:#4f46e5">New newsletter subscriber</h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">Source</td><td>${escapeHtml(source || "—")}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#64748b">When</td><td>${escapeHtml(new Date().toISOString())}</td></tr>
  </table>
  <p style="color:#64748b;font-size:12px;margin-top:24px">Add this address to whichever mailing list service you use.</p>
</body></html>`;

  try {
    const mailer = await WorkerMailer.connect({
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
      authType: "plain",
      host: env.SMTP_HOST,
      port,
      secure,
    });

    await mailer.send({
      from: { name: "AppsDemo Newsletter", email: env.SMTP_FROM },
      to: { email: recipient },
      subject,
      text: textBody,
      html: htmlBody,
    });

    return json({ success: true, message: "Thanks! You're on the list." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("subscribe send failed:", msg);
    return json(
      { success: false, message: "Couldn't save your subscription. Please try again." },
      502
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "POST") return handleContact(request, env);
      return json({ success: false, message: "Method not allowed." }, 405);
    }

    if (url.pathname === "/api/subscribe") {
      if (request.method === "POST") return handleSubscribe(request, env);
      return json({ success: false, message: "Method not allowed." }, 405);
    }

    // Everything else — fall through to static assets (Astro's dist/)
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
