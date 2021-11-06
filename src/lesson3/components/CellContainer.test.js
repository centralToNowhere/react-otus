import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CellContainer from "./CellContainer";
import { Provider } from "react-redux";
import testStore from "../redux/testStore";
import { setCellsAction } from "../redux/actions";

describe("test cell container", () => {
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
        <CellContainer
          number={number}
          width={width}
          onCellClick={handleClick}
        />
      </Provider>
    );

    const cell = screen.getByText(String(number));
    fireEvent.click(cell);

    expect(handleClick).toHaveBeenCalledWith(number);
    expect(handleClick).toHaveBeenCalledTimes(1);

    testStore.dispatch(setCellsAction([[]]));
  });
});
