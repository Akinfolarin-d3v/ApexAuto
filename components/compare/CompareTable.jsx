"use client";

import Link from "next/link";
import { X, Check, Minus } from "lucide-react";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { useCompare } from "@/context/store";
import CarMedia from "@/components/ui/CarMedia";
import Button from "@/components/ui/Button";

const SPEC_ROWS = [
  { label: "Price", get: (c) => formatCurrency(c.price) },
  { label: "Year", get: (c) => c.year },
  { label: "Mileage", get: (c) => formatMileage(c.mileage) },
  { label: "Condition", get: (c) => c.condition },
  { label: "Body Type", get: (c) => c.bodyType },
  { label: "Fuel Type", get: (c) => c.fuelType },
  { label: "Transmission", get: (c) => c.transmission },
  { label: "Drivetrain", get: (c) => c.drivetrain },
  { label: "Horsepower", get: (c) => `${c.horsepower} hp` },
  { label: "Range", get: (c) => `${c.range} mi` },
  { label: "0–60 mph", get: (c) => `${c.zeroToSixty}s` },
];

export default function CompareTable({ cars }) {
  const compare = useCompare();
  const allFeatures = Array.from(new Set(cars.flatMap((c) => c.features || [])));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 p-4 text-left align-bottom" />
            {cars.map((car) => (
              <th key={car.id} className="min-w-[220px] p-4 text-left align-bottom">
                <div className="relative overflow-hidden rounded-xl">
                  <CarMedia car={car} className="aspect-[4/3] w-full" />
                  <button
                    type="button"
                    onClick={() => compare.toggle(car.id)}
                    aria-label={`Remove ${car.title} from comparison`}
                    className="absolute right-2 top-2 rounded-full bg-canvas/85 p-1.5 backdrop-blur hover:bg-canvas"
                  >
                    <X size={14} strokeWidth={1.75} />
                  </button>
                </div>
                <p className="mt-3 font-display text-base leading-tight tracking-tightest">{car.title}</p>
                <Link href={`/inventory/${car.id}`} className="mt-2 inline-block">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPEC_ROWS.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-steel-50" : ""}>
              <td className="p-4 text-sm font-medium text-steel-500">{row.label}</td>
              {cars.map((car) => (
                <td key={car.id} className="p-4 font-mono text-sm text-ink">
                  {row.get(car)}
                </td>
              ))}
            </tr>
          ))}

          {allFeatures.map((feature, i) => (
            <tr key={feature} className={(SPEC_ROWS.length + i) % 2 === 0 ? "bg-steel-50" : ""}>
              <td className="p-4 text-sm font-medium text-steel-500">{feature}</td>
              {cars.map((car) => (
                <td key={car.id} className="p-4">
                  {car.features?.includes(feature) ? (
                    <Check size={16} strokeWidth={2} className="text-trust" />
                  ) : (
                    <Minus size={14} strokeWidth={1.75} className="text-steel-300" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
