/**
 * Standard amortizing loan payment formula. Shared by the car detail page's
 * financing teaser and the full Payment Calculator (Phase 3), so the
 * numbers always agree.
 */
export function estimateMonthlyPayment({ price, downPayment = 0, apr = 6.9, termMonths = 60 }) {
  const principal = Math.max(price - downPayment, 0);
  const monthlyRate = apr / 100 / 12;

  if (monthlyRate === 0) return principal / termMonths;

  const payment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

  return Number.isFinite(payment) ? payment : 0;
}

export const FINANCE_DEFAULTS = {
  apr: 6.9,
  termMonths: 60,
  downPaymentRate: 0.1,
};

export const TERM_OPTIONS = [36, 48, 60, 72, 84];
