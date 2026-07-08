const CONDITION_MULTIPLIER = {
  excellent: 1,
  good: 0.9,
  fair: 0.75,
  poor: 0.55,
};

/**
 * A transparent, deterministic estimate — not a real valuation API. Every
 * input maps predictably to the output so the number never feels random,
 * which matters more than pinpoint accuracy for a transparent, explained
 * estimate like this.
 */
export function estimateTradeInValue({ year, mileage, condition = "good", accidents = "none" }) {
  const currentYear = new Date().getFullYear();
  const age = Math.max(currentYear - Number(year), 0);

  const baseValue = 32000;
  const ageDepreciation = age * 1800;
  const mileageDepreciation = Math.max(Number(mileage) - 12000 * age, 0) * 0.06;
  const accidentDeduction = accidents === "one" ? 1500 : accidents === "multiple" ? 3500 : 0;

  const conditionFactor = CONDITION_MULTIPLIER[condition] ?? 0.9;

  const raw =
    (baseValue - ageDepreciation - mileageDepreciation) * conditionFactor - accidentDeduction;

  return Math.max(Math.round(raw / 50) * 50, 800);
}

export const CONDITION_OPTIONS = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];

export const ACCIDENT_OPTIONS = [
  { value: "none", label: "No accidents" },
  { value: "one", label: "One accident" },
  { value: "multiple", label: "Multiple accidents" },
];

const LOCAL_KEY = "loisnx.tradeInSubmissions";

/** Logs a trade-in estimate request. Firestore `tradeInSubmissions` when
 *  configured, localStorage otherwise — same graceful-fallback pattern as
 *  the rest of /lib. Fire-and-forget; never blocks showing the estimate. */
export async function logTradeInSubmission(formValues, estimatedValue) {
  const { db, isFirebaseConfigured } = await import("@/lib/firebase");
  const submission = { ...formValues, estimatedValue, createdAt: new Date().toISOString() };

  try {
    if (isFirebaseConfigured) {
      const { collection, addDoc } = await import("firebase/firestore");
      await addDoc(collection(db, "tradeInSubmissions"), submission);
      return;
    }
    if (typeof window !== "undefined") {
      const existing = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify([submission, ...existing]));
    }
  } catch {
    // logging is best-effort — never block the user from seeing their estimate
  }
}
