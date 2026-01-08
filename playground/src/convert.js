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

function detectTypeFromUnit(unit) {
  const distanceUnits = ["km", "mi", "m"];
  const weightUnits = ["g", "oz", "lb"];
  const temperatureUnits = ["C", "F", "K"];

  if (distanceUnits.includes(unit)) return "distance";
  if (weightUnits.includes(unit)) return "weight";
  if (temperatureUnits.includes(unit)) return "temperature";
  throw new Error(`Unknown unit: ${unit}`);
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

export function compare(value1, unit1, value2, unit2) {
  // Validate numeric inputs
  const numValue1 = Number(value1);
  const numValue2 = Number(value2);
  
  if (isNaN(numValue1) || isNaN(numValue2)) {
    throw new Error("Invalid value: must be a valid number");
  }

  // Detect type from units (both must be same type)
  const type1 = detectTypeFromUnit(unit1);
  const type2 = detectTypeFromUnit(unit2);
  
  if (type1 !== type2) {
    throw new Error(`Cannot compare different types: ${type1} and ${type2}`);
  }

  // Convert both values to the first unit for comparison
  const convertedValue2 = convert(type1, numValue2, unit2, unit1);
  
  // Calculate difference
  const difference = roundToPrecision(
    Math.abs(numValue1 - convertedValue2),
    defaults.precision
  );
  
  // Determine which is larger
  let larger, smaller;
  if (numValue1 > convertedValue2) {
    larger = { value: numValue1, unit: unit1 };
    smaller = { value: convertedValue2, unit: unit1 };
  } else if (numValue1 < convertedValue2) {
    larger = { value: convertedValue2, unit: unit1 };
    smaller = { value: numValue1, unit: unit1 };
  } else {
    // Equal
    return {
      equal: true,
      value1: { value: numValue1, unit: unit1 },
      value2: { value: numValue2, unit: unit2, converted: numValue1, convertedUnit: unit1 },
      difference: 0
    };
  }

  return {
    equal: false,
    larger: larger,
    smaller: smaller,
    value1: { value: numValue1, unit: unit1 },
    value2: { value: numValue2, unit: unit2, converted: convertedValue2, convertedUnit: unit1 },
    difference: difference,
    differenceUnit: unit1
  };
}
