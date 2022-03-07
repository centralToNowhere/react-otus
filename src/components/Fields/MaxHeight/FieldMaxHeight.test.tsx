import React from "react";
import { render, screen } from "@testing-library/react";
import { l10n } from "@/l10n/ru";
import { FieldMaxHeight } from "./FieldMaxHeight";
import { isValidPositiveNumericString } from "@/utils";

describe("FieldMaxHeight tests", () => {
  it("should render max height input", () => {
    const { asFragment } = render(
      <FieldMaxHeight
        formRawData={{
          rawCellSize: "50",
          rawMaxWidth: "100",
          rawMaxHeight: "100",
          highlight: false,
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxHeight error",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxHeightLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
