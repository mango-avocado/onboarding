export function convertDistance(value, from, to) {
  // Identity conversion
  if (from === to) {
    return value;
  }

  // Kilometers to Miles
  if (from === "km" && to === "mi") return value * 0.621371;
  if (from === "mi" && to === "km") return value / 0.621371;

  // Kilometers to Meters
  if (from === "km" && to === "m") return value * 1000;
  if (from === "m" && to === "km") return value / 1000;

  // Miles to Meters
  if (from === "mi" && to === "m") return value * 1609.34;
  if (from === "m" && to === "mi") return value / 1609.34;

  throw new Error(`Unsupported distance conversion: ${from} to ${to}`);
}
