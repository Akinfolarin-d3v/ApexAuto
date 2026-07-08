import { formatMileage } from "@/lib/utils";

export default function SpecGrid({ car }) {
  const specs = [
    { label: "Year", value: car.year },
    { label: "Mileage", value: formatMileage(car.mileage) },
    { label: "Condition", value: car.condition },
    { label: "Body Type", value: car.bodyType },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Transmission", value: car.transmission },
    { label: "Drivetrain", value: car.drivetrain },
    { label: "Color", value: car.color },
    { label: "Horsepower", value: `${car.horsepower} hp` },
    car.fuelType === "Electric"
      ? { label: "Range", value: `${car.range} mi` }
      : { label: "Fuel Range", value: `${car.range} mi` },
    { label: "0–60 mph", value: `${car.zeroToSixty}s` },
    { label: "Stock #", value: car.stockNumber },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label}>
          <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400">{spec.label}</p>
          <p className="mt-1 text-sm font-medium text-ink">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}
