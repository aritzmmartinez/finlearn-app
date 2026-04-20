export function formatCurrency(
  value: number,
  currency = "EUR",
  compact = false,
): string {
  if (compact && Math.abs(value) >= 1000) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 1_000_000)
      return `${sign}${(abs / 1_000_000).toFixed(1)}M ${currency}`;
    return `${sign}${(abs / 1_000).toFixed(1)}K ${currency}`;
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatSign(value: number): string {
  return value >= 0 ? "+" : "-";
}

export function formatQuantity(value: number): string {
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(4).replace(/\.?0+$/, "");
}
