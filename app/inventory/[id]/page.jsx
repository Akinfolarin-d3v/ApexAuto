import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCarById, getRelatedCars } from "@/lib/cars";
import { formatCurrency, formatMileage } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Gallery from "@/components/car-detail/Gallery";
import SpecGrid from "@/components/car-detail/SpecGrid";
import FeatureList from "@/components/car-detail/FeatureList";
import FinancingTeaser from "@/components/car-detail/FinancingTeaser";
import PurchaseActions from "@/components/car-detail/PurchaseActions";
import RelatedCars from "@/components/car-detail/RelatedCars";

const STATUS_LABEL = {
  available: { label: "Available", variant: "available" },
  reserved: { label: "Reserved", variant: "reserved" },
  sold: { label: "Sold", variant: "sold" },
};

export async function generateMetadata({ params }) {
  const car = await getCarById(params.id);
  if (!car) return { title: "Vehicle not found" };
  return {
    title: car.title,
    description: car.description,
  };
}

// Reads a single live Firestore doc — must stay dynamic so edits made in
// the admin dashboard (price, status, photos) show up immediately.
export const dynamic = "force-dynamic";

export default async function CarDetailPage({ params }) {
  const car = await getCarById(params.id);
  if (!car) notFound();

  const related = await getRelatedCars(car);
  const status = STATUS_LABEL[car.status] ?? STATUS_LABEL.available;

  return (
    <div className="pt-20">
      <div className="container-page py-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-steel-500 hover:text-ink"
        >
          <ChevronLeft size={15} strokeWidth={1.75} /> Back to inventory
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Gallery car={car} />

            <div className="mt-10 flex flex-wrap items-start justify-between gap-4 border-b border-steel-200 pb-8">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  {car.featured && <Badge variant="featured">Featured</Badge>}
                </div>
                <h1 className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">{car.title}</h1>
                <p className="mt-1 font-mono text-sm text-steel-500">
                  {car.year} · {formatMileage(car.mileage)} · {car.condition}
                </p>
              </div>
              <span className="font-mono text-3xl text-ink">{formatCurrency(car.price)}</span>
            </div>

            <div className="border-b border-steel-200 py-10">
              <h2 className="font-display text-xl tracking-tightest">Overview</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-600">{car.description}</p>
            </div>

            <div className="border-b border-steel-200 py-10">
              <h2 className="font-display text-xl tracking-tightest">Specifications</h2>
              <div className="mt-6">
                <SpecGrid car={car} />
              </div>
            </div>

            <div className="py-10">
              <h2 className="font-display text-xl tracking-tightest">Features</h2>
              <div className="mt-6">
                <FeatureList features={car.features} />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="flex flex-col gap-6">
              <PurchaseActions car={car} />
              <FinancingTeaser car={car} />
            </div>
          </div>
        </div>
      </div>

      <RelatedCars cars={related} />
    </div>
  );
}
