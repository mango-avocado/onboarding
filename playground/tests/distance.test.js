import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts km to mi", () => {
  strictEqual(convertDistance(10, "km", "mi"), 10 * 0.621371);
});

test("converts mi to km", () => {
  strictEqual(convertDistance(10, "mi", "km"), 10 / 0.621371);
});

test("converts km to m", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5.5, "km", "m"), 5500);
});

test("converts m to km", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(500, "m", "km"), 0.5);
});

test("converts mi to m", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.34);
});

test("converts m to mi", () => {
  strictEqual(convertDistance(1609.34, "m", "mi"), 1);
});

test("handles identity conversion m to m", () => {
  strictEqual(convertDistance(100, "m", "m"), 100);
});

test("handles identity conversion km to km", () => {
  strictEqual(convertDistance(100, "km", "km"), 100);
});

test("handles identity conversion mi to mi", () => {
  strictEqual(convertDistance(100, "mi", "mi"), 100);
});

test("converts 0 meters correctly", () => {
  strictEqual(convertDistance(0, "m", "km"), 0);
  strictEqual(convertDistance(0, "km", "m"), 0);
});

test("converts very large distances", () => {
  strictEqual(convertDistance(1000000, "m", "km"), 1000);
});

test("converts very small distances", () => {
  strictEqual(convertDistance(0.001, "km", "m"), 1);
});
