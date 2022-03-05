import React from "react";
import userEvent from "@testing-library/user-event/dist";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FormContainer } from "./FormContainer";
import { l10n } from "@/l10n/ru";

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
    speed: 1,
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
      preloadedState: initialState,
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
      preloadedState: initialState,
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
      FormContainer.inputDelay = 50;
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

      const shouldNotChange = [
        {
          maxFieldWidth: 1920,
          maxFieldHeight: 474,
          cellSize: 6,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 10,
          maxFieldHeight: 474,
          cellSize: 40,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 10,
          maxFieldHeight: 10,
          cellSize: 40,
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
          maxFieldHeight: 100,
          cellSize: 0,
          maxCellsAmount: 10,
        },
        {
          maxFieldWidth: 100,
          maxFieldHeight: 10,
          cellSize: 100,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 0,
          maxFieldHeight: 100,
          cellSize: 1,
          maxCellsAmount: 20000,
        },
        {
          maxFieldWidth: 0,
          maxFieldHeight: 0,
          cellSize: 1,
          maxCellsAmount: 1,
        },
        {
          maxFieldWidth: -1,
          maxFieldHeight: -1,
          cellSize: 2,
          maxCellsAmount: 2,
        },
      ];

      shouldChange.forEach(
        ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
          it(`SHOULD CHANGE GAME FIELD STATE
          cellSize: ${cellSize},
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

            const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
              l10n.maxWidthLabel
            );

            const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
              l10n.maxHeightLabel
            );

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
                timeout: FormContainer.inputDelay + 100,
              }
            );
          });
        }
      );

      shouldNotChange.forEach(
        ({ cellSize, maxFieldWidth, maxFieldHeight, maxCellsAmount }) => {
          it(`SHOULD SHOW ERROR MESSAGE
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

            const inputMaxFieldWidth: HTMLInputElement = screen.getByLabelText(
              l10n.maxWidthLabel
            );

            const inputMaxFieldHeight: HTMLInputElement = screen.getByLabelText(
              l10n.maxHeightLabel
            );

            userEvent.clear(inputMaxFieldWidth);
            userEvent.type(inputMaxFieldWidth, String(maxFieldWidth));

            userEvent.clear(inputMaxFieldHeight);
            userEvent.type(inputMaxFieldHeight, String(maxFieldHeight));

            userEvent.clear(inputCellSize);
            userEvent.type(inputCellSize, String(cellSize));

            await waitFor(
              () => {
                expect(
                  // eslint-disable-next-line testing-library/prefer-presence-queries
                  screen.queryByText(l10n.maxCellsAmount, { exact: false }) ||
                    // eslint-disable-next-line testing-library/prefer-presence-queries
                    screen.queryByText(l10n.minCellsAmount)
                ).toBeInTheDocument();
              },
              {
                timeout: FormContainer.inputDelay + 100,
              }
            );
          });
        }
      );

      it("should change state only after cellSize field change", async () => {
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

        await waitFor(
          () => {
            expect(store.getState().fieldControl.maxFieldWidth).toBe(1920);
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputMaxFieldHeight);
        userEvent.type(inputMaxFieldHeight, "10");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputCellSize);
        userEvent.type(inputCellSize, "10");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 10,
                maxFieldHeight: 10,
                cellSize: 10,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );
      });

      it("should change state only after maxFieldWidth change", async () => {
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

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputMaxFieldHeight);
        userEvent.type(inputMaxFieldHeight, "100");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1920,
                maxFieldHeight: 474,
                cellSize: 40,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputMaxFieldWidth);
        userEvent.type(inputMaxFieldWidth, "1");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1,
                maxFieldHeight: 100,
                cellSize: 1,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );
      });

      it("should change state only after maxFieldHeight change", async () => {
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

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1920,
                maxFieldHeight: 1000,
                cellSize: 40,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputMaxFieldWidth);
        userEvent.type(inputMaxFieldWidth, "50");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 1920,
                maxFieldHeight: 1000,
                cellSize: 40,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );

        userEvent.clear(inputMaxFieldHeight);
        userEvent.type(inputMaxFieldHeight, "100");

        await waitFor(
          () => {
            expect(store.getState().fieldControl).toEqual(
              expect.objectContaining({
                maxFieldWidth: 50,
                maxFieldHeight: 100,
                cellSize: 1,
              })
            );
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );
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
      ["1", "10", "100", "1000", "0.1"].forEach((value) => {
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

      ["-", "0", "", "qwerty"].forEach((value) => {
        it(`SHOULD SHOW ${l10n.positiveNumber} ERROR`, async () => {
          render(<FormContainer />, {
            preloadedState: initialState,
          });

          const inputSpeed: HTMLInputElement = screen.getByLabelText(
            l10n.speedLabel
          );

          userEvent.clear(inputSpeed);
          userEvent.type(inputSpeed, value);

          await waitFor(() => {
            expect(screen.getByText(l10n.positiveNumber)).toBeInTheDocument();
          });
        });
      });
    });
  });
});
