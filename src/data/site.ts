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
  twitter: "@appsdemo",
  founded: 2025,
  // Used by ContactForm — replace with a real handler URL (Formspree / Web3Forms)
  // or leave blank to fall back to mailto:.
  formEndpoint: "",
  socials: [
    { name: "Email",   href: "mailto:info@appsdemo.in", icon: "mail" },
    { name: "GitHub",  href: "https://github.com/",      icon: "github" },
    { name: "LinkedIn",href: "https://linkedin.com/",    icon: "linkedin" },
  ],
} as const;

export const nav = [
  { label: "Products",  href: "/#products" },
  { label: "Services",  href: "/services" },
  { label: "Work",      href: "/portfolio" },
  { label: "Pricing",   href: "/pricing" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
] as const;
