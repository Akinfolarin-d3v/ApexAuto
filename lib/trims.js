/**
 * There's no `trims` field in the data model (see the brief's schema), so
 * trims are derived deterministically from the base car. Swap this for a
 * real `trims` subcollection later with zero changes to the checkout flow —
 * it only ever consumes { id, label, priceDelta, features }.
 */
export function generateTrims(car) {
  return [
    {
      id: "base",
      label: `${car.model} — Standard`,
      priceDelta: 0,
      blurb: "Exactly as listed — no changes.",
      features: [],
    },
    {
      id: "premium",
      label: `${car.model} — Premium Package`,
      priceDelta: 3800,
      blurb: "Adds premium audio, ambient lighting, and heated/ventilated front seats.",
      features: ["Premium Audio Upgrade", "Ambient Interior Lighting", "Heated & Ventilated Seats"],
    },
    {
      id: "performance",
      label: `${car.model} — Performance Package`,
      priceDelta: 7200,
      blurb: "Adds upgraded brakes, sport-tuned suspension, and unique wheels.",
      features: ["Upgraded Brake Package", "Sport-Tuned Suspension", "20\" Performance Wheels"],
    },
  ];
}
