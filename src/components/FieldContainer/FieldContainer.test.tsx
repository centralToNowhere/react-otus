import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldContainer } from "@/components/FieldContainer/FieldContainer";

describe("FieldContainer tests", () => {
  it("should correctly render field and form", async () => {
    const { asFragment } = render(<FieldContainer />);

    const field = screen.getByTestId("field");
    expect(field).toBeInTheDocument();

    const form = screen.getByTestId("field-form");
    expect(form).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
