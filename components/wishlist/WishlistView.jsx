"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/store";
import { useCars } from "@/hooks/useCars";
import CarCard from "@/components/ui/CarCard";
import Button from "@/components/ui/Button";

export default function WishlistView() {
  const wishlist = useWishlist();
  const { cars, loading } = useCars();

  const saved = cars.filter((car) => wishlist.ids.includes(car.id));

  return (
    <div className="pt-20">
      <div className="container-page py-10">
        <p className="eyebrow bg-trust-tint text-trust-dim">
          {saved.length} saved {saved.length === 1 ? "vehicle" : "vehicles"}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">Saved Cars</h1>

        {loading ? (
          <p className="mt-10 font-mono text-sm text-steel-500">Loading…</p>
        ) : saved.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-steel-300 py-24 text-center">
            <Heart size={32} strokeWidth={1.25} className="text-steel-300" />
            <p className="font-display text-xl tracking-tightest">Nothing saved yet</p>
            <p className="max-w-sm text-sm text-steel-500">
              Tap the heart icon on any car to save it here for later.
            </p>
            <Button as={Link} href="/inventory">
              Browse Inventory
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {saved.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
