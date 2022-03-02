import React from "react";
import { render, screen } from "@/utils/test-utils";
import { FieldCellSize } from "./FieldCellSize";
import { l10n } from "@/l10n/ru";

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
        onRawChange={() => {
          // empty function
        }}
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
});
