export const formatDateString = (dateStr: string): string => {
  const date = new Date(dateStr);

  return `${date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })} ${date.toLocaleTimeString("en-US")}`;
};
