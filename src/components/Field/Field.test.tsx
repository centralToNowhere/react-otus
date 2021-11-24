import React from "react";
import { render, screen } from "@testing-library/react";
import { Field, IFiguresMap } from "./Field";
import figures from "./figures.json";

const cellSize = 40;
const cellsBetweenChars = 1;
const fieldWidth = 600;
const fieldHeight = 400;

interface ICharsIndexes {
  [key: string]: number[];
}

const charsIndexes: ICharsIndexes = {
  "1": [
    38, 39, 52, 53, 54, 68, 69, 83, 84, 98, 99, 113, 114, 127, 128, 129, 130,
  ],
  "2": [
    37, 38, 39, 40, 51, 52, 55, 56, 70, 71, 83, 84, 85, 98, 97, 111, 112, 126,
    127, 128, 129, 130, 131,
  ],
  "3": [
    37, 38, 39, 40, 51, 52, 55, 56, 70, 71, 83, 84, 85, 100, 101, 111, 112, 115,
    116, 127, 128, 129, 130,
  ],
  "4": [
    36, 37, 40, 41, 51, 52, 55, 56, 66, 67, 70, 71, 81, 82, 85, 86, 97, 98, 99,
    100, 101, 115, 116, 130, 131,
  ],
  "5": [
    36, 37, 38, 39, 40, 41, 51, 52, 66, 67, 68, 69, 70, 85, 86, 100, 101, 115,
    116, 111, 112, 127, 128, 129, 130,
  ],
  "6": [
    37, 38, 39, 40, 51, 52, 55, 56, 66, 67, 81, 82, 83, 84, 85, 96, 97, 100,
    101, 111, 112, 115, 116, 127, 128, 129, 130,
  ],
  "7": [
    36, 37, 38, 39, 40, 41, 55, 56, 69, 70, 83, 84, 98, 99, 113, 114, 128, 129,
  ],
  "8": [
    37, 38, 39, 40, 51, 52, 55, 56, 66, 67, 70, 71, 82, 83, 84, 85, 96, 97, 100,
    101, 111, 112, 115, 116, 127, 128, 129, 130,
  ],
  "9": [
    37, 38, 39, 40, 51, 52, 55, 56, 66, 67, 70, 71, 82, 83, 84, 85, 100, 101,
    111, 112, 115, 116, 127, 128, 129, 130,
  ],
  "0": [
    37, 38, 39, 40, 51, 52, 55, 56, 66, 67, 70, 71, 81, 82, 85, 86, 96, 97, 100,
    101, 111, 112, 115, 116, 127, 128, 129, 130,
  ],
};

const testCellsToBeActive = (inputString: string): void => {
  render(
    <Field
      cellSize={cellSize}
      cellsBetweenChars={cellsBetweenChars}
      inputString={inputString}
      figuresMap={figures["figures"] as IFiguresMap["figures"]}
      fieldWidthPx={fieldWidth}
      fieldHeightPX={fieldHeight}
    />
  );

  const cells: HTMLElement[] = screen.getAllByTestId("cell");
  const activeCellsIndexes = charsIndexes[inputString];

  activeCellsIndexes.forEach((cellIndex) => {
    expect(cells[cellIndex - 1]).toHaveStyle({
      background: "black",
    });
  });
};

describe("Field tests", () => {
  it("should render field", () => {
    const { asFragment } = render(
      <Field
        cellSize={30}
        cellsBetweenChars={1}
        inputString={""}
        figuresMap={figures["figures"] as IFiguresMap["figures"]}
        fieldWidthPx={600}
        fieldHeightPX={400}
      />
    );

    const field = screen.getByTestId("field");

    expect(field).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 150 inactive cells", () => {
    const inputString = "";

    render(
      <Field
        cellSize={cellSize}
        cellsBetweenChars={cellsBetweenChars}
        inputString={inputString}
        figuresMap={figures["figures"] as IFiguresMap["figures"]}
        fieldWidthPx={fieldWidth}
        fieldHeightPX={fieldHeight}
      />
    );

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: "black",
      });
    });
  });

  it("should render 1", () => {
    testCellsToBeActive("1");
  });

  it("should render 2", () => {
    testCellsToBeActive("2");
  });

  it("should render 3", () => {
    testCellsToBeActive("3");
  });

  it("should render 4", () => {
    testCellsToBeActive("4");
  });

  it("should render 5", () => {
    testCellsToBeActive("5");
  });

  it("should render 6", () => {
    testCellsToBeActive("6");
  });

  it("should render 7", () => {
    testCellsToBeActive("7");
  });

  it("should render 8", () => {
    testCellsToBeActive("8");
  });

  it("should render 9", () => {
    testCellsToBeActive("9");
  });

  it("should render 0", () => {
    testCellsToBeActive("0");
  });
});
