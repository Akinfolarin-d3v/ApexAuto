"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generateTrims } from "@/lib/trims";
import { PROTECTION_ADDONS } from "@/lib/addons";
import { computeOrderTotals } from "@/lib/pricing";
import { createOrder } from "@/lib/orders";
import { FINANCE_DEFAULTS } from "@/lib/finance";
import StepIndicator from "@/components/checkout/StepIndicator";
import TrimStep from "@/components/checkout/TrimStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import ExtrasStep from "@/components/checkout/ExtrasStep";
import TradeInStep from "@/components/checkout/TradeInStep";
import ReviewStep from "@/components/checkout/ReviewStep";
import OrderSummarySidebar from "@/components/checkout/OrderSummarySidebar";

const STEPS = ["Trim", "Payment", "Extras", "Trade-In", "Review"];

export default function CheckoutWizard({ car }) {
  const router = useRouter();
  const trims = useMemo(() => generateTrims(car), [car]);

  const [stepIndex, setStepIndex] = useState(0);
  const [trimId, setTrimId] = useState(trims[0].id);
  const [payment, setPayment] = useState({
    method: "finance",
    downPayment: Math.round(car.price * FINANCE_DEFAULTS.downPaymentRate),
    apr: FINANCE_DEFAULTS.apr,
    creditTier: "good",
    termMonths: FINANCE_DEFAULTS.termMonths,
  });
  const [addonIds, setAddonIds] = useState([]);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const trim = trims.find((t) => t.id === trimId);
  const addons = PROTECTION_ADDONS.filter((a) => addonIds.includes(a.id));

  const totals = computeOrderTotals({
    basePrice: car.price,
    trimDelta: trim.priceDelta,
    addons,
    tradeInValue,
    paymentMethod: payment.method,
    downPayment: payment.downPayment,
    apr: payment.apr,
    termMonths: payment.termMonths,
  });

  function goTo(i) {
    setStepIndex(Math.max(0, Math.min(STEPS.length - 1, i)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleAddon(id) {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const order = await createOrder({
        carId: car.id,
        carTitle: car.title,
        carYear: car.year,
        trim: { id: trim.id, label: trim.label, priceDelta: trim.priceDelta },
        payment,
        addons: addons.map((a) => ({ id: a.id, label: a.label, price: a.price })),
        tradeInValue,
        totals,
        status: "confirmed",
      });
      router.push(`/checkout/confirmation?orderId=${order.id}`);
    } catch (err) {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page py-10">
      <StepIndicator steps={STEPS} activeIndex={stepIndex} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-steel-200 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {stepIndex === 0 && (
                <TrimStep car={car} trims={trims} selectedTrimId={trimId} onSelect={setTrimId} onNext={() => goTo(1)} />
              )}
              {stepIndex === 1 && (
                <PaymentStep
                  vehiclePrice={car.price + trim.priceDelta}
                  payment={payment}
                  setPayment={setPayment}
                  onBack={() => goTo(0)}
                  onNext={() => goTo(2)}
                />
              )}
              {stepIndex === 2 && (
                <ExtrasStep selectedIds={addonIds} onToggle={toggleAddon} onBack={() => goTo(1)} onNext={() => goTo(3)} />
              )}
              {stepIndex === 3 && (
                <TradeInStep tradeInValue={tradeInValue} setTradeInValue={setTradeInValue} onBack={() => goTo(2)} onNext={() => goTo(4)} />
              )}
              {stepIndex === 4 && (
                <ReviewStep
                  car={car}
                  trim={trim}
                  payment={payment}
                  addons={addons}
                  tradeInValue={tradeInValue}
                  totals={totals}
                  onBack={() => goTo(3)}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <OrderSummarySidebar car={car} totals={totals} />
        </div>
      </div>
    </div>
  );
}
