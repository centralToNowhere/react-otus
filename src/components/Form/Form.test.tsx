import React from "react";
import { render, screen } from "@testing-library/react";
import { Form, isPossibleInput, isPossibleInputCharacter } from "./Form";

describe("form tests", () => {
  it("should render input", () => {
    const onChange = jest.fn();
    const inputString = "";
    const { asFragment } = render(
      <Form inputString={inputString} onChange={onChange} />
    );

    const input = screen.getByLabelText("Введите целое число:");

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("isPossibleInput should return true", () => {
    const inputString = "1234567890";

    expect(isPossibleInput(inputString)).toBe(true);
  });

  it("isPossibleInput should return false", () => {
    const alphabetical = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseAlphabetical = alphabetical.toUpperCase();
    const other = "!@#$%^&*()_+}{|\"'><,./;:[]`~?";
    const inputString = alphabetical
      .concat(upperCaseAlphabetical)
      .concat(other);

    inputString.split("").forEach((char) => {
      expect(isPossibleInputCharacter(char)).toBe(false);
    });

    expect(isPossibleInput(inputString)).toBe(false);
  });
});
