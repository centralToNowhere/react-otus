import { isNumber } from "./helpers";
import { mathOperators } from "./mathOperators";
import { Brackets } from "./brackets";
import { unaryOperators } from "./mathOperators";

export type ParsedLineType = (number | string)[];

const checkIsAllBracketsClosed = (stack: ParsedLineType): boolean => {
  let notClosedBrackets = 0;

  stack.forEach((item) => {
    notClosedBrackets =
      item === Brackets.Opening
        ? notClosedBrackets + 1
        : item === Brackets.Closing
        ? notClosedBrackets - 1
        : notClosedBrackets;
  });

  return !notClosedBrackets;
};

export const parser = (line: string): ParsedLineType | null => {
  const stack = line.split(" ");

  if (!checkIsAllBracketsClosed(stack)) {
    throw new TypeError("Unexpected string");
  }

  return stack.reduce<ParsedLineType>((result, item, key) => {
    const prevItem = stack[key - 1];

    const isValidNumberPush: boolean = !isNumber(prevItem) && isNumber(item);

    const isValidOperatorPush: boolean =
      (isNumber(prevItem) ||
        prevItem === Brackets.Closing ||
        Boolean(~unaryOperators.indexOf(prevItem))) &&
      !isNumber(item) &&
      mathOperators.hasOwnProperty(item);

    const isValidOpeningBracketPush: boolean =
      item === Brackets.Opening &&
      (mathOperators.hasOwnProperty(prevItem) ||
        prevItem === Brackets.Opening ||
        !prevItem);

    const isValidClosingBracketPush: boolean =
      item === Brackets.Closing &&
      (isNumber(prevItem) ||
        prevItem === Brackets.Closing ||
        Boolean(~unaryOperators.indexOf(prevItem)));

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (
      isValidOperatorPush ||
      isValidOpeningBracketPush ||
      isValidClosingBracketPush
    ) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);
};
