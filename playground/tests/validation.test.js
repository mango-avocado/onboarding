import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects empty string", () => {
  throws(
    () => convert("temperature", "", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for empty string"
  );
});

test("rejects null value", () => {
  throws(
    () => convert("temperature", null, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for null"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

test("rejects invalid Kelvin conversion", () => {
  throws(
    () => convert("temperature", 100, "K", "X"),
    /Unsupported temperature conversion/i,
    "Should throw error for invalid target unit"
  );
});

test("rejects invalid meter conversion", () => {
  throws(
    () => convert("distance", 100, "m", "yards"),
    /Unsupported distance conversion/i,
    "Should throw error for unsupported unit"
  );
});

test("rejects invalid pound conversion", () => {
  throws(
    () => convert("weight", 100, "lb", "kg"),
    /Unsupported weight conversion/i,
    "Should throw error for unsupported unit"
  );
});

test("accepts Kelvin conversions with string values", () => {
  const result = convert("temperature", "273", "K", "C");
  strictEqual(result, -0.14999999999997726);
});

test("accepts meter conversions with valid values", () => {
  const result = convert("distance", 1000, "m", "km");
  strictEqual(result, 1);
});

test("accepts pound conversions with valid values", () => {
  const result = convert("weight", 16, "oz", "lb");
  strictEqual(result, 1);
});
