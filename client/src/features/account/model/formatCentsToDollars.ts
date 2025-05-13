export const formatCentsToDollars = (cents: number): string => {
  // Validate input
  if (!Number.isFinite(cents)) {
    throw new Error("Input must be a finite number");
  }
  if (!Number.isInteger(cents)) {
    throw new Error("Input must be an integer (cents)");
  }

  // Convert to dollars and format
  const dollars = cents / 100;
  return `$${Math.abs(dollars).toFixed(2)}${cents < 0 ? " (negative)" : ""}`;
};
