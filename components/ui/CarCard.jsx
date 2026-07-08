"use client";

import Link from "next/link";
import { Heart, GitCompareArrows, Gauge, Fuel } from "lucide-react";
import { clsx, formatCurrency, formatMileage } from "@/lib/utils";
import { useWishlist, useCompare } from "@/context/store";
import CarMedia from "@/components/ui/CarMedia";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const STATUS_LABEL = {
  available: { label: "Available", variant: "available" },
  reserved: { label: "Reserved", variant: "reserved" },
  sold: { label: "Sold", variant: "sold" },
};

export default function CarCard({ car, className }) {
  const wishlist = useWishlist();
  const compare = useCompare();
  const saved = wishlist.has(car.id);
  const compared = compare.has(car.id);
  const status = STATUS_LABEL[car.status] ?? STATUS_LABEL.available;

  return (
    <div
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-3xl border-2 border-steel-200 bg-canvas",
        "transition-all duration-500 ease-bouncy hover:-translate-y-1.5 hover:border-ink hover:shadow-soft",
        className
      )}
    >
      <Link href={`/inventory/${car.id}`} className="relative block aspect-[4/3]">
        <CarMedia car={car} className="h-full w-full" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
          {car.featured && <Badge variant="featured">Featured</Badge>}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => wishlist.toggle(car.id)}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved cars" : "Save this car"}
        className={clsx(
          "absolute right-3 top-3 rounded-full p-2.5 backdrop-blur transition-all duration-300 ease-bouncy hover:scale-110 active:scale-90",
          saved ? "bg-velocity text-canvas" : "bg-canvas/90 text-ink ring-1 ring-steel-200 hover:ring-ink"
        )}
      >
        <Heart size={16} strokeWidth={1.75} fill={saved ? "currentColor" : "none"} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-trust">
              {car.year} · {car.condition}
            </p>
            <h3 className="mt-1 font-display text-lg leading-tight tracking-tightest">{car.title}</h3>
          </div>
          <span className="whitespace-nowrap font-display text-lg font-bold text-ink">{formatCurrency(car.price)}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-steel-500">
          <span className="inline-flex items-center gap-1">
            <Gauge size={13} strokeWidth={1.75} /> {formatMileage(car.mileage)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Fuel size={13} strokeWidth={1.75} /> {car.fuelType}
          </span>
          <span>{car.drivetrain}</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Button as={Link} href={`/inventory/${car.id}`} variant="dark" size="sm" className="flex-1">
            View Details
          </Button>
          <button
            type="button"
            onClick={() => compare.toggle(car.id)}
            disabled={!compared && compare.isFull}
            aria-pressed={compared}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            className={clsx(
              "rounded-full border-2 p-2.5 transition-all duration-300 ease-bouncy hover:scale-110 active:scale-90",
              compared
                ? "border-trust bg-trust-tint text-trust"
                : "border-steel-200 text-ink hover:border-ink disabled:opacity-30"
            )}
          >
            <GitCompareArrows size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
