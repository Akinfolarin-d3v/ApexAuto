"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getOrder } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function ConfirmationView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }
    getOrder(orderId).then(setOrder);
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className="container-page flex flex-col items-center gap-3 py-40 text-center">
        <p className="font-mono text-sm text-steel-500">Loading your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-40 text-center">
        <h1 className="font-display text-3xl tracking-tightest">We couldn't find that order</h1>
        <p className="max-w-sm text-sm text-steel-500">
          The order link may be incomplete, or you're viewing this from a different browser than
          the one you checked out in.
        </p>
        <Button as={Link} href="/inventory">
          Browse Inventory
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-trust-tint text-trust">
        <CheckCircle2 size={32} strokeWidth={1.75} />
      </div>

      <p className="mt-6 eyebrow bg-trust-tint text-trust-dim">Order confirmed</p>
      <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">You're all set.</h1>
      <p className="mt-4 max-w-md text-steel-600">
        Order <span className="font-mono text-ink">{order.id}</span> for your{" "}
        <span className="font-medium text-ink">{order.carTitle}</span> has been placed.
      </p>

      <div className="mt-10 w-full max-w-md rounded-2xl border border-steel-200 p-6 text-left">
        <Row label="Vehicle" value={`${order.carTitle} (${order.carYear})`} />
        <Row label="Trim" value={order.trim?.label} />
        <Row label="Payment method" value={order.payment?.method === "finance" ? "Financed" : "Paid in full"} />
        {order.payment?.method === "finance" && (
          <Row label="Est. monthly payment" value={`${formatCurrency(Math.round(order.totals.monthlyPayment))}/mo`} />
        )}
        <Row label="Total" value={formatCurrency(order.totals.totalDue)} emphasis />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {["A specialist reaches out within 24 hours to schedule delivery.",
          "Final paperwork is signed at (or before) handoff.",
          "Your new car arrives — or you pick it up, your choice."].map((step, i) => (
          <div key={i} className="rounded-xl bg-steel-50 p-4 text-left">
            <span className="font-mono text-xs text-steel-400">Step {i + 1}</span>
            <p className="mt-1 text-sm text-steel-600">{step}</p>
          </div>
        ))}
      </div>

      <Button as={Link} href="/inventory" variant="outline" className="mt-10">
        Continue Browsing
      </Button>
    </div>
  );
}

function Row({ label, value, emphasis }) {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b border-steel-100 py-3 text-sm last:border-0">
      <span className="text-steel-500">{label}</span>
      <span className={emphasis ? "font-mono text-lg text-ink" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
