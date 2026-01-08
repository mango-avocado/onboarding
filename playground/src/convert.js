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
      return temperature.convertTemperature(
        numValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
    case "distance":
      return distance.convertDistance(numValue, from, to);
    case "weight":
      return weight.convertWeight(numValue, from, to);
    default:
      throw new Error("Unknown type " + type);
  }
}
