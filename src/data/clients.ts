export type Client = {
  slug: string;
  name: string;
  logo: string;          // path under /public — falls back to text if missing
  url?: string;
  initials?: string;     // fallback when logo file is absent
};

export const clients: Client[] = [
  {
    slug: "view-holiday-trip",
    name: "View Holiday Trip",
    logo: "/clients/view-holiday-trip.png",
    url: "https://viewholidaytrip.co.in/",
    initials: "VHT",
  },
  {
    slug: "skywings",
    name: "Skywings Travels",
    logo: "/clients/skywings.png",
    url: "https://crm.skywingtravels.com/",
    initials: "STC",
  },
  {
    slug: "big-bull-travels",
    name: "Big Bull Travels",
    logo: "/clients/big-bull-travels.png",
    url: "https://bigbulltravels.com/",
    initials: "BBT",
  },
  {
    slug: "scholars-time",
    name: "The Scholars Time",
    logo: "/clients/scholars-time.png",
    url: "https://thescholartime.in/",
    initials: "TST",
  },
];
