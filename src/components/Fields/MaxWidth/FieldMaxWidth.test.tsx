import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { l10n } from "@/l10n/ru";

describe("FieldMaxWidth tests", () => {
  it("should render max width input", () => {
    const { asFragment } = render(
      <FieldMaxWidth
        value={"500"}
        onChange={() => {
          // empty function
        }}
        onBlur={() => {
          // empty function
        }}
        error={{
          show: false,
          msg: "Expected non-negative number",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
