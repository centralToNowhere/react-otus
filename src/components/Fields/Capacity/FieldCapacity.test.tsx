import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldCapacity } from "./FieldCapacity";
import { l10n } from "@/l10n/ru";
import { isValidNonNegativeNumericString } from "@/utils";

describe("FieldCapacity tests", () => {
  it("should render capacity input", () => {
    const { asFragment } = render(
      <FieldCapacity
        formRawData={{
          rawCapacity: "50",
        }}
        formValidators={[isValidNonNegativeNumericString()]}
        onRawChange={() => {
          // empty
        }}
        onChange={() => {
          // empty
        }}
        error={{
          show: false,
          msg: "capacity error",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.capacityLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
