import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedCars } from "@/lib/cars";
import CarCard from "@/components/ui/CarCard";

export default async function FeaturedCars() {
  const cars = await getFeaturedCars(4);

  return (
    <section className="border-t border-steel-200 bg-steel-50 py-24">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow bg-trust-tint text-trust-dim">
              Handpicked
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tightest md:text-4xl">
              This week's featured cars
            </h2>
          </div>
          <Link
            href="/inventory"
            className="hidden items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink md:inline-flex"
          >
            View all inventory <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
