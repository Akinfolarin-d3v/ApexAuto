export function clsx(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(" ");
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMileage(miles) {
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}
