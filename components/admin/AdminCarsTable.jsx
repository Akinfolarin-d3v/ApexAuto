"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Star, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCars } from "@/hooks/useCars";
import { updateCar, deleteCar } from "@/lib/cars";
import { STATUS_OPTIONS } from "@/constants/filters";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import CarMedia from "@/components/ui/CarMedia";

const STATUS_VARIANT = { available: "available", reserved: "reserved", sold: "sold" };

export default function AdminCarsTable() {
  const { cars, loading, error } = useCars();
  const [localCars, setLocalCars] = useState(null);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const list = localCars ?? cars;
  const filtered = list.filter((car) => car.title.toLowerCase().includes(query.toLowerCase()));

  function patchLocal(id, patch) {
    setLocalCars((prev) => (prev ?? cars).map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  async function handleStatusChange(id, status) {
    setBusyId(id);
    patchLocal(id, { status });
    try {
      await updateCar(id, { status });
    } finally {
      setBusyId(null);
    }
  }

  async function handleFeaturedToggle(car) {
    setBusyId(car.id);
    patchLocal(car.id, { featured: !car.featured });
    try {
      await updateCar(car.id, { featured: !car.featured });
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete;
    setPendingDelete(null);
    setLocalCars((prev) => (prev ?? cars).filter((c) => c.id !== id));
    await deleteCar(id);
  }

  return (
    <div className="p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow bg-trust-tint text-trust-dim">Inventory</p>
          <h1 className="mt-2 font-display text-3xl tracking-tightest md:text-4xl">Manage Cars</h1>
        </div>
        <Button as={Link} href="/admin/cars/new">
          Add Car
        </Button>
      </div>

      <div className="relative mt-6 w-full max-w-sm">
        <Search size={16} strokeWidth={1.75} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title"
          className="w-full rounded-full border border-steel-200 bg-canvas py-2.5 pl-10 pr-4 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      {error && <p className="mt-6 text-sm text-velocity">Couldn't load inventory. Try refreshing.</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-steel-200">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-steel-200 bg-steel-50 text-left text-xs uppercase tracking-wide text-steel-500">
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((car) => (
              <tr key={car.id} className="border-b border-steel-100 last:border-0">
                <td className="flex items-center gap-3 p-4">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                    <CarMedia car={car} className="h-full w-full" />
                  </div>
                  <div>
                    <p className="font-medium text-ink">{car.title}</p>
                    <p className="font-mono text-xs text-steel-400">{car.year} · {car.stockNumber}</p>
                  </div>
                </td>
                <td className="p-4 font-mono text-ink">{formatCurrency(car.price)}</td>
                <td className="p-4">
                  <select
                    value={car.status}
                    disabled={busyId === car.id}
                    onChange={(e) => handleStatusChange(car.id, e.target.value)}
                    className="rounded-full border border-steel-200 bg-canvas px-3 py-1.5 text-xs focus:border-ink focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => handleFeaturedToggle(car)}
                    disabled={busyId === car.id}
                    aria-label={car.featured ? "Unfeature this car" : "Feature this car"}
                    className={`rounded-full p-2 transition-colors ${car.featured ? "text-signal-dim" : "text-steel-300 hover:text-steel-500"}`}
                  >
                    <Star size={18} strokeWidth={1.75} fill={car.featured ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      aria-label="Edit car"
                      className="rounded-lg border border-steel-200 p-2 text-steel-600 hover:border-ink hover:text-ink"
                    >
                      <Pencil size={15} strokeWidth={1.75} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(car.id)}
                      aria-label="Delete car"
                      className="rounded-lg border border-steel-200 p-2 text-steel-600 hover:border-velocity hover:text-velocity"
                    >
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-steel-500">No vehicles match that search.</p>
        )}
        {loading && <p className="p-8 text-center text-sm text-steel-500">Loading inventory…</p>}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this vehicle?"
        description="This can't be undone. The listing will be removed immediately."
        confirmLabel="Delete"
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
