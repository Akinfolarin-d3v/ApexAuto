"use client";

import Link from "next/link";
import { Car, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import { useOrders } from "@/hooks/useOrders";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const STATUS_VARIANT = { available: "available", reserved: "reserved", sold: "sold" };

export default function AdminOverviewPage() {
  const { cars, loading: carsLoading } = useCars();
  const { orders, loading: ordersLoading } = useOrders();

  const available = cars.filter((c) => c.status === "available").length;
  const featured = cars.filter((c) => c.featured).length;
  const totalValue = cars.reduce((sum, c) => sum + (c.status !== "sold" ? c.price : 0), 0);

  const stats = [
    { label: "Vehicles in stock", value: cars.length, icon: Car },
    { label: "Available now", value: available, icon: TrendingUp },
    { label: "Featured", value: featured, icon: Star },
    { label: "Orders placed", value: orders.length, icon: ShoppingBag },
  ];

  return (
    <div className="p-6 sm:p-10">
      <p className="eyebrow bg-trust-tint text-trust-dim">Dashboard</p>
      <h1 className="mt-2 font-display text-3xl tracking-tightest md:text-4xl">Overview</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-steel-200 p-5">
            <stat.icon size={18} strokeWidth={1.75} className="text-steel-400" />
            <p className="mt-4 font-display text-3xl tracking-tightest">
              {carsLoading || ordersLoading ? "—" : stat.value}
            </p>
            <p className="mt-1 text-xs text-steel-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-steel-200 p-5">
        <p className="text-xs text-steel-500">Est. active inventory value</p>
        <p className="mt-1 font-mono text-2xl text-ink">{formatCurrency(totalValue)}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg tracking-tightest">Recent vehicles</h2>
            <Link href="/admin/cars" className="text-xs font-medium text-steel-500 hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-steel-200 rounded-2xl border border-steel-200">
            {cars.slice(0, 5).map((car) => (
              <div key={car.id} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-medium text-ink">{car.title}</p>
                  <p className="font-mono text-xs text-steel-400">{formatCurrency(car.price)}</p>
                </div>
                <Badge variant={STATUS_VARIANT[car.status] || "available"}>{car.status}</Badge>
              </div>
            ))}
            {!carsLoading && cars.length === 0 && (
              <p className="p-4 text-sm text-steel-500">No vehicles yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg tracking-tightest">Recent orders</h2>
          <div className="mt-4 flex flex-col divide-y divide-steel-200 rounded-2xl border border-steel-200">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-medium text-ink">{order.carTitle}</p>
                  <p className="font-mono text-xs text-steel-400">{order.id}</p>
                </div>
                <span className="font-mono text-sm text-ink">{formatCurrency(order.totals?.totalDue ?? 0)}</span>
              </div>
            ))}
            {!ordersLoading && orders.length === 0 && (
              <p className="p-4 text-sm text-steel-500">No orders placed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
