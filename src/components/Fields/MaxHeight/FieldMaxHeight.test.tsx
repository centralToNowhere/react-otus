import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FieldMaxHeight } from "./FieldMaxHeight";
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

describe("FieldMaxHeight tests", () => {
  it("should render max height input", () => {
    const { asFragment } = render(
      <FieldMaxHeight
        value={"500"}
        onChange={() => {
          // empty function
        }}
      />,
      {
        preloadedState: {},
      }
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxHeightLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("should call onChange", () => {
    [
      {
        maxFieldHeight: "1",
        maxFieldWidth: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldHeight: "10",
        maxFieldWidth: 100,
        cellSize: 10,
        maxCellsAmount: 10,
      },
      {
        maxFieldHeight: "100",
        maxFieldWidth: 100,
        cellSize: 10,
        maxCellsAmount: 100,
      },
      {
        maxFieldHeight: "1000",
        maxFieldWidth: 100,
        cellSize: 100,
        maxCellsAmount: 10,
      },
      {
        maxFieldHeight: "0",
        maxFieldWidth: 100,
        cellSize: 100,
        maxCellsAmount: 100,
      },
    ].forEach((settings) => {
      it(`height: ${settings.maxFieldHeight},
      width: ${settings.maxFieldWidth},
      cellSize: ${settings.cellSize},
      maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldMaxHeight value={"500"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: settings.maxFieldWidth,
              maxFieldHeight: 500,
              cellSize: settings.cellSize,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxHeightLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.maxFieldHeight);

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
        maxFieldHeight: "-1",
        maxFieldWidth: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldHeight: "",
        maxFieldWidth: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldHeight: "qwerty",
        maxFieldWidth: 100,
        cellSize: 1,
        maxCellsAmount: 100,
      },
      {
        maxFieldHeight: "300",
        maxFieldWidth: 100,
        cellSize: 5,
        maxCellsAmount: 100,
      },
    ].forEach((settings) => {
      it(`height: ${settings.maxFieldHeight},
      width: ${settings.maxFieldWidth},
      cellSize: ${settings.cellSize},
      maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldMaxHeight value={"500"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: settings.maxFieldWidth,
              maxFieldHeight: 500,
              cellSize: settings.cellSize,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxHeightLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.maxFieldHeight);

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
