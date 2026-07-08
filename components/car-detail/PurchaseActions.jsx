"use client";

import Link from "next/link";
import { Heart, GitCompareArrows, ArrowRight, RefreshCcw } from "lucide-react";
import { useWishlist, useCompare } from "@/context/store";
import { clsx } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function PurchaseActions({ car }) {
  const wishlist = useWishlist();
  const compare = useCompare();
  const saved = wishlist.has(car.id);
  const compared = compare.has(car.id);
  const soldOut = car.status === "sold";

  return (
    <div className="flex flex-col gap-3">
      <Button
        as={Link}
        href={soldOut ? "#" : `/checkout?carId=${car.id}`}
        size="lg"
        aria-disabled={soldOut}
        className={clsx("w-full", soldOut && "pointer-events-none opacity-40")}
      >
        {soldOut ? "This vehicle has sold" : "Start Purchase"} <ArrowRight size={16} strokeWidth={2} />
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => wishlist.toggle(car.id)}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-colors duration-300",
            saved ? "border-velocity bg-velocity-tint text-velocity-dim" : "border-steel-200 text-ink hover:border-ink"
          )}
        >
          <Heart size={16} strokeWidth={1.75} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          onClick={() => compare.toggle(car.id)}
          disabled={!compared && compare.isFull}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-colors duration-300 disabled:opacity-40",
            compared ? "border-trust bg-trust-tint text-trust" : "border-steel-200 text-ink hover:border-ink"
          )}
        >
          <GitCompareArrows size={16} strokeWidth={1.75} />
          {compared ? "Comparing" : "Compare"}
        </button>
      </div>

      <Link
        href={`/trade-in?applyToCarId=${car.id}`}
        className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-steel-600 hover:text-ink"
      >
        <RefreshCcw size={14} strokeWidth={1.75} />
        Apply a trade-in toward this car
      </Link>
    </div>
  );
}
