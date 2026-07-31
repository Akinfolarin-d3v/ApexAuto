import { Suspense } from "react";
import ConfirmationView from "@/components/checkout/ConfirmationView";

export const metadata = {
  title: "Order Confirmed",
};

export default function ConfirmationPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={null}>
        <ConfirmationView />
      </Suspense>
    </div>
  );
}
