"use client";

import { formatCurrency, formatMileage } from "@/lib/utils";
import { distinctValues, distinctFeatures, STATUS_OPTIONS } from "@/constants/filters";
import FilterGroup from "@/components/inventory/FilterGroup";
import RangeFilter from "@/components/inventory/RangeFilter";

export default function FilterSidebar({ cars, allCars, filters, setFilters, bounds }) {
  const makes = distinctValues(allCars, "make");
  const bodyTypes = distinctValues(allCars, "bodyType");
  const fuelTypes = distinctValues(allCars, "fuelType");
  const transmissions = distinctValues(allCars, "transmission");
  const drivetrains = distinctValues(allCars, "drivetrain");
  const colors = distinctValues(allCars, "color");
  const features = distinctFeatures(allCars);

  function set(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const countBy = (field) =>
    cars.reduce((acc, car) => {
      acc[car[field]] = (acc[car[field]] || 0) + 1;
      return acc;
    }, {});

  const hasActiveFilters =
    filters.makes.length ||
    filters.bodyTypes.length ||
    filters.fuelTypes.length ||
    filters.transmissions.length ||
    filters.drivetrains.length ||
    filters.colors.length ||
    filters.features.length ||
    filters.status.length !== STATUS_OPTIONS.length ||
    filters.priceMax < bounds.priceMax ||
    filters.yearMin > bounds.yearMin ||
    filters.mileageMax < bounds.mileageMax;

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-display text-lg tracking-tightest">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() =>
              setFilters({
                makes: [],
                bodyTypes: [],
                fuelTypes: [],
                transmissions: [],
                drivetrains: [],
                colors: [],
                features: [],
                status: STATUS_OPTIONS.map((s) => s.value),
                priceMax: bounds.priceMax,
                yearMin: bounds.yearMin,
                mileageMax: bounds.mileageMax,
              })
            }
            className="text-xs font-medium text-velocity underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <RangeFilter
        title="Max Price"
        min={bounds.priceMin}
        max={bounds.priceMax}
        value={filters.priceMax}
        onChange={(v) => set("priceMax", v)}
        format={formatCurrency}
      />

      <RangeFilter
        title="Year (or newer)"
        min={bounds.yearMin}
        max={bounds.yearMax}
        value={filters.yearMin}
        onChange={(v) => set("yearMin", v)}
      />

      <RangeFilter
        title="Max Mileage"
        min={bounds.mileageMin}
        max={bounds.mileageMax}
        value={filters.mileageMax}
        onChange={(v) => set("mileageMax", v)}
        format={formatMileage}
      />

      <FilterGroup
        title="Availability"
        options={STATUS_OPTIONS}
        selected={filters.status}
        onChange={(v) => set("status", v)}
      />

      <FilterGroup
        title="Make"
        options={makes}
        selected={filters.makes}
        onChange={(v) => set("makes", v)}
        counts={countBy("make")}
      />

      <FilterGroup
        title="Body Type"
        options={bodyTypes}
        selected={filters.bodyTypes}
        onChange={(v) => set("bodyTypes", v)}
        counts={countBy("bodyType")}
      />

      <FilterGroup
        title="Fuel Type"
        options={fuelTypes}
        selected={filters.fuelTypes}
        onChange={(v) => set("fuelTypes", v)}
        counts={countBy("fuelType")}
      />

      <FilterGroup
        title="Transmission"
        options={transmissions}
        selected={filters.transmissions}
        onChange={(v) => set("transmissions", v)}
        defaultOpen={false}
      />

      <FilterGroup
        title="Drivetrain"
        options={drivetrains}
        selected={filters.drivetrains}
        onChange={(v) => set("drivetrains", v)}
        defaultOpen={false}
      />

      <FilterGroup
        title="Color"
        options={colors}
        selected={filters.colors}
        onChange={(v) => set("colors", v)}
        defaultOpen={false}
      />

      <FilterGroup
        title="Features"
        options={features}
        selected={filters.features}
        onChange={(v) => set("features", v)}
        defaultOpen={false}
      />
    </aside>
  );
}
