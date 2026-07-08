import { Suspense } from "react";
import { getAllCars } from "@/lib/cars";
import InventoryExperience from "@/components/inventory/InventoryExperience";

export const metadata = {
  title: "Inventory — LoisnX",
  description: "Browse every vehicle in stock, filter by what matters, and compare side by side.",
};

export default async function InventoryPage() {
  const cars = await getAllCars();

  return (
    <div className="pt-20">
      <Suspense fallback={null}>
        <InventoryExperience cars={cars} />
      </Suspense>
    </div>
  );
}
