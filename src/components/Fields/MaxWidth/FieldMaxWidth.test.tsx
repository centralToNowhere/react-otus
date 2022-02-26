import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { l10n } from "@/l10n/ru";
import { FormContainer } from "@/components/Form";
import userEvent from "@testing-library/user-event/dist";

jest.mock("@/Cell/Cell");

const cellMocks = jest.requireMock("@/Cell/Cell");
const cellOrigin = jest.requireActual("@/Cell/Cell");

const originalInputDelay = FormContainer.inputDelay;

beforeEach(() => {
  FormContainer.inputDelay = 50;
});

afterEach(() => {
  FormContainer.inputDelay = originalInputDelay;
  cellMocks.maxCellsAmount = cellOrigin.maxCellsAmount;
});

describe("FieldMaxWidth tests", () => {
  it("should render max width input", () => {
    const { asFragment } = render(
      <FieldMaxWidth
        value={"500"}
        onChange={() => {
          // empty function
        }}
      />,
      {
        preloadedState: {},
      }
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("should call onChange", () => {
    [
      {
        maxFieldWidth: "1",
        maxFieldHeight: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "10",
        maxFieldHeight: 100,
        cellSize: 10,
        maxCellsAmount: 10,
      },
      {
        maxFieldWidth: "100",
        maxFieldHeight: 100,
        cellSize: 10,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "1000",
        maxFieldHeight: 100,
        cellSize: 100,
        maxCellsAmount: 10,
      },
    ].forEach((settings) => {
      it(`width: ${settings.maxFieldWidth},
      height: ${settings.maxFieldHeight},
      cellSize: ${settings.cellSize},
      maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldMaxWidth value={"500"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: 500,
              maxFieldHeight: settings.maxFieldHeight,
              cellSize: settings.cellSize,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.maxFieldWidth);

        await waitFor(
          () => {
            expect(onChange).toHaveBeenCalledTimes(1);
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );
      });
    });
  });

  describe("should not call onChange", () => {
    [
      {
        maxFieldWidth: "-1",
        maxFieldHeight: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "",
        maxFieldHeight: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "qwerty",
        maxFieldHeight: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "300",
        maxFieldHeight: 100,
        cellSize: 5,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "0",
        maxFieldHeight: 100,
        cellSize: 100,
        maxCellsAmount: 100,
      },
      {
        maxFieldWidth: "99",
        maxFieldHeight: 100,
        cellSize: 100,
        maxCellsAmount: 100,
      },
    ].forEach((settings) => {
      it(`width: ${settings.maxFieldWidth},
      height: ${settings.maxFieldHeight},
      cellSize: ${settings.cellSize},
      maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldMaxWidth value={"500"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: 500,
              maxFieldHeight: settings.maxFieldHeight,
              cellSize: settings.cellSize,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.maxFieldWidth);

        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, FormContainer.inputDelay + 100);
        });

        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
