import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { l10n } from "@/l10n/ru";
import { isValidPositiveNumericString } from "@/utils";

describe("FieldMaxWidth tests", () => {
  it("should render max width input", () => {
    const { asFragment } = render(
      <FieldMaxWidth
        formRawData={{
          rawCellSize: "50",
          rawMaxWidth: "100",
          rawMaxHeight: "100",
          highlight: false,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxWidth error",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
