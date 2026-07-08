import { Suspense } from "react";
import PaymentCalculator from "@/components/financing/PaymentCalculator";

export const metadata = {
  title: "Payment Calculator — LoisnX",
  description: "Estimate a monthly payment for any car in stock.",
};

export default function FinancingPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={null}>
        <PaymentCalculator />
      </Suspense>
    </div>
  );
}
