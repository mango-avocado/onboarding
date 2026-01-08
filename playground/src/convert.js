import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

function roundToPrecision(value, precision) {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

export function convert(type, value, from, to) {
  // Validate numeric input
  if (value === null || value === "") {
    throw new Error("Invalid value: must be a valid number");
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    throw new Error("Invalid value: must be a valid number");
  }

  switch (type) {
    case "temperature":
      return roundToPrecision(
        temperature.convertTemperature(
          numValue,
          from || defaults.temperature.defaultFrom,
          to || defaults.temperature.defaultTo
        ),
        defaults.precision
      );
    case "distance":
      return roundToPrecision(
        distance.convertDistance(numValue, from, to),
        defaults.precision
      );
    case "weight":
      return roundToPrecision(
        weight.convertWeight(numValue, from, to),
        defaults.precision
      );
    default:
      throw new Error("Unknown type " + type);
  }
}
