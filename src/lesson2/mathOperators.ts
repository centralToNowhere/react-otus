type ScalarOperationType = (first: number, second: number) => number;
type UnaryOperationType = (first: number) => number;

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const pow: ScalarOperationType = (
  base: number,
  exponent: number
): number => Math.pow(base, exponent);

export const pow2: UnaryOperationType = (base: number): number => pow(base, 2);

export const mathOperators: {
  [key: string]: ScalarOperationType | UnaryOperationType;
} = {
  "^": pow,
  "**": pow2,
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
};

export const mathPriorities: number[] = [0, 1, 2, 3];

const [UNARY, BINARY_EXP, FIRST, SECOND] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "**": UNARY,
  "^": BINARY_EXP,
  "*": FIRST,
  "/": FIRST,
  "+": SECOND,
  "-": SECOND,
};

export enum ExpOperators {
  Pow = "^",
  Pow2 = "**",
}

export const unaryOperators: string[] = ["**"];
