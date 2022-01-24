import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";
import { Brackets } from "./brackets";
import { ExpOperators } from "./mathOperators";

const [UNARY, , FIRST, SECOND] = mathPriorities;

export const binaryExpPrioritiesCalc = (
  stack: ParsedLineType
): ParsedLineType => {
  let insideExp = false;
  let expStartIndex: number;
  const initialStackLength: number = stack.length;

  if (!~stack.indexOf(ExpOperators.Pow)) {
    return stack;
  }

  return stack.reduce<ParsedLineType>((result, nextItem, currentIndex) => {
    result.push(nextItem);

    const prevItem = result[result.length - 3];
    const item = result[result.length - 2];

    if (isNumber(String(item)) && nextItem === ExpOperators.Pow) {
      insideExp = true;
      expStartIndex = result.length - 2;
    }

    if (insideExp) {
      if (isNumber(String(item)) && nextItem !== ExpOperators.Pow) {
        insideExp = false;
        result = binaryExpPrioritiesCalc([
          ...result.slice(0, expStartIndex),
          mathOperators[ExpOperators.Pow](
            Number(result[result.length - 4]),
            Number(item)
          ),
          nextItem,
        ]);
      } else if (currentIndex === initialStackLength - 1) {
        insideExp = false;

        if (isNumber(String(nextItem))) {
          result = binaryExpPrioritiesCalc([
            ...result.slice(0, expStartIndex),
            mathOperators[ExpOperators.Pow](Number(prevItem), Number(nextItem)),
          ]);
        }
      }
    }

    return result;
  }, []);
};

export const unaryPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const item = result[result.length - 1];

    result.push(nextItem);

    if (
      !isNumber(String(nextItem)) &&
      mathOperatorsPriorities[nextItem] === UNARY
    ) {
      if (!mathOperators[nextItem]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[nextItem](Number(item), NaN),
      ];
    }

    return result;
  }, []);

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FIRST) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const secondPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (mathOperatorsPriorities[item] === FIRST) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));

export const mathPrioritiesCalc = (stack: ParsedLineType): number => {
  const unaryPrioritiesRes = unaryPrioritiesCalc(stack);

  if (unaryPrioritiesRes.length === 1) {
    return Number(unaryPrioritiesRes[0]);
  }

  return secondPrioritiesCalc(
    firstPrioritiesCalc(binaryExpPrioritiesCalc(unaryPrioritiesRes))
  );
};

export const bracketPrioritiesCalc = (stack: ParsedLineType): number => {
  if (!~stack.indexOf(Brackets.Opening)) {
    return mathPrioritiesCalc(stack);
  }

  let openingBracketIndex = -1;
  let closingBracketIndex = -1;
  let notClosedBrackets = 0;
  let indexShift = 0;

  return mathPrioritiesCalc(
    stack.reduce<ParsedLineType>((result, nextItem, currentIndex) => {
      const openingBracketFound: boolean = nextItem === Brackets.Opening;
      const closingBracketFound: boolean = nextItem === Brackets.Closing;

      if (openingBracketFound) {
        if (notClosedBrackets === 0) {
          openingBracketIndex = currentIndex;
        }

        notClosedBrackets++;
      }

      if (closingBracketFound) {
        notClosedBrackets--;
      }

      result.push(nextItem);

      if (notClosedBrackets === 0 && closingBracketFound) {
        closingBracketIndex = currentIndex - indexShift;
        openingBracketIndex = openingBracketIndex - indexShift;
        result = [
          ...result.slice(0, openingBracketIndex),
          bracketPrioritiesCalc(
            result.slice(openingBracketIndex + 1, closingBracketIndex)
          ),
        ];
        indexShift += closingBracketIndex - openingBracketIndex;
      }

      return result;
    }, [])
  );
};
