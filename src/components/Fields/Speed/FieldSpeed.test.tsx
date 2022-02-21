import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";
import { FormContainer } from "@/components/Form";

describe("FieldSpeed tests", () => {
  it("should render speed input", () => {
    const { asFragment } = render(
      <FieldSpeed
        value={"2"}
        onChange={() => {
          // empty function
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.speedLabel);

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
    ["1", "10", "100", "1000", "0.1"].forEach((value) => {
      it(`speed: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldSpeed value={"4"} onChange={onChange} />);

        const input: HTMLInputElement = screen.getByLabelText(l10n.speedLabel);

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
    ["-1", "0", "", "qwerty"].forEach((value) => {
      it(`speed: ${value}`, async () => {
        const onChange = jest.fn();

        render(<FieldSpeed value={"4"} onChange={onChange} />);

        const input: HTMLInputElement = screen.getByLabelText(l10n.speedLabel);

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
