export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "beta" | "soon";
  href: string;              // marketing page on this site
  appUrl?: string;           // live app URL (e.g. https://crm.appsdemo.in)
  iconColor: string;         // tailwind gradient classes for the icon tile
  icon: string;              // emoji / icon character for now (replace with SVG later)
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "travel-crm",
    name: "TravelERP",
    tagline: "The travel CRM your agents will actually use.",
    description:
      "End-to-end travel agency software: leads, packages with options & day-wise itineraries, public shareable quotes, bookings with installments, hotel vouchers, email & WhatsApp follow-ups — built for small agencies that want to ditch spreadsheets.",
    status: "live",
    href: "/products/travel-crm",
    appUrl: "https://crm.appsdemo.in",
    iconColor: "from-indigo-500 to-cyan-500",
    icon: "✈",
    highlights: [
      "Lead-to-booking pipeline with activity timeline",
      "Multi-option quotes with day-wise itineraries",
      "Public shareable quote + PDF export",
      "Email + WhatsApp follow-ups",
      "Bookings with installment tracking",
      "Hotel voucher generator",
      "Multi-tenant with per-company branding",
      "REST API for website lead capture",
    ],
  },
  {
    slug: "inventory-pro",
    name: "Inventory Pro",
    tagline: "Real-time stock control for growing retailers.",
    description:
      "Multi-location inventory, barcode scanning, supplier POs, low-stock alerts and a beautiful POS — all in one place.",
    status: "soon",
    href: "#",
    iconColor: "from-amber-500 to-rose-500",
    icon: "📦",
    highlights: [
      "Multi-location stock",
      "Barcode scanning & label print",
      "Supplier POs & GRN",
      "Low-stock & re-order alerts",
    ],
  },
  {
    slug: "hr-hub",
    name: "HR Hub",
    tagline: "Payroll, attendance and people ops, simplified.",
    description:
      "Modern HRMS with attendance, leave management, payroll runs and an employee self-service portal.",
    status: "soon",
    href: "#",
    iconColor: "from-emerald-500 to-teal-500",
    icon: "👥",
    highlights: [
      "Attendance & shift planner",
      "Leave workflow",
      "Automated payroll runs",
      "Employee self-service",
    ],
  },
];
