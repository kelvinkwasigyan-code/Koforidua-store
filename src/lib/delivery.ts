import { GHANA_REGIONS, KOFORIDUA_CITY, type GhanaRegion } from "@/lib/constants/ghana";

export interface DeliveryRate {
  baseFee: number;
  estimatedDays: number;
  label: string;
}

/** Tiered regional delivery rates (GHS) — Eastern/Koforidua is the shop's home base */
const REGIONAL_RATES: Record<GhanaRegion, Omit<DeliveryRate, "label">> = {
  Eastern: { baseFee: 15, estimatedDays: 1 },
  "Greater Accra": { baseFee: 25, estimatedDays: 2 },
  Ashanti: { baseFee: 30, estimatedDays: 2 },
  Central: { baseFee: 30, estimatedDays: 2 },
  Western: { baseFee: 35, estimatedDays: 3 },
  Volta: { baseFee: 35, estimatedDays: 3 },
  Bono: { baseFee: 40, estimatedDays: 3 },
  "Bono East": { baseFee: 40, estimatedDays: 3 },
  Ahafo: { baseFee: 40, estimatedDays: 3 },
  "Western North": { baseFee: 45, estimatedDays: 4 },
  Northern: { baseFee: 50, estimatedDays: 4 },
  Oti: { baseFee: 45, estimatedDays: 4 },
  "Upper East": { baseFee: 55, estimatedDays: 5 },
  "Upper West": { baseFee: 55, estimatedDays: 5 },
  Savannah: { baseFee: 55, estimatedDays: 5 },
  "North East": { baseFee: 55, estimatedDays: 5 },
};

const LOCAL_KOFORIDUA_FEE = 15;
const LOCAL_KOFORIDUA_MAX_FEE = 20;

function isKoforidua(city: string): boolean {
  return city.trim().toLowerCase() === KOFORIDUA_CITY.toLowerCase();
}

export function calculateDeliveryFee(region: string, city: string): DeliveryRate {
  if (!GHANA_REGIONS.includes(region as GhanaRegion)) {
    throw new Error(`Unsupported delivery region: ${region}`);
  }

  const ghanaRegion = region as GhanaRegion;

  if (ghanaRegion === "Eastern" && isKoforidua(city)) {
    return {
      baseFee: LOCAL_KOFORIDUA_FEE,
      estimatedDays: 1,
      label: `Local delivery within ${KOFORIDUA_CITY}`,
    };
  }

  const rate = REGIONAL_RATES[ghanaRegion];

  return {
    ...rate,
    label: `Delivery to ${city}, ${ghanaRegion}`,
  };
}

export function getDeliveryFeeRange(region: string, city: string): { min: number; max: number } {
  const rate = calculateDeliveryFee(region, city);

  if (region === "Eastern" && isKoforidua(city)) {
    return { min: LOCAL_KOFORIDUA_FEE, max: LOCAL_KOFORIDUA_MAX_FEE };
  }

  return { min: rate.baseFee, max: rate.baseFee };
}

export { REGIONAL_RATES };
