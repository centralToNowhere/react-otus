import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldCellSize } from "./FieldCellSize";
import { l10n } from "@/l10n/ru";
import { isValidCellSizeString } from "@/utils";

describe("FieldCellSize tests", () => {
  it("should render cell size input", () => {
    const { asFragment } = render(
      <FieldCellSize
        formRawData={{
          rawCellSize: "50",
          rawMaxWidth: "100",
          rawMaxHeight: "100",
          highlight: false,
        }}
        formValidators={[isValidCellSizeString()]}
        onRawChange={() => {
          // empty
        }}
        onChange={() => {
          // empty
        }}
        error={{
          show: false,
          msg: "cellSize error",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
