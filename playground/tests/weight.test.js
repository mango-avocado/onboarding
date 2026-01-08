import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertWeight } from "../src/lib/weight.js";

test("converts g to oz", () => {
  strictEqual(convertWeight(100, "g", "oz"), 100 / 28.3495);
});

test("converts oz to g", () => {
  strictEqual(convertWeight(10, "oz", "g"), 10 * 28.3495);
});

test("converts g to lb", () => {
  strictEqual(convertWeight(453.592, "g", "lb"), 1);
  strictEqual(convertWeight(1000, "g", "lb"), 1000 / 453.592);
});

test("converts lb to g", () => {
  strictEqual(convertWeight(1, "lb", "g"), 453.592);
  strictEqual(convertWeight(2.5, "lb", "g"), 2.5 * 453.592);
});

test("converts oz to lb", () => {
  strictEqual(convertWeight(16, "oz", "lb"), 1);
  strictEqual(convertWeight(32, "oz", "lb"), 2);
});

test("converts lb to oz", () => {
  strictEqual(convertWeight(1, "lb", "oz"), 16);
  strictEqual(convertWeight(0.5, "lb", "oz"), 8);
});

test("handles identity conversion lb to lb", () => {
  strictEqual(convertWeight(100, "lb", "lb"), 100);
});

test("handles identity conversion g to g", () => {
  strictEqual(convertWeight(100, "g", "g"), 100);
});

test("handles identity conversion oz to oz", () => {
  strictEqual(convertWeight(100, "oz", "oz"), 100);
});

test("converts 0 pounds correctly", () => {
  strictEqual(convertWeight(0, "lb", "oz"), 0);
  strictEqual(convertWeight(0, "lb", "g"), 0);
});

test("converts very large weights", () => {
  strictEqual(convertWeight(1000000, "g", "lb"), 1000000 / 453.592);
});

test("converts very small weights", () => {
  strictEqual(convertWeight(0.0625, "oz", "lb"), 0.0625 / 16);
});
