export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "mileage-asc", label: "Mileage: Lowest First" },
];

export const STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

export const PAGE_SIZE = 6;

/** Pulls distinct values for a field straight out of the live dataset,
 *  so the sidebar never lists an option with zero matching cars. */
export function distinctValues(cars, field) {
  return Array.from(new Set(cars.map((car) => car[field]))).filter(Boolean).sort();
}

export function distinctFeatures(cars) {
  return Array.from(new Set(cars.flatMap((car) => car.features || []))).sort();
}
