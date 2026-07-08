"use client";

import Link from "next/link";
import { GitCompareArrows } from "lucide-react";
import { useCompare } from "@/context/store";
import { useCars } from "@/hooks/useCars";
import CompareTable from "@/components/compare/CompareTable";
import Button from "@/components/ui/Button";

export default function CompareView() {
  const compare = useCompare();
  const { cars, loading } = useCars();

  const compared = cars.filter((car) => compare.ids.includes(car.id));

  return (
    <div className="pt-20">
      <div className="container-page py-10">
        <p className="eyebrow bg-trust-tint text-trust-dim">
          {compared.length} of {compare.limit} vehicles
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">Compare</h1>

        {loading ? (
          <p className="mt-10 font-mono text-sm text-steel-500">Loading…</p>
        ) : compared.length < 2 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-steel-300 py-24 text-center">
            <GitCompareArrows size={32} strokeWidth={1.25} className="text-steel-300" />
            <p className="font-display text-xl tracking-tightest">Add at least 2 cars to compare</p>
            <p className="max-w-sm text-sm text-steel-500">
              Use the compare icon on any car card or detail page — up to {compare.limit} vehicles at once.
            </p>
            <Button as={Link} href="/inventory">
              Browse Inventory
            </Button>
          </div>
        ) : (
          <div className="mt-10">
            <CompareTable cars={compared} />
          </div>
        )}
      </div>
    </div>
  );
}
