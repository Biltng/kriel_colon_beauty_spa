import { SITE } from "./site";

export type ServiceCategory =
  | "Colon Hydrotherapy"
  | "Body Treatments"
  | "Facials"
  | "Laser & Vacuum Therapy"
  | "Waxing & Hair Removal";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Colon Hydrotherapy",
  "Body Treatments",
  "Facials",
  "Laser & Vacuum Therapy",
  "Waxing & Hair Removal",
];

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  priceZAR: number;
  freshaUrl: string;
  category: ServiceCategory;
};

export const SERVICES: Service[] = [
  {
    id: "colon-cleansing",
    name: "Colon Cleansing",
    durationMinutes: 60,
    priceZAR: 550,
    freshaUrl: SITE.freshaBaseUrl,
    category: "Colon Hydrotherapy",
  },
  {
    id: "led-light",
    name: "LED-Light Therapy",
    durationMinutes: 60,
    priceZAR: 350,
    freshaUrl: SITE.freshaBaseUrl,
    category: "Body Treatments",
  },
  {
    id: "dermaplaning",
    name: "Dermaplaning",
    durationMinutes: 60,
    priceZAR: 400,
    freshaUrl: SITE.freshaBaseUrl,
    category: "Facials",
  },
  {
    id: "combo-colon-foot-detox",
    name: "Combo: Colon Cleansing & Foot Detox",
    durationMinutes: 60,
    priceZAR: 900,
    freshaUrl: SITE.freshaBaseUrl,
    category: "Colon Hydrotherapy",
  },
];
