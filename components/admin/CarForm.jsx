"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/cars";
import { STATUS_OPTIONS } from "@/constants/filters";
import ImageUploader from "@/components/admin/ImageUploader";
import TagInput from "@/components/admin/TagInput";
import Button from "@/components/ui/Button";

const FUEL_TYPES = ["Gasoline", "Hybrid", "Plug-in Hybrid", "Electric", "Diesel"];
const DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD"];
const BODY_TYPES = ["Sedan", "SUV", "Coupe", "Truck", "Hatchback", "Convertible", "Wagon"];
const CONDITIONS = ["New", "Used", "Certified Pre-Owned"];

const EMPTY_CAR = {
  title: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  mileage: "",
  condition: "Used",
  stockNumber: "",
  transmission: "",
  fuelType: "Gasoline",
  drivetrain: "AWD",
  bodyType: "Sedan",
  color: "",
  horsepower: "",
  range: "",
  category: "best-value",
  description: "",
  features: [],
  galleryImages: [],
  status: "available",
  featured: false,
};

export default function CarForm({ initialCar, onSubmit, mode = "create" }) {
  const router = useRouter();
  const [car, setCar] = useState(() => ({ ...EMPTY_CAR, ...initialCar }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(patch) {
    setCar((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit({
        ...car,
        year: Number(car.year),
        price: Number(car.price),
        mileage: Number(car.mileage),
        horsepower: Number(car.horsepower) || 0,
        range: Number(car.range) || 0,
      });
      router.push("/admin/cars");
    } catch (err) {
      setError(err.message || "Something went wrong saving this vehicle.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10">
      <p className="eyebrow bg-trust-tint text-trust-dim">
        {mode === "create" ? "New listing" : "Edit listing"}
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tightest md:text-4xl">
        {mode === "create" ? "Add a Car" : "Edit Car"}
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Field label="Car name / title">
            <input
              required
              value={car.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="e.g. Porsche Taycan GTS"
              className="input"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Make">
              <input required value={car.make} onChange={(e) => update({ make: e.target.value })} className="input" />
            </Field>
            <Field label="Model">
              <input required value={car.model} onChange={(e) => update({ model: e.target.value })} className="input" />
            </Field>
            <Field label="Year">
              <input
                type="number"
                required
                value={car.year}
                onChange={(e) => update({ year: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Stock # / VIN">
              <input
                required
                value={car.stockNumber}
                onChange={(e) => update({ stockNumber: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Price (USD)">
              <input
                type="number"
                required
                min={0}
                value={car.price}
                onChange={(e) => update({ price: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Mileage">
              <input
                type="number"
                required
                min={0}
                value={car.mileage}
                onChange={(e) => update({ mileage: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Condition">
              <select value={car.condition} onChange={(e) => update({ condition: e.target.value })} className="input">
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Color">
              <input value={car.color} onChange={(e) => update({ color: e.target.value })} className="input" />
            </Field>
            <Field label="Transmission">
              <input
                required
                value={car.transmission}
                onChange={(e) => update({ transmission: e.target.value })}
                placeholder="e.g. 8-Speed Auto"
                className="input"
              />
            </Field>
            <Field label="Fuel Type">
              <select value={car.fuelType} onChange={(e) => update({ fuelType: e.target.value })} className="input">
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </Field>
            <Field label="Drivetrain">
              <select value={car.drivetrain} onChange={(e) => update({ drivetrain: e.target.value })} className="input">
                {DRIVETRAINS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="Body Type">
              <select value={car.bodyType} onChange={(e) => update({ bodyType: e.target.value })} className="input">
                {BODY_TYPES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Horsepower">
              <input
                type="number"
                min={0}
                value={car.horsepower}
                onChange={(e) => update({ horsepower: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={car.fuelType === "Electric" ? "Range (mi)" : "Fuel Range (mi)"}>
              <input
                type="number"
                min={0}
                value={car.range}
                onChange={(e) => update({ range: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required
              rows={4}
              value={car.description}
              onChange={(e) => update({ description: e.target.value })}
              className="input resize-none"
            />
          </Field>

          <Field label="Features">
            <TagInput tags={car.features} onChange={(features) => update({ features })} />
          </Field>

          <Field label="Photos">
            <ImageUploader images={car.galleryImages} onChange={(galleryImages) => update({ galleryImages })} />
          </Field>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-steel-200 p-5">
            <Field label="Category">
              <select value={car.category} onChange={(e) => update({ category: e.target.value })} className="input">
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </Field>

            <div className="mt-5">
              <Field label="Availability">
                <select value={car.status} onChange={(e) => update({ status: e.target.value })} className="input">
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <label className="mt-5 flex cursor-pointer items-center justify-between rounded-lg bg-steel-50 p-3 text-sm">
              <span className="text-steel-600">Feature this car on the homepage</span>
              <input
                type="checkbox"
                checked={car.featured}
                onChange={(e) => update({ featured: e.target.checked })}
                className="h-4 w-4 rounded accent-ink"
              />
            </label>
          </div>

          {error && <p className="text-sm text-velocity">{error}</p>}

          <Button type="submit" disabled={saving} size="lg" className="disabled:opacity-50">
            {saving ? "Saving…" : mode === "create" ? "Publish Listing" : "Save Changes"}
          </Button>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(228 231 236);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: #0b1013;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-steel-500">{label}</span>
      {children}
    </label>
  );
}
