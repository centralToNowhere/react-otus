import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { l10n } from "@/l10n/ru";

describe("FieldSpeed tests", () => {
  it("should render speed input", () => {
    const { asFragment } = render(
      <FieldSpeed
        value={"2"}
        onChange={() => {
          // empty function
        }}
        onBlur={() => {
          // empty function
        }}
        error={{
          show: false,
          msg: "Expected positive number",
        }}
      />
    );

    const input: HTMLInputElement = screen.getByLabelText(l10n.speedLabel);

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
