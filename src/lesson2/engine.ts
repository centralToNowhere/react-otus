import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";
import { Brackets } from "./brackets";

const [FIRST, SECOND] = mathPriorities;

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

export const simplePrioritiesCalc = (stack: ParsedLineType): number => {
  const firstPrioritiesRes = firstPrioritiesCalc(stack);

  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  return secondPrioritiesCalc(firstPrioritiesRes);
};

export const bracketPrioritiesCalc = (stack: ParsedLineType): number => {
  if (!~stack.indexOf(Brackets.Opening)) {
    return simplePrioritiesCalc(stack);
  }

  let openingBracketIndex = -1;
  let closingBracketIndex = -1;
  let notClosedBrackets = 0;
  let indexShift = 0;

  return simplePrioritiesCalc(
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
        indexShift = currentIndex;
      }

      return result;
    }, [])
  );
};
