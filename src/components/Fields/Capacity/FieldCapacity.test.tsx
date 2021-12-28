import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldCapacity } from "./FieldCapacity";
import { l10n } from "@/l10n/ru";

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
});
