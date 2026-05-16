export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  iconColor: string;         // tailwind gradient classes for the icon tile
  icon: string;              // emoji / icon character
  startsFrom?: string;       // optional pricing hint shown on the card
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    tagline: "Custom AI assistants that actually understand your business.",
    description:
      "RAG-powered chatbots fine-tuned on your own docs, products and SOPs. Deploy on your website, WhatsApp, Slack or as an internal knowledge assistant — with lead capture, human handoff and analytics built in.",
    href: "/services/ai-chatbots",
    iconColor: "from-violet-500 to-fuchsia-500",
    icon: "🤖",
    startsFrom: "₹60,000",
    highlights: [
      "Trained on your docs, site & data (RAG)",
      "Web widget, WhatsApp, Slack or Teams",
      "Multi-language, with handoff to humans",
      "Lead capture + CRM integration",
      "Usage analytics & conversation logs",
      "Built on Claude, GPT-4 or open models",
    ],
  },
  {
    slug: "web-apps",
    name: "Web App Development",
    tagline: "Production web apps your team and customers will love.",
    description:
      "SaaS dashboards, customer portals, internal tools and marketing sites — built on a modern stack (React / Next.js / Astro / .NET) and shipped in weeks, not quarters. Multi-tenant, secure, API-first by default.",
    href: "/services/web-apps",
    iconColor: "from-blue-500 to-indigo-500",
    icon: "</>",
    startsFrom: "₹1,50,000",
    highlights: [
      "SaaS apps, dashboards & customer portals",
      "React, Next.js, Astro, TypeScript, .NET",
      "Auth, roles, payments & APIs out of the box",
      "Cloud deploy (Cloudflare / AWS / Azure)",
      "CI/CD, tests and observability included",
      "Optional ongoing maintenance retainer",
    ],
  },
  {
    slug: "mobile-apps",
    name: "Mobile App Development",
    tagline: "Beautiful native apps without the native-team budget.",
    description:
      "Cross-platform iOS + Android apps with React Native or Flutter — one codebase, native performance. From MVP to store-ready in 8–12 weeks, with push notifications, offline mode and in-app purchases.",
    href: "/services/mobile-apps",
    iconColor: "from-emerald-500 to-teal-500",
    icon: "📱",
    startsFrom: "₹2,00,000",
    highlights: [
      "React Native / Flutter — iOS + Android",
      "Push notifications & deep linking",
      "Offline-first with sync",
      "In-app purchases & subscriptions",
      "App Store + Play Store submission",
      "Crash reporting & analytics wired in",
    ],
  },
];
