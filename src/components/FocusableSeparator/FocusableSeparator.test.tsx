import React from "react";
import { render, screen } from "@testing-library/react";
import { FocusableSeparator } from "@/components/FocusableSeparator/FocusableSeparator";

describe("focusable separator tests", () => {
  it("should render focusable separator", () => {
    const { asFragment } = render(<FocusableSeparator />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
