import { Check } from "lucide-react";

export default function FeatureList({ features }) {
  if (!features?.length) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2.5 text-sm text-steel-600">
          <Check size={15} strokeWidth={2} className="shrink-0 text-trust" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
