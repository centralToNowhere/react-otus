import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldMaxHeight } from "./FieldMaxHeight";
import { l10n } from "@/l10n/ru";

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
