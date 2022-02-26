import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { FieldCapacity } from "./FieldCapacity";
import { l10n } from "@/l10n/ru";
import { FormContainer } from "@/components/Form";
import userEvent from "@testing-library/user-event/dist";

describe("FieldCapacity tests", () => {
  it("should render capacity input", () => {
    const { asFragment } = render(
      <FieldCapacity
        value={"50"}
        onChange={() => {
          // empty function
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.capacityLabel);

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
    ["1", "10", "100", "1000", "0.1", "0", "-1", "qwerty"].forEach((value) => {
      it(`capacity: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldCapacity value={"50"} onChange={onChange} />);

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.capacityLabel
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
    [""].forEach((value) => {
      it(`capacity: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldCapacity value={"50"} onChange={onChange} />);

        const input: HTMLInputElement = screen.getByLabelText(
          l10n.capacityLabel
        );

        userEvent.clear(input);
        userEvent.type(input, value);

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
