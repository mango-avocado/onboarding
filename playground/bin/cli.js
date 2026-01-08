#!/usr/bin/env node
import { convert, compare } from "../src/convert.js";

const [,, command, ...args] = process.argv;

if (!command) {
  console.error("Usage: convert <type> <value> [from] [to]");
  console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
  process.exit(1);
}

if (command === "compare") {
  const [value1, unit1, value2, unit2] = args;
  
  if (!value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }

  try {
    const result = compare(value1, unit1, value2, unit2);
    
    if (result.equal) {
      console.log(`${result.value1.value} ${result.value1.unit} equals ${result.value2.value} ${result.value2.unit}`);
    } else {
      const larger = result.larger;
      const smaller = result.smaller;
      console.log(`${larger.value} ${larger.unit} is larger than ${smaller.value} ${smaller.unit} by ${result.difference} ${result.differenceUnit}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
} else {
  // Original convert command
  const [type, value, from, to] = [command, ...args];
  
  if (!type || !value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }

  try {
    const result = convert(type, Number(value), from, to);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
