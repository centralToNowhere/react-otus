import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { l10n } from "@/l10n/ru";
import { FormContainer } from "@/components/Form";
import userEvent from "@testing-library/user-event/dist";

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

  const originalInputDelay = FormContainer.inputDelay;

  beforeAll(() => {
    FormContainer.inputDelay = 50;
  });

  afterAll(() => {
    FormContainer.inputDelay = originalInputDelay;
  });

  describe("should call onChange", () => {
    ["1", "10", "100", "1000", "0"].forEach((value) => {
      it(`maxWidth: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldMaxWidth value={"500"} onChange={onChange} />, {
          preloadedState: {},
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
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
    ["-1", "", "qwerty"].forEach((value) => {
      it(`maxWidth: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldMaxWidth value={"500"} onChange={onChange} />, {
          preloadedState: {},
        });

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.maxWidthLabel
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
