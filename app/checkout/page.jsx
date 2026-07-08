import Link from "next/link";
import { getCarById } from "@/lib/cars";
import CheckoutWizard from "@/components/checkout/CheckoutWizard";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Checkout — LoisnX",
};

export default async function CheckoutPage({ searchParams }) {
  const carId = searchParams?.carId;
  const car = carId ? await getCarById(carId) : null;

  if (!car) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-40 pt-40 text-center">
        <h1 className="font-display text-3xl tracking-tightest">Pick a car to check out</h1>
        <p className="max-w-sm text-sm text-steel-500">
          Head back to inventory and choose a vehicle to get started.
        </p>
        <Button as={Link} href="/inventory">
          Browse Inventory
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <CheckoutWizard car={car} />
    </div>
  );
}
