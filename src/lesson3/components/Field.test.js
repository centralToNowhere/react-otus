import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Field, {
  getRandomColor,
  getRandomCellsByRowSize,
  isValidCells,
} from "./Field";
import store from "../redux/store";
import { Provider } from "react-redux";

describe("test methods", () => {
  it("getRandomColor should return a string", () => {
    expect(typeof getRandomColor()).toBe("string");
  });

  it("getRandomColor should match regexp", () => {
    expect(getRandomColor()).toMatch(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/);
  });

  it("typeof getRandomCellsByRowSize(4)[0][0].backgroundColor === string", () => {
    expect(typeof getRandomCellsByRowSize(4)[0][0].backgroundColor).toBe(
      "string"
    );
  });

  it("typeof getRandomCellsByRowSize(4)[3][3].alive === string", () => {
    expect(typeof getRandomCellsByRowSize(4)[3][3].alive).toBe("boolean");
  });

  it("isValidCells should return  true (valid array)", () => {
    const cells = [
      [
        { number: 0, backgroundColor: "rgb(220,228,138)", alive: true },
        { number: 1, backgroundColor: "rgb(228,134,158)", alive: false },
        { number: 2, backgroundColor: "rgb(251,149,155)", alive: true },
        { number: 3, backgroundColor: "rgb(211,121,116)", alive: true },
      ],
      [
        { number: 4, backgroundColor: "rgb(239,54,127)", alive: false },
        { number: 5, backgroundColor: "rgb(157,42,72)", alive: true },
        { number: 6, backgroundColor: "rgb(140,172,133)", alive: true },
        { number: 7, backgroundColor: "rgb(214,211,140)", alive: false },
      ],
      [
        { number: 8, backgroundColor: "rgb(11,157,173)", alive: true },
        { number: 9, backgroundColor: "rgb(253,201,142)", alive: true },
        { number: 10, backgroundColor: "rgb(166,0,17)", alive: true },
        { number: 11, backgroundColor: "rgb(92,232,1)", alive: true },
      ],
      [
        { number: 12, backgroundColor: "rgb(150,156,116)", alive: true },
        { number: 13, backgroundColor: "rgb(6,218,86)", alive: false },
        { number: 14, backgroundColor: "rgb(184,105,86)", alive: true },
        { number: 15, backgroundColor: "rgb(63,171,56)", alive: true },
      ],
    ];

    expect(isValidCells(cells)).toBe(true);
  });

  it("isValidCells should return false (invalid cells array)", () => {
    const cells = [
      [
        { number: 0, backgroundColor: "rgb(220,228,138)", alive: true },
        { number: 1, backgroundColor: "rgb(228,134,158)", alive: false },
        { number: 2, backgroundColor: "rgb(251,149,155)", alive: true },
        { number: 3, backgroundColor: "rgb(211,121,116)", alive: true },
      ],
      [
        { number: 4, backgroundColor: "rgb(239,54,127)", alive: false },
        { number: 5, backgroundColor: "rgb(157,42,72)", alive: true },
        { number: 7, backgroundColor: "rgb(214,211,140)", alive: false },
      ],
      [
        { number: 8, backgroundColor: "rgb(11,157,173)", alive: true },
        { number: 9, backgroundColor: "rgb(253,201,142)", alive: true },
        { number: 10, backgroundColor: "rgb(166,0,17)", alive: true },
        { number: 11, backgroundColor: "rgb(92,232,1)", alive: true },
      ],
      [
        { number: 12, backgroundColor: "rgb(150,156,116)", alive: true },
        { number: 13, backgroundColor: "rgb(6,218,86)", alive: false },
        { number: 14, backgroundColor: "rgb(184,105,86)", alive: true },
        { number: 15, backgroundColor: "rgb(63,171,56)", alive: true },
      ],
    ];

    expect(isValidCells(cells)).toBe(false);
  });

  it("isValidCells should return false (invalid cells array)", () => {
    const cells = [
      [
        { number: 0, backgroundColor: "rgb(220,228,138)", alive: true },
        { number: 1, backgroundColor: "rgb(228,134,158)", alive: false },
        { number: 2, backgroundColor: "rgb(251,149,155)", alive: true },
        { number: 3, alive: true },
      ],
    ];

    expect(isValidCells(cells)).toBe(false);
  });

  it("initial cells should be valid", () => {
    expect(isValidCells(getRandomCellsByRowSize(4))).toBe(true);
  });

  // with react
  it("should render field with 100 cells (row size input)", () => {
    render(
      <Provider store={store}>
        <Field rowSize={10} />
      </Provider>
    );
    const cells = screen.queryAllByTestId("cell");

    expect(cells).toHaveLength(100);
  });

  it("should render field with 4 cells (cells input)", () => {
    const inputCells = [
      [
        { number: 1, backgroundColor: "rgb(220,228,138)", alive: true },
        { number: 2, backgroundColor: "rgb(228,134,158)", alive: true },
      ],
      [
        { number: 3, backgroundColor: "rgb(251,149,155)", alive: true },
        { number: 4, backgroundColor: "rgb(211,121,116)", alive: true },
      ],
    ];

    render(
      <Provider store={store}>
        <Field inputCells={inputCells} />
      </Provider>
    );
    const cells = screen.queryAllByText(/\d+/g);

    expect(cells).toHaveLength(4);

    for (const cell of cells) {
      expect(cell).toBeVisible();
    }
  });

  it("should render list with row size of 5 and 4 cells actually rendered (row size input & cells input)", () => {
    const inputCells = [
      [
        { number: 1, backgroundColor: "rgb(220,228,138)", alive: true },
        { number: 2, backgroundColor: "rgb(228,134,158)", alive: true },
      ],
      [
        { number: 3, backgroundColor: "rgb(251,149,155)", alive: true },
        { number: 4, backgroundColor: "rgb(211,121,116)", alive: true },
      ],
    ];

    render(
      <Provider store={store}>
        <Field rowSize={5} inputCells={inputCells} />
      </Provider>
    );
    const cells = screen.queryAllByText(/\d+/g);

    expect(cells).toHaveLength(4);

    for (const cell of cells) {
      expect(cell).toBeVisible();
    }
  });

  it("should hide cell on click", () => {
    const bg = "rgb(220,228,138)";
    const inputCells = [[{ number: 1, backgroundColor: bg, alive: true }]];
    render(
      <Provider store={store}>
        <Field rowSize={1} inputCells={inputCells} />
      </Provider>
    );

    const cell = screen.getByText("1");
    fireEvent.click(cell);
    expect(cell).not.toHaveStyle({
      backgroundColor: bg,
    });
    expect(cell).toBeEmptyDOMElement();
  });

  it("should show cell on click", () => {
    const bg = "rgb(220,228,138)";
    const inputCells = [
      [{ number: 1, backgroundColor: "rgb(220,228,138)", alive: false }],
    ];

    render(
      <Provider store={store}>
        <Field rowSize={1} inputCells={inputCells} />
      </Provider>
    );

    const cell = screen.getByTestId("cell");
    fireEvent.click(cell);
    expect(cell).toHaveStyle({
      backgroundColor: bg,
    });
    expect(cell).not.toBeEmptyDOMElement();
  });

  it("should not change other cells on click", () => {
    const bg = "rgb(220,228,138)";
    const inputCells = [
      [
        { number: 1, backgroundColor: bg, alive: true },
        { number: 2, backgroundColor: bg, alive: true },
      ],
      [
        { number: 3, backgroundColor: bg, alive: true },
        { number: 4, backgroundColor: bg, alive: true },
      ],
    ];

    render(
      <Provider store={store}>
        <Field inputCells={inputCells} />
      </Provider>
    );

    const cell = screen.getByText("3");
    fireEvent.click(cell);

    const otherCells = screen.queryAllByText(/\d+/);

    for (const cell of otherCells) {
      expect(cell).toHaveStyle({
        backgroundColor: bg,
      });
      expect(cell).not.toBeEmptyDOMElement();
    }
  });
});
