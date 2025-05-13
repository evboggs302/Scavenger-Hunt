export const formatCentsToDollars = (cents: number): string => {
  if (!Number.isFinite(cents) || !Number.isInteger(cents)) {
    throw new Error("Invalid cents value");
  }

  const amount = (cents / 100).toFixed(2);
  return cents < 0 ? `($${amount})` : `$${amount}`;
};
