import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Cell from "./Cell";
import { Provider } from "react-redux";
import testStore from "../redux/testStore";
import { setCellsAction } from "../redux/actions";

afterAll(() => {
  testStore.dispatch(setCellsAction([[]]));
});

describe("test cell", () => {
  const width = 30;
  const number = 1;
  const bg = "rgb(220,228,138)";
  const handleClick = jest.fn();

  it("should call click handler", () => {
    testStore.dispatch(
      setCellsAction([[{ number: number, backgroundColor: bg, alive: true }]])
    );

    render(
      <Provider store={testStore}>
        <Cell number={number} width={width} onCellClick={handleClick} />
      </Provider>
    );

    const cell = screen.getByText(String(number));
    fireEvent.click(cell);

    expect(handleClick).toHaveBeenCalledWith(number);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render alive cell", () => {
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = true;
    const handleClick = jest.fn();

    testStore.dispatch(
      setCellsAction([[{ number: number, backgroundColor: bg, alive: alive }]])
    );

    render(
      <Provider store={testStore}>
        <Cell width={width} number={number} onCellClick={handleClick} />
      </Provider>
    );

    const cell = screen.getByText(String(number));
    expect(cell).toBeVisible();
    expect(cell).toHaveStyle({
      width: 30,
      backgroundColor: bg,
    });
  });

  it("should render dead cell", () => {
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = false;
    const handleClick = jest.fn();

    testStore.dispatch(
      setCellsAction([[{ number: number, backgroundColor: bg, alive: alive }]])
    );

    render(
      <Provider store={testStore}>
        <Cell width={width} number={number} onCellClick={handleClick} />
      </Provider>
    );

    const cell = screen.getByTestId("cell");
    expect(cell).toBeEmptyDOMElement();
    expect(cell).not.toHaveStyle({
      backgroundColor: bg,
    });
  });
});
