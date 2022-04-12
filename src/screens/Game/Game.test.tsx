/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { delay, render, screen, waitFor, within } from "@/utils/test-utils";
import { render as renderOrigin } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import { Game, GameContainer } from "@/screens/Game/index";
import { COLORS } from "@/styles/ui-styled";
import { l10n } from "@/l10n/ru";
import {
  // @ts-ignore
  __RewireAPI__ as CellGeneratorRewire,
  getInitialCells,
} from "@/utils/CellGenerator";
import {
  defaultFieldControlState,
  IFieldControlState,
} from "@/components/Fields";
import { act } from "react-dom/test-utils";
import { FormContainer } from "@/components/Form";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("@/utils/FieldSize", () => {
  return {
    getFullScreenSize: jest
      .fn()
      .mockImplementation(
        jest.requireActual("@/utils/FieldSize").getFullScreenSize
      ),
  };
});

const getGameCycleTimeout = (speed: number) => {
  return 1000 / speed;
};

const getMockedCells = jest.fn().mockReturnValue([
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 5,
    y: 5,
  },
  {
    x: 6,
    y: 6,
  },
  {
    x: 7,
    y: 7,
  },
  {
    x: 8,
    y: 8,
  },
  {
    x: 9,
    y: 9,
  },
]);

const initialState = {
  fieldControl: {
    cellSize: 10,
    maxFieldWidth: 100,
    maxFieldHeight: 100,
    capacity: 50,
    speed: 2,
  },
  gameField: {
    activeCells: getInitialCells(100, 100, 10),
    gameInProgress: false,
    generations: 0,
  },
};

beforeEach(() => {
  jest.resetModules();
});

describe("Game tests", () => {
  it("should correctly render field and form", () => {
    const { asFragment } = render(<Game />, {
      preloadedState: initialState,
    });

    const fieldContainer = screen.getByTestId("gameFieldContainer");
    const field = within(fieldContainer).getByTestId("field");
    expect(field).toBeInTheDocument();

    const form = screen.getByTestId("field-form");
    expect(form).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 100 cells with numbers", () => {
    render(<Game />, {
      preloadedState: initialState,
    });

    const fieldContainer = screen.getByTestId("gameFieldContainer");
    const cells = within(fieldContainer).getAllByLabelText(/[0-9]*/, {
      selector: "[data-testid=cell]",
    });
    expect(cells).toHaveLength(100);
  });

  it("should start game cycle", async () => {
    CellGeneratorRewire.__Rewire__("getNextGeneration", getMockedCells);

    const { SagaTask } = render(<GameContainer />, {
      preloadedState: initialState,
    });

    const fieldContainer = screen.getByTestId("gameFieldContainer");
    const activeCells = within(fieldContainer).getAllByLabelText(
      /^(1|12|23|34|45|56|67|78|89|100)$/,
      {
        selector: "[data-testid=cell]",
      }
    );

    const startButton = screen.getByText(l10n.buttonStart);

    userEvent.click(startButton);

    await Promise.all(
      activeCells.map((cell: HTMLElement) => {
        return waitFor(() => {
          expect(cell).toHaveStyle({
            background: COLORS.activeCellBg,
          });
        });
      })
    );

    SagaTask.cancel();
    CellGeneratorRewire.__ResetDependency__("getNextGeneration");
  });

  it("should set random cells on generateRandom", async () => {
    CellGeneratorRewire.__Rewire__("getRandomCells", getMockedCells);

    render(<GameContainer />, {
      preloadedState: initialState,
    });

    const fieldContainer = screen.getByTestId("gameFieldContainer");
    const activeCells = within(fieldContainer).getAllByLabelText(
      /^(1|12|23|34|45|56|67|78|89|100)$/,
      {
        selector: "[data-testid=cell]",
      }
    );

    const generateRandomButton = screen.getByText(l10n.buttonGenerateRandom);

    userEvent.click(generateRandomButton);

    await Promise.all(
      activeCells.map((cell: HTMLElement) => {
        return waitFor(() => {
          expect(cell).toHaveStyle({
            background: COLORS.activeCellBg,
          });
        });
      })
    );

    CellGeneratorRewire.__ResetDependency__("getRandomCells");
  });

  it("should change cells 10 times every 100ms and then stop game cycle", async () => {
    const checks = 10;
    const speed = 100;
    const gameCycleTimeout = getGameCycleTimeout(speed);
    const setActiveCells = (colNum: number): RegExp => {
      getMockedCells.mockReturnValue(
        [...Array(checks).keys()].map((n: number, i) => {
          return {
            x: colNum,
            y: i,
          };
        })
      );

      CellGeneratorRewire.__Rewire__("getNextGeneration", getMockedCells);

      return new RegExp(
        `^(${[...Array(checks).keys()].reduce((acc, current, i) => {
          return acc.concat(
            `${colNum + 1 + i * checks}${i === checks ? "" : "|"}`
          );
        }, "")})$`
      );
    };

    render(<GameContainer />, {
      preloadedState: {
        ...initialState,
        fieldControl: {
          ...initialState.fieldControl,
          speed,
        },
      },
    });

    const buttonStart = screen.getByText(l10n.buttonStart);
    const buttonStop = screen.getByText(l10n.buttonStop);

    userEvent.click(buttonStart);

    await waitFor(() => {
      expect(buttonStart).toBeDisabled();
    });

    await [...Array(checks).keys()].reduce(
      (promise: Promise<void>, colNum): Promise<void> => {
        return promise.then((): Promise<void> => {
          const cellsToFindRegExp = setActiveCells(colNum);

          return waitFor(() => {
            expect(getMockedCells).toHaveBeenCalled();
          }).then(async (): Promise<void> => {
            const fieldContainer = screen.getByTestId("gameFieldContainer");
            const activeCells = within(fieldContainer).getAllByLabelText(
              cellsToFindRegExp,
              {
                selector: "[data-testid=cell]",
              }
            );

            await Promise.all(
              activeCells.map((cell: HTMLElement): Promise<void> => {
                return waitFor(() => {
                  expect(cell).toHaveStyle({
                    background: COLORS.activeCellBg,
                  });
                });
              })
            );
          });
        });
      },
      Promise.resolve()
    );

    userEvent.click(buttonStop);

    await waitFor(() => {
      expect(buttonStart).toBeEnabled();
    });

    const currentTicks: number = getMockedCells.mock.calls.length;

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(getMockedCells).toHaveBeenCalledTimes(currentTicks);
        resolve();
      }, 2 * gameCycleTimeout);
    });

    CellGeneratorRewire.__ResetDependency__("getNextGeneration");
  });

  it("should load form values data from state", () => {
    const cellSize = 20;
    const maxFieldWidth = 200;
    const maxFieldHeight = 200;
    const capacity = 23;
    const speed = 10;

    render(<Game />, {
      preloadedState: {
        fieldControl: {
          cellSize,
          maxFieldWidth,
          maxFieldHeight,
          capacity,
          speed,
        },
      },
    });

    const form: HTMLFormElement = screen.getByTestId("field-form");

    expect(form).toHaveFormValues({
      fieldWidth: maxFieldWidth,
      fieldHeight: maxFieldHeight,
      cellSize: cellSize,
      capacityPercentage: String(capacity),
      speedChange: speed,
    });
  });

  describe("form actions tests", () => {
    const initialState: IFieldControlState = {
      cellSize: 20,
      maxFieldWidth: 200,
      maxFieldHeight: 200,
      capacity: 50,
      speed: 2,
    };

    const targetState: IFieldControlState = {
      cellSize: 30,
      maxFieldWidth: 350,
      maxFieldHeight: 150,
      capacity: 25,
      speed: 0.5,
    };

    const labels: Record<keyof IFieldControlState, string> = {
      cellSize: l10n.cellSizeLabel,
      maxFieldWidth: l10n.maxWidthLabel,
      maxFieldHeight: l10n.maxHeightLabel,
      capacity: l10n.capacityLabel,
      speed: l10n.speedLabel,
    };

    Object.keys(initialState).forEach((prop) => {
      it(`should change ${prop} inside store`, async () => {
        const { store } = render(<GameContainer />, {
          preloadedState: {
            fieldControl: initialState,
          },
        });

        const field: HTMLInputElement = screen.getByLabelText(
          labels[prop as keyof IFieldControlState]
        );

        userEvent.clear(field);
        userEvent.type(
          field,
          String(targetState[prop as keyof IFieldControlState])
        );
        field.blur();

        await waitFor(() => {
          expect(
            store.getState().fieldControl[prop as keyof IFieldControlState]
          ).toEqual(targetState[prop as keyof IFieldControlState]);
        });
      });
    });
  });

  it("should reset all properties to initial", async () => {
    const cellSize = 10;
    const maxFieldWidth = 100;
    const maxFieldHeight = 100;
    const capacity = 50;
    const speed = 10;
    const gameCycleTimeout = getGameCycleTimeout(speed);

    jest
      .requireMock("@/utils/FieldSize")
      .getFullScreenSize.mockImplementation(() => ({
        width: 100,
        height: 100,
      }));

    const {
      defaultFieldControlState,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require("@/components/Fields/slice");
    const {
      RootReducer,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require("@/store/redux/store");
    const store = configureStore({
      reducer: RootReducer,
      preloadedState: {
        fieldControl: {
          cellSize,
          maxFieldWidth,
          maxFieldHeight,
          capacity,
          speed,
        },
      },
    });

    renderOrigin(
      <Provider store={store}>
        <GameContainer />
      </Provider>
    );

    const buttonStart = screen.getByText(l10n.buttonStart);
    const buttonReset = screen.getByText(l10n.buttonReset);

    userEvent.click(buttonStart);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        userEvent.click(buttonReset);
        resolve();
      }, 3 * gameCycleTimeout);
    });

    const fieldContainer = screen.getByTestId("gameFieldContainer");
    const cells = within(fieldContainer).getAllByTestId("cell");

    await Promise.all(
      cells.map((cell: HTMLElement) => {
        return waitFor(() => {
          expect(cell).not.toHaveStyle({
            background: COLORS.activeCellBg,
          });
        });
      })
    );

    const cellsLengthExpected =
      Math.floor(
        defaultFieldControlState.maxFieldWidth /
          defaultFieldControlState.cellSize
      ) *
      Math.floor(
        defaultFieldControlState.maxFieldHeight /
          defaultFieldControlState.cellSize
      );
    expect(cells.length).toBe(cellsLengthExpected);

    const form: HTMLFormElement = screen.getByTestId("field-form");
    expect(form).toHaveFormValues({
      fieldWidth: defaultFieldControlState.maxFieldWidth,
      fieldHeight: defaultFieldControlState.maxFieldHeight,
      cellSize: defaultFieldControlState.cellSize,
      capacityPercentage: String(defaultFieldControlState.capacity),
      speedChange: defaultFieldControlState.speed,
    });
  });

  describe("should clear form field debounce timeout before player logout", () => {
    it("max width", async () => {
      const { store } = render(<GameContainer />, {
        preloadedState: {
          ...initialState,
          fieldControl: {
            ...initialState.fieldControl,
            maxFieldWidth: 100,
          },
        },
      });

      const unregisterButton = screen.getByText(l10n.logoutButton);

      userEvent.click(unregisterButton);

      await act(async () => {
        await delay(FormContainer.inputDelay + 50);
      });

      expect(store.getState().fieldControl).toEqual(defaultFieldControlState);
    });
  });

  describe("should render game field accordingly to client's screen size", () => {
    beforeEach(() => {
      // jest.resetModules();
    });

    it("cellsAmount > max amount; field w: 300, h: 300, cellSize: 4, cellsAmount: 5625", () => {
      jest
        .requireMock("@/utils/FieldSize")
        .getFullScreenSize.mockImplementation(() => ({
          width: 4000,
          height: 4000,
        }));

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { store } = require("@/store/redux/store");

      renderOrigin(
        <Provider store={store}>
          <GameContainer />
        </Provider>
      );

      const fieldContainer = screen.getByTestId("gameFieldContainer");
      const field = within(fieldContainer).getByTestId("field");
      const cells = within(field).getAllByTestId("cell");

      expect(field).toHaveStyle({
        width: "300px",
        height: "300px",
      });
      expect(cells.length).toBe(5625);
      expect(cells[0]).toHaveStyle({
        width: "4px",
        height: "4px",
      });
    });

    it("cellsAmount < max amount; field w: 600, h: 600, cellSize: 10, cellsAmount: 3600", () => {
      jest
        .requireMock("@/utils/FieldSize")
        .getFullScreenSize.mockImplementation(() => ({
          width: 600,
          height: 600,
        }));

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { store } = require("@/store/redux/store");

      renderOrigin(
        <Provider store={store}>
          <GameContainer />
        </Provider>
      );

      const fieldContainer = screen.getByTestId("gameFieldContainer");
      const field = within(fieldContainer).getByTestId("field");
      const cells = within(field).getAllByTestId("cell");

      expect(field).toHaveStyle({
        width: "600px",
        height: "600px",
      });
      expect(cells.length).toBe(3600);
      expect(cells[0]).toHaveStyle({
        width: "10px",
        height: "10px",
      });
    });

    it("cellsAmount === max amount; field w: 1000, h: 2000, cellSize: 10, cellsAmount: 20000", () => {
      jest
        .requireMock("@/utils/FieldSize")
        .getFullScreenSize.mockImplementation(() => ({
          width: 1000,
          height: 2000,
        }));

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { store } = require("@/store/redux/store");

      renderOrigin(
        <Provider store={store}>
          <GameContainer />
        </Provider>
      );

      const fieldContainer = screen.getByTestId("gameFieldContainer");
      const field = within(fieldContainer).getByTestId("field");
      const cells = within(field).getAllByTestId("cell");

      expect(field).toHaveStyle({
        width: "1000px",
        height: "2000px",
      });
      expect(cells.length).toBe(20000);
      expect(cells[0]).toHaveStyle({
        width: "10px",
        height: "10px",
      });
    });
  });
});
