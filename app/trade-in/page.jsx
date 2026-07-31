import { Suspense } from "react";
import TradeInPageView from "@/components/trade-in/TradeInPageView";

export const metadata = {
  title: "Trade-In Estimate",
  description: "Get an instant trade-in estimate for your current car.",
};

export default function TradeInPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={null}>
        <TradeInPageView />
      </Suspense>
    </div>
  );
}
