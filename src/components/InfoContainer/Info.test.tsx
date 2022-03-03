import React from "react";
import { render, screen } from "@testing-library/react";
import { l10n } from "@/l10n/ru";
import { Info } from "@/components/InfoContainer";

describe("InfoContainer", () => {
  it("should render Info", () => {
    const { asFragment } = render(<Info generationNumber={5} />);

    const generationInfo = screen.getByText(`${l10n.generation}: 5`);

    expect(asFragment()).toMatchSnapshot();
    expect(generationInfo).toBeInTheDocument();
  });
});
