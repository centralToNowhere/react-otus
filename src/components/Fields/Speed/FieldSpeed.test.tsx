import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { l10n } from "@/l10n/ru";
import { isValidNonNegativeNumericString } from "@/utils";

describe("FieldSpeed tests", () => {
  it("should render speed input", () => {
    const { asFragment } = render(
      <FieldSpeed
        formRawData={{
          rawSpeed: "4",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidNonNegativeNumericString()]}
        error={{
          show: false,
          msg: "speed error",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.speedLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
