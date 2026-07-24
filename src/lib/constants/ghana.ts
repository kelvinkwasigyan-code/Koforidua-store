export const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Eastern",
  "Northern",
  "Western",
  "Central",
  "Volta",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Western North",
  "Oti",
  "Savannah",
  "North East",
] as const;

export type GhanaRegion = (typeof GHANA_REGIONS)[number];

export const KOFORIDUA_CITY = "Koforidua";

/** Matches +233XXXXXXXXX or 0XXXXXXXXX (Ghana mobile/landline) */
export const GHANA_PHONE_REGEX = /^(\+233|0)[2-9]\d{8}$/;

export const PRODUCT_CATEGORIES = [
  "phones",
  "electronics",
  "accessories",
  "sprays-liquids",
] as const;

export type ProductCategorySlug = (typeof PRODUCT_CATEGORIES)[number];
