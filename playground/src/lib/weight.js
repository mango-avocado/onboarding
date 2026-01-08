export function convertWeight(value, from, to) {
  // Identity conversion
  if (from === to) {
    return value;
  }

  // Grams to Ounces
  if (from === "g" && to === "oz") return value / 28.3495;
  if (from === "oz" && to === "g") return value * 28.3495;

  // Grams to Pounds
  if (from === "g" && to === "lb") return value / 453.592;
  if (from === "lb" && to === "g") return value * 453.592;

  // Ounces to Pounds
  if (from === "oz" && to === "lb") return value / 16;
  if (from === "lb" && to === "oz") return value * 16;

  throw new Error(`Unsupported weight conversion: ${from} to ${to}`);
}
