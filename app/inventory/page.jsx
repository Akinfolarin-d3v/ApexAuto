import { Suspense } from "react";
import { getAllCars } from "@/lib/cars";
import InventoryExperience from "@/components/inventory/InventoryExperience";

export const metadata = {
  title: "Inventory",
  description: "Browse every vehicle in stock, filter by what matters, and compare side by side.",
};

// Same reason as the homepage — this reads live from Firestore on every request.
export const dynamic = "force-dynamic";

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
