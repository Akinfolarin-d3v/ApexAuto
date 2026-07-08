import { DOC_FEE, TAX_RATE } from "@/lib/addons";
import { estimateMonthlyPayment } from "@/lib/finance";

export function computeOrderTotals({
  basePrice,
  trimDelta = 0,
  addons = [],
  tradeInValue = 0,
  paymentMethod = "finance",
  downPayment = 0,
  apr,
  termMonths,
}) {
  const vehiclePrice = basePrice + trimDelta;
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const subtotal = vehiclePrice + addonsTotal;
  const estimatedTax = Math.round(subtotal * TAX_RATE);
  const totalBeforeCredits = subtotal + estimatedTax + DOC_FEE;
  const totalDue = Math.max(totalBeforeCredits - tradeInValue, 0);

  const financed = paymentMethod === "finance";
  const amountFinanced = financed ? Math.max(totalDue - downPayment, 0) : 0;
  const monthlyPayment = financed
    ? estimateMonthlyPayment({ price: totalDue, downPayment, apr, termMonths })
    : 0;

  return {
    vehiclePrice,
    addonsTotal,
    subtotal,
    estimatedTax,
    docFee: DOC_FEE,
    tradeInValue,
    totalDue,
    financed,
    downPayment: financed ? downPayment : totalDue,
    amountFinanced,
    monthlyPayment,
    apr,
    termMonths,
  };
}
