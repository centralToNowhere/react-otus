import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldError } from "./FieldError";

describe("error field tests", () => {
  it("should show error", () => {
    const { asFragment } = render(
      <FieldError show={true} msg={"something went wrong"} />
    );

    const errorContainer: HTMLDivElement = screen.getByText(
      "something went wrong"
    );

    expect(errorContainer).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not show error", () => {
    render(<FieldError show={false} msg={"something went wrong"} />);

    const errorContainer: HTMLDivElement | null = screen.queryByText(
      "something went wrong"
    );

    expect(errorContainer).not.toBeInTheDocument();
  });
});
