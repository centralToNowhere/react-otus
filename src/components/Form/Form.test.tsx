import React from "react";
import userEvent from "@testing-library/user-event/dist";
import { delay, render, screen, waitFor } from "@/utils/test-utils";
import { FormContainer } from "./FormContainer";
import { l10n } from "@/l10n/ru";
import { act } from "react-dom/test-utils";

jest.mock("@/Cell/Cell");

const cellMocks = jest.requireMock("@/Cell/Cell");
const cellOrigin = jest.requireActual("@/Cell/Cell");

const originalInputDelay = FormContainer.inputDelay;

const initialState = {
  fieldControl: {
    cellSize: 40,
    maxFieldWidth: 1920,
    maxFieldHeight: 474,
    capacity: 50,
    speed: 10,
  },
};
describe("form tests", () => {
  it("should render form", () => {
    const { asFragment } = render(<FormContainer />, {
      preloadedState: initialState,
    });

    const form: HTMLFormElement = screen.getByTestId("field-form");

    expect(form).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cellSize input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render capacity-percentage input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.capacityLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render width input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render height input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxHeightLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render speed-change", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input = screen.getByLabelText(l10n.speedLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render start button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    expect(button).toBeInTheDocument();
  });

  it("should render stop button", () => {
    render(<FormContainer />, {
      preloadedState: {
        ...initialState,
        gameField: {
          activeCells: [],
          generations: 1,
          gameInProgress: true,
        },
      },
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    expect(button).toBeInTheDocument();
  });

  it("should render reset button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    expect(button).toBeInTheDocument();
  });

  it("should render generateRandom button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(
      l10n.buttonGenerateRandom
    );

    expect(button).toBeInTheDocument();
  });
});

describe("buttons tests", () => {
  it("should run onStart", () => {
    const onStart = jest.fn();

    render(<FormContainer onButtonClickFn={onStart} />, {
      preloadedState: initialState,
    });

    const buttonStart: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    userEvent.click(buttonStart);

    expect(onStart).toHaveBeenCalled();
  });

  it("should run onStop", () => {
    const onStop = jest.fn();

    render(<FormContainer onButtonClickFn={onStop} />, {
      preloadedState: {
        ...initialState,
        gameField: {
          activeCells: [],
          generations: 1,
          gameInProgress: true,
        },
      },
    });

    const buttonStop: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    userEvent.click(buttonStop);

    expect(onStop).toHaveBeenCalled();
  });

  it("should run onReset", () => {
    const onReset = jest.fn();

    render(<FormContainer onButtonClickFn={onReset} />, {
      preloadedState: initialState,
    });

    const buttonReset: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    userEvent.click(buttonReset);

    expect(onReset).toHaveBeenCalled();
  });

  it("should run onGenerateRandom", () => {
    const onGenerateRandom = jest.fn();

    render(<FormContainer onButtonClickFn={onGenerateRandom} />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(
      l10n.buttonGenerateRandom
    );

    userEvent.click(button);

    expect(onGenerateRandom).toHaveBeenCalled();
  });

  describe("Fields tests", () => {
    beforeEach(() => {
      FormContainer.inputDelay = 30;
    });

    afterEach(() => {
      FormContainer.inputDelay = originalInputDelay;
      cellMocks.maxCellsAmount = cellOrigin.maxCellsAmount;
    });

    describe("GameField size & cell size related fields", () => {
      const shouldChange = [
        {
          maxFieldWidth: 1920,
          maxFieldHeight: 474,
          cellSize: 7,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 10,
          maxFieldHeight: 10,
          cellSize: 1,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 10000,
          maxFieldHeight: 1000,
          cellSize: 1000,
          maxCellsAmount: 10,
        },
        {
          maxFieldWidth: 100,
          maxFieldHeight: 100,
          cellSize: 1,
          maxCellsAmount: 10000,
        },
        {
          maxFieldWidth: 1,
          maxFieldHeight: 1,
          cellSize: 1,
          maxCellsAmount: 1,
        },
      ];

      const shouldNotChangeCellsAmountMax = [
        {
          maxFieldWidth: 1920,
          maxFieldHeight: 474,
          cellSize: 6,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 200,
          maxFieldHeight: 200,
          cellSize: 1,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 100,
          maxFieldHeight: 11,
          cellSize: 1,
          maxCellsAmount: 1000,
        },
        {
          maxFieldWidth: 1,
          maxFieldHeight: 1,
          cellSize: 1,
          maxCellsAmount: 0,
        },
      ];

      const shouldNotChangeCellsAmountMin = [
        {
          maxFieldWidth: 10,
          maxFieldHeight: 474,
          cellSize: 40,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 100,
          maxFieldHeight: 10,
          cellSize: 100,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 10,
          maxFieldHeight: 10,
          cellSize: 40,
          maxCellsAmount: 20000,
        },
      ];

      const shouldNotChangeCellSize = [
        {
          maxFieldWidth: 1,
          maxFieldHeight: 1,
          cellSize: 0,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 1,
          maxFieldHeight: 1,
          cellSize: 0.5,
          maxCellsAmount: 20000,
        },
      ];

      const shouldNotChangeMaxWidth = [
        {
          maxFieldWidth: 0,
          maxFieldHeight: 1,
          cellSize: 1,
          maxCellsAmount: 1,
        },
      ];

      const shouldNotChangeMaxHeight = [
        {
          maxFieldWidth: 1,
          maxFieldHeight: 0,
          cellSize: 1,
          maxCellsAmount: 1,
        },
      ];

      describe("SHOULD CHANGE GAME FIELD STATE", () => {
        shouldChange.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              const { store } = render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(store.getState().fieldControl).toEqual(
                    expect.objectContaining({
                      cellSize,
                      maxFieldWidth,
                      maxFieldHeight,
                    })
                  );
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        it(`cellSize: -1,
            maxFieldWidth: -1,
            maxFieldHeight: -1,
            maxCellsAmount: 1`, async () => {
          cellMocks.maxCellsAmount = 1;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(-1));

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(-1));

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(-1));

          await waitFor(
            () => {
              expect(store.getState().fieldControl).toEqual(
                expect.objectContaining({
                  cellSize: 1,
                  maxFieldWidth: 1,
                  maxFieldHeight: 1,
                })
              );
            },
            {
              timeout: FormContainer.inputDelay + 50,
            }
          );
        });
      });

      describe("SHOULD NOT CHANGE GAME FIELD STATE", () => {
        shouldNotChangeCellsAmountMax.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`EXCEEDED MAX CELLS AMOUNT 
            cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(
                    screen.getByText(l10n.maxCellsAmount, { exact: false })
                  ).toBeVisible();
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        shouldNotChangeCellsAmountMin.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`CELL SIZE IS LARGER THAN FIELD SIZE 
            cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(screen.getByText(l10n.minCellsAmount)).toBeVisible();
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        shouldNotChangeCellSize.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`INVALID CELL SIZE
            cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(screen.getByText(l10n.positiveNumber)).toBeVisible();
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        shouldNotChangeMaxWidth.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`INVALID MAX WIDTH
            cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(screen.getByText(l10n.positiveNumber)).toBeVisible();
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        shouldNotChangeMaxHeight.forEach(
          ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
            it(`INVALID MAX HEIGHT
            cellSize: ${cellSize},
            maxFieldWidth: ${maxFieldWidth},
            maxFieldHeight: ${maxFieldHeight},
            maxCellsAmount: ${maxCellsAmount}`, async () => {
              cellMocks.maxCellsAmount = maxCellsAmount;

              render(<FormContainer />, {
                preloadedState: initialState,
              });

              const inputCellSize: HTMLInputElement = screen.getByLabelText(
                l10n.cellSizeLabel
              );

              const inputMaxFieldWidth: HTMLInputElement =
                screen.getByLabelText(l10n.maxWidthLabel);

              const inputMaxFieldHeight: HTMLInputElement =
                screen.getByLabelText(l10n.maxHeightLabel);

              userEvent.clear(inputMaxFieldWidth);
              userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

              userEvent.clear(inputMaxFieldHeight);
              userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

              userEvent.clear(inputCellSize);
              userEvent.type(inputCellSize, String(cellSize));

              await waitFor(
                () => {
                  expect(screen.getByText(l10n.positiveNumber)).toBeVisible();
                },
                {
                  timeout: FormContainer.inputDelay + 50,
                }
              );
            });
          }
        );

        it(`INVALID MAX WIDTH AND MAX HEIGHT
            cellSize: 1,
            maxFieldWidth: 0,
            maxFieldHeight: 0,
            maxCellsAmount: 20000`, async () => {
          cellMocks.maxCellsAmount = 20000;

          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(0));

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(0));

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(1));

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          const errors = await screen.findAllByText(l10n.positiveNumber);

          expect(errors.length).toBe(2);
          errors.forEach((error) => expect(error).toBeVisible());
        });

        it(`INVALID MAX WIDTH AND CELL SIZE
            cellSize: 0,
            maxFieldWidth: 0,
            maxFieldHeight: 1,
            maxCellsAmount: 20000`, async () => {
          cellMocks.maxCellsAmount = 20000;

          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(0));

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(1));

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(0));

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          const errors = await screen.findAllByText(l10n.positiveNumber);

          expect(errors.length).toBe(2);
          errors.forEach((error) => expect(error).toBeVisible());
        });

        it(`INVALID MAX HEIGHT AND CELL SIZE
            cellSize: 0,
            maxFieldWidth: 1,
            maxFieldHeight: 0,
            maxCellsAmount: 20000`, async () => {
          cellMocks.maxCellsAmount = 20000;

          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(1));

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(0));

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(0));

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          const errors = await screen.findAllByText(l10n.positiveNumber);

          expect(errors.length).toBe(2);
          errors.forEach((error) => expect(error).toBeVisible());
        });
      });

      describe("ON BLUR", () => {
        it("CHANGE MAX WIDTH", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(1000));

          inputMaxFieldWidth.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1000,
            })
          );
        });

        it("NOT CHANGE MAX WIDTH", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, String(0));

          inputMaxFieldWidth.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
            })
          );
        });

        it("CHANGE MAX HEIGHT", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(300));

          inputMaxFieldHeight.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldHeight: 300,
            })
          );
        });

        it("NOT CHANGE MAX HEIGHT", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, String(0));

          inputMaxFieldHeight.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldHeight: 474,
            })
          );
        });

        it("CHANGE CELL SIZE", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(30));

          inputCellSize.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              cellSize: 30,
            })
          );
        });

        it("NOT CHANGE CELL SIZE", async () => {
          cellMocks.maxCellsAmount = 20000;

          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, String(0));

          inputCellSize.blur();

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              cellSize: 40,
            })
          );
        });
      });

      describe("sequential fields validation", () => {
        it(`
        width change ->
        minCellsAmount validation error ->
        height change ->
        minCellsAmount validation error ->
        cellSize change ->
        validation success ->
        state change`, async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: {
              ...initialState,
              fieldControl: {
                ...initialState.fieldControl,
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              },
            },
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 10,
              maxFieldHeight: 10,
              cellSize: 10,
            })
          );

          expect(
            screen.queryByText(l10n.minCellsAmount)
          ).not.toBeInTheDocument();
        });

        it(`
        height change ->
        minCellsAmount validation error ->
        width change ->
        minCellsAmount validation error ->
        cellSize change ->
        validation success ->
        state change`, async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: {
              ...initialState,
              fieldControl: {
                ...initialState.fieldControl,
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              },
            },
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, "10");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 10,
              maxFieldHeight: 10,
              cellSize: 10,
            })
          );

          expect(
            screen.queryByText(l10n.minCellsAmount)
          ).not.toBeInTheDocument();
        });

        it(`
        cellSize change ->
        maxCellsAmount validation error ->
        width change ->
        maxCellsAmount validation error ->
        height change ->
        validation success ->
        state change`, async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: {
              ...initialState,
              fieldControl: {
                ...initialState.fieldControl,
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              },
            },
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, "1");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, "100");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, "1");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1,
              maxFieldHeight: 100,
              cellSize: 1,
            })
          );

          expect(
            screen.queryByText(l10n.maxCellsAmount, { exact: false })
          ).not.toBeInTheDocument();
        });

        it(`
        cellSize change ->
        maxCellsAmount validation error ->
        height change ->
        maxCellsAmount validation error ->
        width change ->
        validation success ->
        state change`, async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: {
              ...initialState,
              fieldControl: {
                ...initialState.fieldControl,
                maxFieldWidth: 1920,
                maxFieldHeight: 1000,
                cellSize: 40,
              },
            },
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, "1");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 1000,
              cellSize: 40,
            })
          );

          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, "50");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 1000,
              cellSize: 40,
            })
          );

          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, "100");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 50,
              maxFieldHeight: 100,
              cellSize: 1,
            })
          );

          expect(
            screen.queryByText(l10n.maxCellsAmount, { exact: false })
          ).not.toBeInTheDocument();
        });

        it(`
        cellSize change ->
        maxCellsAmount validation error ->
        height change ->
        validation success ->
        state change`, async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: {
              ...initialState,
              fieldControl: {
                ...initialState.fieldControl,
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              },
            },
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, "1");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 474,
              cellSize: 40,
            })
          );

          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, "1");

          await act(async () => {
            await delay(FormContainer.inputDelay + 50);
          });

          expect(store.getState().fieldControl).toEqual(
            expect.objectContaining({
              maxFieldWidth: 1920,
              maxFieldHeight: 1,
              cellSize: 1,
            })
          );

          expect(
            screen.queryByText(l10n.maxCellsAmount, { exact: false })
          ).not.toBeInTheDocument();
        });
      });
    });

    describe("maxWidth field", () => {
      ["-", "", "qwerty", "0"].forEach((value) => {
        it(`SHOULD SHOW ${l10n.positiveNumber} ERROR`, async () => {
          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
            l10n.maxWidthLabel
          );

          userEvent.clear(inputMaxFieldWidth);
          userEvent.type(inputMaxFieldWidth, value);

          await waitFor(() => {
            expect(screen.getByText(l10n.positiveNumber)).toBeInTheDocument();
          });
        });
      });

      it(`SHOULD SHOW ${l10n.minCellsAmount} ERROR`, async () => {
        render(<FormContainer />, {
          preloadedState: initialState,
        });

        const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
        );

        userEvent.clear(inputMaxFieldWidth);
        userEvent.type(inputMaxFieldWidth, "-1");

        await waitFor(() => {
          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();
        });
      });
    });

    describe("maxHeight field", () => {
      ["-", "", "qwerty", "0"].forEach((value) => {
        it(`SHOULD SHOW ${l10n.positiveNumber} ERROR`, async () => {
          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
            l10n.maxHeightLabel
          );

          userEvent.clear(inputMaxFieldHeight);
          userEvent.type(inputMaxFieldHeight, value);

          await waitFor(() => {
            expect(screen.getByText(l10n.positiveNumber)).toBeInTheDocument();
          });
        });
      });

      it(`SHOULD SHOW ${l10n.minCellsAmount} ERROR`, async () => {
        render(<FormContainer />, {
          preloadedState: initialState,
        });
        cellMocks.maxCellsAmount = 20000;

        const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
          l10n.maxHeightLabel
        );

        userEvent.clear(inputMaxFieldHeight);
        userEvent.type(inputMaxFieldHeight, "-1");

        await waitFor(() => {
          expect(screen.getByText(l10n.minCellsAmount)).toBeInTheDocument();
        });
      });
    });

    describe("cellSize field", () => {
      ["-", "", "qwerty", "0", "40.5"].forEach((value) => {
        it(`SHOULD SHOW ${l10n.positiveNumber} ERROR`, async () => {
          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCellSize: HTMLInputElement = screen.getByLabelText(
            l10n.cellSizeLabel
          );

          userEvent.clear(inputCellSize);
          userEvent.type(inputCellSize, value);

          await waitFor(() => {
            expect(screen.getByText(l10n.positiveNumber)).toBeInTheDocument();
          });
        });
      });

      it(`SHOULD SHOW ${l10n.maxCellsAmount} ERROR`, async () => {
        render(<FormContainer />, {
          preloadedState: initialState,
        });
        cellMocks.maxCellsAmount = 20000;

        const inputCellSize: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(inputCellSize);
        userEvent.type(inputCellSize, "-1");

        await waitFor(() => {
          expect(
            screen.getByText(l10n.maxCellsAmount, { exact: false })
          ).toBeInTheDocument();
        });
      });
    });

    describe("Capacity field", () => {
      ["1", "10", "100", "0"].forEach((value) => {
        it("SHOULD CHANGE GAME FIELD CAPACITY", async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputCapacity = screen.getByLabelText(l10n.capacityLabel);

          userEvent.clear(inputCapacity);
          userEvent.type(inputCapacity, value);

          await waitFor(() => {
            expect(store.getState().fieldControl).toEqual({
              ...initialState.fieldControl,
              capacity: Number(value),
            });
          });
        });
      });
    });

    describe("Speed field", () => {
      ["1", "10", "100", "1"].forEach((value) => {
        it("SHOULD CHANGE GAME SPEED", async () => {
          const { store } = render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputSpeed: HTMLInputElement = screen.getByLabelText(
            l10n.speedLabel
          );

          userEvent.clear(inputSpeed);
          userEvent.type(inputSpeed, value);

          await waitFor(() => {
            expect(store.getState().fieldControl).toEqual({
              ...initialState.fieldControl,
              speed: Number(value),
            });
          });
        });
      });
    });

    describe("UNMOUNTING", () => {
      it("MAX WIDTH", async () => {
        const { unmount, store } = render(<FormContainer />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              maxFieldWidth: 1920,
            },
          },
        });

        const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
        );

        userEvent.clear(inputMaxFieldWidth);
        userEvent.type(inputMaxFieldWidth, String(1000));

        unmount();

        await act(async () => {
          await delay(FormContainer.inputDelay + 50);
        });

        expect(store.getState().fieldControl.maxFieldWidth).toBe(1920);
      });

      it("MAX HEIGHT", async () => {
        const { unmount, store } = render(<FormContainer />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              maxFieldHeight: 474,
            },
          },
        });

        const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
          l10n.maxHeightLabel
        );

        userEvent.clear(inputMaxFieldHeight);
        userEvent.type(inputMaxFieldHeight, String(600));

        unmount();

        await act(async () => {
          await delay(FormContainer.inputDelay + 50);
        });

        expect(store.getState().fieldControl.maxFieldHeight).toBe(474);
      });

      it("CELL SIZE", async () => {
        const { unmount, store } = render(<FormContainer />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 40,
            },
          },
        });

        const inputCellSize: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(inputCellSize);
        userEvent.type(inputCellSize, String(30));

        unmount();

        await act(async () => {
          await delay(FormContainer.inputDelay + 50);
        });

        expect(store.getState().fieldControl.cellSize).toBe(40);
      });

      it("CAPACITY", async () => {
        const { unmount, store } = render(<FormContainer />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              capacity: 60,
            },
          },
        });

        const inputCapacity: HTMLInputElement = screen.getByLabelText(
          l10n.capacityLabel
        );

        userEvent.clear(inputCapacity);
        userEvent.type(inputCapacity, String(40));

        unmount();

        await act(async () => {
          await delay(FormContainer.inputDelay + 50);
        });

        expect(store.getState().fieldControl.capacity).toBe(60);
      });

      it("SPEED", async () => {
        const { unmount, store } = render(<FormContainer />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              speed: 20,
            },
          },
        });

        const inputSpeed: HTMLInputElement = screen.getByLabelText(
          l10n.speedLabel
        );

        userEvent.clear(inputSpeed);
        userEvent.type(inputSpeed, String(10));

        unmount();

        await act(async () => {
          await delay(FormContainer.inputDelay + 50);
        });

        expect(store.getState().fieldControl.speed).toBe(20);
      });
    });
  });
});
