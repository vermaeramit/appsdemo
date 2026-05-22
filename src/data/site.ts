// Single source of truth for site-wide branding. Edit values here and they
// propagate to nav, footer, SEO meta, sitemap, and structured data.
export const site = {
  name: "AppsDemo",
  domain: "appsdemo.in",
  url: "https://appsdemo.in",
  tagline: "Software that runs your business — not the other way around.",
  description:
    "AppsDemo builds modern SaaS tools for small businesses. Start with TravelERP, a multi-tenant travel CRM with lead-to-booking workflows, public quotes, and email/WhatsApp follow-ups.",
  contactEmail: "info@appsdemo.in",
  phone: "+918529983656",                   // E.164 — used for tel: links
  phoneDisplay: "+91 85299 83656",          // human-readable, used in body text
  whatsapp: "918529983656",                 // E.164 without leading + — used for wa.me links
  whatsappMessage: "Hi AppsDemo, I'm interested in your services.",
  twitter: "@appsdemo",
  founded: 2018,
  projectsDelivered: 100,                   // "100+" — bump as the count grows
  // SEO: Google Search Console verification token. After verifying your
  // domain in GSC, paste the 'content' value of the meta tag they provide
  // (just the token, not the full tag). Empty string = no meta emitted.
  googleSiteVerification: "",
  // Analytics: Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX).
  // Empty string = no gtag scripts emitted.
  ga4MeasurementId: "G-P6294NVTNB",
  // Monetisation: Google AdSense Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX).
  // Empty string = no AdSense loader emitted. Auto-ads activate from the
  // AdSense dashboard once this is live and the site is approved.
  adsensePublisherId: "ca-pub-1017227658621829",
  // Used by ContactForm — replace with a real handler URL (Formspree / Web3Forms)
  // or leave blank to fall back to mailto:.
  formEndpoint: "",
  socials: [
    { name: "Email",    href: "mailto:info@appsdemo.in",                                                              icon: "mail" },
    { name: "WhatsApp", href: "https://wa.me/918529983656?text=Hi%20AppsDemo%2C%20I%27m%20interested%20in%20your%20services.", icon: "whatsapp" },
    { name: "GitHub",   href: "https://github.com/",                                                                  icon: "github" },
    { name: "LinkedIn", href: "https://linkedin.com/",                                                                icon: "linkedin" },
  ],
} as const;

export const nav = [
  { label: "Products",  href: "/#products" },
  { label: "Services",  href: "/services" },
  { label: "Work",      href: "/portfolio" },
  { label: "Blog",      href: "/blog" },
  { label: "Pricing",   href: "/pricing" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
] as const;
