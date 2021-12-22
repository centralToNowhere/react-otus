import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldCellSize } from "./FieldCellSize";
import { l10n } from "@/l10n/ru";

describe("FieldCellSize tests", () => {
  it("should render cell size input", () => {
    const { asFragment } = render(
      <FieldCellSize
        value={"40"}
        onChange={() => {
          // empty function
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
