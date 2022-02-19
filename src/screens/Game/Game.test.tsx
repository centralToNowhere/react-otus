/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event/dist";
import {
  Game,
  GameContainer,
  getGameCycleTimeout,
  createFormKey,
} from "@/screens/Game/index";
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
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Game tests", () => {
  it("should correctly render field and form", async () => {
    const { asFragment } = render(<Game />, {
      preloadedState: {},
    });

    const field = screen.getByTestId("field");
    expect(field).toBeInTheDocument();

    const form = screen.getByTestId("field-form");
    expect(form).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("createFormKey should return number with value from 0 to 10000", () => {
    expect(createFormKey()).toBeGreaterThan(0);
    expect(createFormKey()).toBeLessThan(10000);
  });

  it("should render 100 cells with numbers", () => {
    render(<Game />, {
      preloadedState: initialState,
    });

    const cells = screen.getAllByLabelText(/[0-9]*/, {
      selector: "[data-testid=cell]",
    });
    expect(cells).toHaveLength(100);
  });

  it("getGameCycleTimeout should return valid number", () => {
    expect(getGameCycleTimeout(50)).toBe(20);
  });

  it("should start game cycle", async () => {
    CellGeneratorRewire.__Rewire__("getNextGeneration", getMockedCells);

    render(<GameContainer />, {
      preloadedState: initialState,
    });

    const activeCells = screen.getAllByLabelText(
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

    CellGeneratorRewire.__ResetDependency__("getNextGeneration");
  });

  it("should set random cells on generateRandom", async () => {
    CellGeneratorRewire.__Rewire__("getRandomCells", getMockedCells);

    render(<GameContainer />, {
      preloadedState: initialState,
    });

    const activeCells = screen.getAllByLabelText(
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
    const speed = 50;
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
            const activeCells = screen.getAllByLabelText(cellsToFindRegExp, {
              selector: "[data-testid=cell]",
            });

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

    CellGeneratorRewire.__ResetDependency__(
      "getNextGeneration",
      getMockedCells
    );
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

    render(<GameContainer />, {
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

    const buttonStart = screen.getByText(l10n.buttonStart);
    const buttonReset = screen.getByText(l10n.buttonReset);

    userEvent.click(buttonStart);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        userEvent.click(buttonReset);
        resolve();
      }, 3 * gameCycleTimeout);
    });

    const cells = screen.getAllByTestId("cell");

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
});
