import { feedLinkFactory } from "./shared/feed-link-factory.js";

/**
 * Brands excluded from import and all product listings.
 * To re-enable a brand: remove it from this array and redeploy.
 */
export const HIDDEN_BRANDS: string[] = [
  "Vans", // feed broken — will be replaced with new feed
];

export interface Feed {
  id: number;
  name: string;
  country: string;
  region: string; // Region code for subdomain routing (na, eu, me, apac, etc.)
  url: string;
  sourceCount: number;
}

// Region mapping for subdomains
// na.shoetopia.com, eu.shoetopia.com, me.shoetopia.com, apac.shoetopia.com
export const REGIONS: Record<
  string,
  { name: string; countries: string[]; currency: string; subdomain: string }
> = {
  na: {
    name: "North America",
    countries: ["US", "CA"],
    currency: "USD",
    subdomain: "",
  }, // Default, no subdomain
  eu: {
    name: "Europe",
    countries: ["GB", "DE", "FR", "IT", "NL", "IE"],
    currency: "EUR",
    subdomain: "eu",
  },
  me: {
    name: "Middle East",
    countries: ["AE", "SA", "KW", "BH", "QA"],
    currency: "AED",
    subdomain: "uae",
  },
  apac: {
    name: "Asia Pacific",
    countries: ["AU", "NZ", "SG", "HK"],
    currency: "AUD",
    subdomain: "au",
  },
};

// Get region from country code
export function getRegionFromCountry(country: string): string {
  for (const [region, config] of Object.entries(REGIONS)) {
    if (config.countries.includes(country)) return region;
  }
  return "na"; // Default to North America
}

export const FEEDS: Feed[] = [
  // ==================== NORTH AMERICA (US/CA) ====================
  // US Feeds
  {
    id: 280,
    name: "Famous Footwear",
    country: "US",
    region: "na",
    sourceCount: 184696,
    url: feedLinkFactory(280, "1.966B"),
  },
  {
    id: 462,
    name: "Florsheim",
    country: "US",
    region: "na",
    sourceCount: 10034,
    url: feedLinkFactory(462, "1.D36"),
  },
  {
    id: 619,
    name: "Bloomingdale's",
    country: "US",
    region: "na",
    sourceCount: 571377,
    url: feedLinkFactory(619, "1.362B"),
  },
  {
    id: 157064,
    name: "Nunn Bush",
    country: "US",
    region: "na",
    sourceCount: 5079,
    url: feedLinkFactory(157064, "1.8937"),
  },
  {
    id: 157129,
    name: "e.l.f. Cosmetics",
    country: "US",
    region: "na",
    sourceCount: 915,
    url: feedLinkFactory(157129, "1.9B2C"),
  },
  {
    id: 158350,
    name: "UGG",
    country: "US",
    region: "na",
    sourceCount: 6080,
    url: feedLinkFactory(158350, "1.AAD0"),
  },
  {
    id: 158405,
    name: "New Balance",
    country: "US",
    region: "na",
    sourceCount: 33832,
    url: feedLinkFactory(158405, "156074.16980605F8ED38F1"),
  },
  {
    id: 158794,
    name: "Finish Line",
    country: "US",
    region: "na",
    sourceCount: 152473,
    url: feedLinkFactory(158794, "1.9363"),
  },
  {
    id: 158953,
    name: "Naturalizer",
    country: "US",
    region: "na",
    sourceCount: 6121,
    url: feedLinkFactory(158953, "1.9669"),
  },
  {
    id: 158958,
    name: "LifeStride",
    country: "US",
    region: "na",
    sourceCount: 12797,
    url: feedLinkFactory(158958, "1.9668"),
  },
  {
    id: 159550,
    name: "Shoemall",
    country: "US",
    region: "na",
    sourceCount: 255422,
    url: feedLinkFactory(159550, "1.93D7"),
  },
  {
    id: 160396,
    name: "Keds",
    country: "US",
    region: "na",
    sourceCount: 6444,
    url: feedLinkFactory(160396, "156085.A809D0"),
  },
  {
    id: 161992,
    name: "Nautica",
    country: "US",
    region: "na",
    sourceCount: 11417,
    url: feedLinkFactory(161992, "156052.14F1"),
  },
  {
    id: 162750,
    name: "Banana Republic",
    country: "US",
    region: "na",
    sourceCount: 19339,
    url: feedLinkFactory(162750, "156074.63235322F430017"),
  },
  {
    id: 163728,
    name: "Steve Madden",
    country: "US",
    region: "na",
    sourceCount: 13556,
    url: feedLinkFactory(163728, "1.926F"),
  },
  // { id: 166134, name: 'Vans US', ... },  // disabled — broken feed, new feed TBD
  {
    id: 172460,
    name: "L.L. Bean",
    country: "US",
    region: "na",
    sourceCount: 71922,
    url: feedLinkFactory(172460, "1.9716"),
  },
  {
    id: 178509,
    name: "Shopbop",
    country: "US",
    region: "na",
    sourceCount: 121987,
    url: feedLinkFactory(178509, "1.A570"),
  },
  {
    id: 179233,
    name: "FitFlop",
    country: "US",
    region: "na",
    sourceCount: 3449,
    url: feedLinkFactory(179233, "1.A107"),
  },
  {
    id: 180034,
    name: "ASICS",
    country: "US",
    region: "na",
    sourceCount: 24139,
    url: feedLinkFactory(180034, "1.A024"),
  },
  {
    id: 180375,
    name: "ECCO",
    country: "US",
    region: "na",
    sourceCount: 5073,
    url: feedLinkFactory(180375, "1.9A86"),
  },
  {
    id: 180392,
    name: "Savannah's",
    country: "US",
    region: "na",
    sourceCount: 1375,
    url: feedLinkFactory(180392, "1.8F0B"),
  },
  {
    id: 182964,
    name: "Sam Edelman",
    country: "US",
    region: "na",
    sourceCount: 7399,
    url: feedLinkFactory(182964, "156052.1CA6"),
  },
  {
    id: 186487,
    name: "Estee Lauder",
    country: "US",
    region: "na",
    sourceCount: 879,
    url: feedLinkFactory(186487, "1.8DDA"),
  },
  {
    id: 188219,
    name: "Calvin Klein",
    country: "US",
    region: "na",
    sourceCount: 54819,
    url: feedLinkFactory(188219, "1.A935"),
  },
  {
    id: 190243,
    name: "SHIEKH",
    country: "US",
    region: "na",
    sourceCount: 46474,
    url: feedLinkFactory(190243, "156052.2082"),
  },
  {
    id: 193368,
    name: "Clothing Shop Online",
    country: "US",
    region: "na",
    sourceCount: 92296,
    url: feedLinkFactory(193368, "156052.2197"),
  },
  {
    id: 196493,
    name: "Sperry",
    country: "US",
    region: "na",
    sourceCount: 8239,
    url: feedLinkFactory(196493, "156085.9A5006"),
  },
  {
    id: 196522,
    name: "Cole Haan",
    country: "US",
    region: "na",
    sourceCount: 6898,
    url: feedLinkFactory(196522, "1.B2CA"),
  },
  {
    id: 200092,
    name: "FootJoy",
    country: "US",
    region: "na",
    sourceCount: 8444,
    url: feedLinkFactory(200092, "2.D3F0627B84BE09CB"),
  },
  {
    id: 202021,
    name: "Dansko",
    country: "US",
    region: "na",
    sourceCount: 1982,
    url: feedLinkFactory(202021, "156052.243E"),
  },
  {
    id: 203305,
    name: "Hoka One",
    country: "US",
    region: "na",
    sourceCount: 11916,
    url: feedLinkFactory(203305, "1.AAD1"),
  },
  {
    id: 205419,
    name: "Marc Jacobs",
    country: "US",
    region: "na",
    sourceCount: 2128,
    url: feedLinkFactory(205419, "156052.2092"),
  },
  {
    id: 206852,
    name: "Teva",
    country: "US",
    region: "na",
    sourceCount: 3908,
    url: feedLinkFactory(206852, "1.AAD2"),
  },
  {
    id: 214564,
    name: "Circus NY",
    country: "US",
    region: "na",
    sourceCount: 1562,
    url: feedLinkFactory(214564, "156052.2514"),
  },
  {
    id: 214878,
    name: "Fenty Beauty",
    country: "US",
    region: "na",
    sourceCount: 770,
    url: feedLinkFactory(214878, "1.A752"),
  },
  {
    id: 225532,
    name: "Shop Simon",
    country: "US",
    region: "na",
    sourceCount: 1534420,
    url: feedLinkFactory(225532, "1.C639"),
  },
  {
    id: 227940,
    name: "K-Swiss",
    country: "US",
    region: "na",
    sourceCount: 2045,
    url: feedLinkFactory(227940, "156052.26E4"),
  },
  {
    id: 228012,
    name: "Stuart Weitzman Outlet",
    country: "US",
    region: "na",
    sourceCount: 1405,
    url: feedLinkFactory(228012, "1.BC12"),
  },
  {
    id: 230436,
    name: "Palladium Boots",
    country: "US",
    region: "na",
    sourceCount: 1468,
    url: feedLinkFactory(230436, "156052.26E5"),
  },
  // Canada
  {
    id: 163464,
    name: "Gap Canada",
    country: "CA",
    region: "na",
    sourceCount: 27684,
    url: feedLinkFactory(163464, "156074.7021E08D28AEFD8A"),
  },
  {
    id: 215755,
    name: "Little Burgundy",
    country: "CA",
    region: "na",
    sourceCount: 12385,
    url: feedLinkFactory(215755, "2.2F4451133E1F9950"),
  },

  // ==================== EUROPE (UK/DE/FR/IT/NL/IE) ====================
  {
    id: 208234,
    name: "Foot Locker UK",
    country: "GB",
    region: "eu",
    sourceCount: 29881,
    url: feedLinkFactory(208234, "156178.134C9"),
  },
  {
    id: 229298,
    name: "Safety Brands UK",
    country: "GB",
    region: "eu",
    sourceCount: 157,
    url: feedLinkFactory(229298, "156155.2416CE"),
  },
  // { id: 245484,    name: 'Vans UK', ... },   // disabled — broken feed, new feed TBD
  {
    id: 212455,
    name: "UGG DE",
    country: "DE",
    region: "eu",
    sourceCount: 2758,
    url: feedLinkFactory(212455, "156178.BB13"),
  },
  {
    id: 230089,
    name: "Palladium DE",
    country: "DE",
    region: "eu",
    sourceCount: 5427,
    url: feedLinkFactory(230089, "156244.20FFFC"),
  },
  // { id: 245484001, name: 'Vans DE', ... },   // disabled — broken feed, new feed TBD
  // { id: 245484002, name: 'Vans FR', ... },   // disabled — broken feed, new feed TBD
  // { id: 245484003, name: 'Vans IT', ... },   // disabled — broken feed, new feed TBD
  // { id: 245484004, name: 'Vans NL', ... },   // disabled — broken feed, new feed TBD
  // { id: 245484005, name: 'Vans IE', ... },   // disabled — broken feed, new feed TBD

  // ==================== MIDDLE EAST (UAE) ====================
  {
    id: 233135,
    name: "Adidas UAE",
    country: "AE",
    region: "me",
    sourceCount: 64312,
    url: feedLinkFactory(233135, "156173.C60E"),
  },

  // ==================== ASIA PACIFIC (AU) ====================
  {
    id: 190557,
    name: "Florsheim AU",
    country: "AU",
    region: "apac",
    sourceCount: 321,
    url: feedLinkFactory(190557, "156124.9968"),
  },
  {
    id: 215707,
    name: "UGG Express AU",
    country: "AU",
    region: "apac",
    sourceCount: 4977,
    url: feedLinkFactory(215707, "156182.298125E4"),
  },
];

export const CURRENCY: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  AU: "AUD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  NL: "EUR",
  IE: "EUR",
  AE: "AED",
};

// Get feeds by region
export function getFeedsByRegion(region: string): Feed[] {
  return FEEDS.filter((f) => f.region === region);
}
