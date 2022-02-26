import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FieldCellSize } from "./FieldCellSize";
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

describe("FieldCellSize tests", () => {
  it("should render cell size input", () => {
    const { asFragment } = render(
      <FieldCellSize
        value={"40"}
        onChange={() => {
          // empty function
        }}
      />,
      {
        preloadedState: {},
      }
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("should call onChange", () => {
    [
      {
        cellSize: "10",
        maxFieldWidth: 1920,
        maxFieldHeight: 1000,
        maxCellsAmount: 20000,
      },
      {
        cellSize: "100",
        maxFieldWidth: 600,
        maxFieldHeight: 600,
        maxCellsAmount: 36,
      },
      {
        cellSize: "1000",
        maxFieldWidth: 10000,
        maxFieldHeight: 1000,
        maxCellsAmount: 10,
      },
      {
        cellSize: "1",
        maxFieldWidth: 100,
        maxFieldHeight: 100,
        maxCellsAmount: 10000,
      },
    ].forEach((settings) => {
      it(`cellSize: ${settings.cellSize},
       maxFieldWidth: ${settings.maxFieldWidth},
       maxFieldHeight: ${settings.maxFieldHeight},
       maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldCellSize value={"30"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: settings.maxFieldWidth,
              maxFieldHeight: settings.maxFieldHeight,
              cellSize: 100,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.cellSize);

        await waitFor(
          () => {
            expect(onChange).toHaveBeenCalledWith(settings.cellSize);
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
        cellSize: "9",
        maxFieldWidth: 1920,
        maxFieldHeight: 1000,
        maxCellsAmount: 20000,
      },
      {
        cellSize: "1",
        maxFieldWidth: 1000,
        maxFieldHeight: 100,
        maxCellsAmount: 10000,
      },
      {
        cellSize: "9",
        maxFieldWidth: 1920,
        maxFieldHeight: 1000,
        maxCellsAmount: 20000,
      },
      {
        cellSize: "-1",
        maxFieldWidth: 100,
        maxFieldHeight: 100,
        maxCellsAmount: 100,
      },
      {
        cellSize: "0",
        maxFieldWidth: 100,
        maxFieldHeight: 100,
        maxCellsAmount: 10000,
      },
    ].forEach((settings) => {
      it(`cellSize: ${settings.cellSize},
       maxFieldWidth: ${settings.maxFieldWidth},
       maxFieldHeight: ${settings.maxFieldHeight},
       maxCellsAmount: ${settings.maxCellsAmount}`, async () => {
        cellMocks.maxCellsAmount = settings.maxCellsAmount;
        const onChange = jest.fn();

        render(<FieldCellSize value={"30"} onChange={onChange} />, {
          preloadedState: {
            fieldControl: {
              maxFieldWidth: settings.maxFieldWidth,
              maxFieldHeight: settings.maxFieldHeight,
              cellSize: 100,
              capacity: 100,
              speed: 2,
            },
          },
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(input);
        userEvent.type(input, settings.cellSize);

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
