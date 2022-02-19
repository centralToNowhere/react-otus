import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FieldCellSize } from "./FieldCellSize";
import { l10n } from "@/l10n/ru";
import { FormContainer } from "@/components/Form";
import userEvent from "@testing-library/user-event/dist";

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

  const originalInputDelay = FormContainer.inputDelay;

  beforeAll(() => {
    FormContainer.inputDelay = 50;
  });

  afterAll(() => {
    FormContainer.inputDelay = originalInputDelay;
  });

  describe("should call onChange", () => {
    ["10", "100", "1000"].forEach((value) => {
      it(`cellSize: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldCellSize value={"30"} onChange={onChange} />, {
          preloadedState: {},
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(input);
        userEvent.type(input, value);

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
    ["1", "9", "-1", "", "0"].forEach((value) => {
      it(`cellSize: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldCellSize value={"30"} onChange={onChange} />, {
          preloadedState: {},
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.cellSizeLabel
        );

        userEvent.clear(input);
        userEvent.type(input, value);

        await waitFor(
          () => {
            expect(onChange).toHaveBeenCalledTimes(0);
          },
          {
            timeout: FormContainer.inputDelay + 100,
          }
        );
      });
    });
  });
});
