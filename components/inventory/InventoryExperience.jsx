"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { STATUS_OPTIONS, PAGE_SIZE } from "@/constants/filters";
import CategoryTabs from "@/components/inventory/CategoryTabs";
import SearchBar from "@/components/inventory/SearchBar";
import SortSelect from "@/components/inventory/SortSelect";
import FilterSidebar from "@/components/inventory/FilterSidebar";
import CarCard from "@/components/ui/CarCard";
import Button from "@/components/ui/Button";

function makeBounds(cars) {
  const prices = cars.map((c) => c.price);
  const years = cars.map((c) => c.year);
  const mileages = cars.map((c) => c.mileage);
  return {
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    yearMin: Math.min(...years),
    yearMax: Math.max(...years),
    mileageMin: Math.min(...mileages),
    mileageMax: Math.max(...mileages),
  };
}

function defaultFilters(bounds) {
  return {
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
  };
}

export default function InventoryExperience({ cars: allCars }) {
  const searchParams = useSearchParams();
  const bounds = useMemo(() => makeBounds(allCars), [allCars]);

  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState(() => defaultFilters(bounds));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const matches = (car) => {
    if (category !== "all" && car.category !== category) return false;
    if (query) {
      const haystack = `${car.title} ${car.make} ${car.model}`.toLowerCase();
      if (!haystack.includes(query.toLowerCase())) return false;
    }
    if (filters.makes.length && !filters.makes.includes(car.make)) return false;
    if (filters.bodyTypes.length && !filters.bodyTypes.includes(car.bodyType)) return false;
    if (filters.fuelTypes.length && !filters.fuelTypes.includes(car.fuelType)) return false;
    if (filters.transmissions.length && !filters.transmissions.includes(car.transmission)) return false;
    if (filters.drivetrains.length && !filters.drivetrains.includes(car.drivetrain)) return false;
    if (filters.colors.length && !filters.colors.includes(car.color)) return false;
    if (filters.features.length && !filters.features.every((f) => car.features?.includes(f))) return false;
    if (!filters.status.includes(car.status)) return false;
    if (car.price > filters.priceMax) return false;
    if (car.year < filters.yearMin) return false;
    if (car.mileage > filters.mileageMax) return false;
    return true;
  };

  const filtered = useMemo(() => {
    const result = allCars.filter(matches);
    const sorted = [...result].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "year-desc":
          return b.year - a.year;
        case "mileage-asc":
          return a.mileage - b.mileage;
        default:
          return (b.featured === true) - (a.featured === true);
      }
    });
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCars, category, query, filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function updateFilters(next) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }

  function updateCategory(next) {
    setCategory(next);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-2 border-b border-steel-200 pb-8">
        <p className="eyebrow bg-trust-tint text-trust-dim">
          {allCars.length} vehicles in stock
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-4xl tracking-tightest md:text-5xl">Inventory</h1>
        </div>
        <div className="mt-4">
          <CategoryTabs value={category} onChange={updateCategory} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <SearchBar value={query} onChange={setQuery} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-steel-200 px-4 py-2.5 text-sm font-medium text-ink lg:hidden"
          >
            <SlidersHorizontal size={15} strokeWidth={1.75} /> Filters
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block">
          <FilterSidebar
            cars={filtered}
            allCars={allCars}
            filters={filters}
            setFilters={updateFilters}
            bounds={bounds}
          />
        </div>

        <div className="flex-1">
          <p className="pb-5 font-mono text-xs uppercase tracking-wide text-steel-500">
            {filtered.length} {filtered.length === 1 ? "match" : "matches"}
          </p>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-steel-300 py-24 text-center">
              <p className="font-display text-xl tracking-tightest">No cars match those filters</p>
              <p className="max-w-sm text-sm text-steel-500">
                Try widening your price range or clearing a filter — the
                right car is probably one adjustment away.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  updateFilters(defaultFilters(bounds));
                  updateCategory("all");
                  setQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((car) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                Load More Vehicles
              </Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-ink/40 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-[85vw] max-w-sm overflow-y-auto bg-canvas p-6"
            >
              <div className="flex items-center justify-between pb-4">
                <span className="font-display text-lg tracking-tightest">Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>
              <FilterSidebar
                cars={filtered}
                allCars={allCars}
                filters={filters}
                setFilters={updateFilters}
                bounds={bounds}
              />
              <Button className="mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
                Show {filtered.length} Vehicles
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
