/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import {
  GameFieldContainer,
  getRandomCells,
  createFormKey,
  getGameCycleTimeout,
  // @ts-ignore
  __RewireAPI__ as GameFieldContainerRewire,
} from "@/components/GameFieldContainer/GameFieldContainer";
import { ICell } from "@/components/Cell";
import { COLORS } from "@/styles/ui-styled";
import { l10n } from "@/l10n/ru";

/**
 * Зачем я использую babel-plugin-rewire-ts?
 * funnyExports.ts
 *
  export const foo = () => {
    return "foo";
  }

  export const bar = () => {
    return foo();
  }
 *
 * funnyExports.test.ts
 *
  describe("impossible to mock foo", () => {
    it("no mocks for you cause of babel static binding foo inside bar - no way", () => {
      jest.doMock("./hell", () => {
        return {
          ...jest.requireActual("./hell"),
          foo: jest.fn().mockReturnValue("bar")
        }
      });

      const { bar } = require("./hell")
      expect(bar()).toBe("bar") // foo не переопределилась, не благодари
    })
  })
 **/

const getRandomCellsMocked = jest.fn().mockReturnValue([
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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GameFieldContainer tests", () => {
  it("should correctly render field and form", async () => {
    const { asFragment } = render(<GameFieldContainer />);

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

  it("getRandomCells should return 150 cells", () => {
    const cells = getRandomCells(15, 10, 100);

    expect(cells).toHaveLength(150);
    expect(
      cells.every((cell: ICell) => {
        return (
          cell !== null &&
          typeof cell === "object" &&
          typeof cell.x === "number" &&
          typeof cell.y === "number"
        );
      })
    ).toBe(true);
  });

  it("getRandomCells should return 150/150 cells", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(49);
    expect(getRandomCells(15, 10, 50)).toHaveLength(150);
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("getRandomCells should return 0/150 cells", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(51);
    expect(getRandomCells(15, 10, 50)).toHaveLength(0);
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("getRandomCells should return 0 cells", () => {
    expect(getRandomCells(15, 10, 0)).toHaveLength(0);
  });

  it("getRandomCells should return 1 cell", () => {
    expect(getRandomCells(1, 1, 100)).toHaveLength(1);
  });

  it("getRandomCells should return 0 cells", () => {
    expect(getRandomCells(0, 1, 100)).toHaveLength(0);
    expect(getRandomCells(1, 0, 100)).toHaveLength(0);
  });

  it("should render 100 cells with numbers", () => {
    render(
      <GameFieldContainer
        cellSize={10}
        maxFieldWidth={100}
        maxFieldHeight={100}
        capacity={50}
        speed={2}
      />
    );

    const cells = screen.getAllByText(/[0-9]*/, {
      selector: "[data-testid=cell]",
    });
    expect(cells).toHaveLength(100);
  });

  it("getGameCycleTimeout should return valid number", () => {
    expect(getGameCycleTimeout(50)).toBe(20);
  });

  it("should start game cycle", async () => {
    GameFieldContainerRewire.__Rewire__("getRandomCells", getRandomCellsMocked);

    render(
      <GameFieldContainer
        cellSize={10}
        maxFieldWidth={100}
        maxFieldHeight={100}
        capacity={50}
        speed={2}
      />
    );

    const activeCells = screen.getAllByText(
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

    GameFieldContainerRewire.__ResetDependency__("getRandomCells");
  });

  it("should change cells 10 times every 100ms and then stop game cycle", async () => {
    const checks = 10;
    const speed = 50;
    const gameCycleTimeout = getGameCycleTimeout(speed);
    const setActiveCells = (colNum: number): RegExp => {
      getRandomCellsMocked.mockReturnValue(
        [...Array(checks).keys()].map((n: number, i) => {
          return {
            x: colNum,
            y: i,
          };
        })
      );
      GameFieldContainerRewire.__Rewire__(
        "getRandomCells",
        getRandomCellsMocked
      );

      return new RegExp(
        `^(${[...Array(checks).keys()].reduce((acc, current, i) => {
          return acc.concat(
            `${colNum + 1 + i * checks}${i === checks ? "" : "|"}`
          );
        }, "")})$`
      );
    };

    render(
      <GameFieldContainer
        cellSize={10}
        maxFieldWidth={100}
        maxFieldHeight={100}
        capacity={50}
        speed={speed}
      />
    );

    const buttonStart = screen.getByText(l10n.buttonStart);
    const buttonStop = screen.getByText(l10n.buttonStop);

    userEvent.click(buttonStart);

    await [...Array(checks).keys()].reduce(
      (promise: Promise<void>, colNum): Promise<void> => {
        return promise.then((): Promise<void> => {
          const cellsToFindRegExp = setActiveCells(colNum);

          return waitFor(() => {
            expect(getRandomCellsMocked).toHaveBeenCalled();
          }).then(async (): Promise<void> => {
            const activeCells = screen.getAllByText(cellsToFindRegExp, {
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

    const currentTicks: number = getRandomCellsMocked.mock.calls.length;

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(getRandomCellsMocked).toHaveBeenCalledTimes(currentTicks);
        resolve();
      }, 2 * gameCycleTimeout);
    });

    GameFieldContainerRewire.__ResetDependency__("getRandomCells");
  });

  it("should reset all properties to initial", async () => {
    const cellSize = 10;
    const maxFieldWidth = 100;
    const maxFieldHeight = 100;
    const capacity = 50;
    const speed = 10;
    const gameCycleTimeout = getGameCycleTimeout(speed);

    render(
      <GameFieldContainer
        cellSize={cellSize}
        maxFieldWidth={maxFieldWidth}
        maxFieldHeight={maxFieldHeight}
        capacity={capacity}
        speed={speed}
      />
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
      Math.floor(maxFieldWidth / cellSize) *
      Math.floor(maxFieldHeight / cellSize);
    expect(cells.length).toBe(cellsLengthExpected);

    const form: HTMLFormElement = screen.getByTestId("field-form");
    expect(form).toHaveFormValues({
      fieldWidth: maxFieldWidth,
      fieldHeight: maxFieldHeight,
      cellSize: cellSize,
      capacityPercentage: String(capacity),
      speedChange: speed,
    });
  });
});