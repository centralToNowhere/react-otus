import { parser } from "./parser";

import { bracketPrioritiesCalc } from "./engine";

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  return bracketPrioritiesCalc(stack);
};
