export type Project = {
  slug: string;
  name: string;
  clientSlug: string;          // matches a slug in clients.ts
  url: string;                 // live URL
  category: "Travel CRM" | "Marketing Site" | "Education Platform" | "Exam Portal";
  description: string;
  tech?: string[];
  accent: string;              // tailwind gradient classes for the visual band
  year?: number;
  logo?: string;               // optional project-specific logo (overrides the client logo on the card)
};

export const projects: Project[] = [
  {
    slug: "viewholidaytrip-crm",
    name: "View Holiday Trip — Travel CRM",
    clientSlug: "view-holiday-trip",
    url: "https://viewholidaytrip.co.in/",
    category: "Travel CRM",
    description:
      "Full TravelERP deployment for View Holiday Trip — leads, multi-option packages, public quotes, bookings with installments, hotel vouchers and email/WhatsApp follow-ups.",
    tech: ["ASP.NET Core MVC", "SQL Server", "Multi-tenant"],
    accent: "from-indigo-500 to-cyan-500",
  },
  {
    slug: "skywings-crm",
    name: "Skywings Travels — Travel CRM",
    clientSlug: "skywings",
    url: "https://crm.skywingtravels.com/",
    category: "Travel CRM",
    description:
      "TravelERP for Skywings Travels with custom company branding, per-tenant SMTP and a dedicated subdomain. Same product, fully isolated tenant.",
    tech: ["ASP.NET Core MVC", "SQL Server", "Custom branding"],
    accent: "from-sky-500 to-indigo-500",
  },
  {
    slug: "bigbull-crm",
    name: "Big Bull Travels — Travel CRM",
    clientSlug: "big-bull-travels",
    url: "https://crm.bigbulltravels.com/",
    category: "Travel CRM",
    description:
      "TravelERP deployment for Big Bull Travels powering the agency's lead-to-booking pipeline, quote generation and customer communication.",
    tech: ["ASP.NET Core MVC", "SQL Server", "Multi-tenant"],
    accent: "from-rose-500 to-amber-500",
  },
  {
    slug: "bigbull-site",
    name: "Big Bull Travels — Marketing Site",
    clientSlug: "big-bull-travels",
    url: "https://bigbulltravels.com/",
    category: "Marketing Site",
    description:
      "Customer-facing tour-package site featuring domestic destinations (Goa, Kerala, Himachal) and international packages (Dubai, Egypt, Bali) starting from ₹20,000.",
    tech: ["Responsive", "SEO-optimized", "Lead capture"],
    accent: "from-amber-500 to-rose-500",
  },
  {
    slug: "scholars-time-journal",
    name: "The Scholars Time — Academic Journal",
    clientSlug: "scholars-time",
    url: "https://thescholartime.in/",
    category: "Education Platform",
    description:
      "Peer-reviewed multidisciplinary research journal with submission portal, double-blind referee workflow and published-article catalog for academics and researchers.",
    tech: ["Submission workflow", "Editor portal", "Public archive"],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    slug: "scholars-time-exam",
    name: "The Scholars Time — Exam Portal",
    clientSlug: "scholars-time",
    url: "https://exam.thescholartime.in/",
    category: "Exam Portal",
    description:
      "Online exam platform for competitive Indian exams (HSSC CET Haryana, HTET, Physical Education) with multi-subject test delivery, timed sessions and certification.",
    tech: ["Timed test engine", "Multi-subject", "Result analytics"],
    accent: "from-emerald-500 to-teal-500",
    logo: "/clients/exam.png",
  },
];
