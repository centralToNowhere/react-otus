import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FieldContainer } from "@/components/FieldContainer/FieldContainer";
import figures from "@/components/Field/figures.json";

const inputLabel = "Введите целое число:";

beforeAll(() => {
  fetchMock.doMock();
  fetchMock.mockIf("/figures.json", JSON.stringify(figures));
});

describe("FieldContainer tests", () => {
  it("should correctly render field and form", async () => {
    const { asFragment } = render(<FieldContainer />);

    await waitFor(() => {
      const field = screen.getByTestId("field");
      expect(field).toBeInTheDocument();
    });

    await waitFor(() => {
      const form = screen.getByTestId("interactive-number-drawing-form");
      expect(form).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call send request", () => {
    fetch("/figures.json").then((response) => response.json());

    expect(fetchMock).toBeCalledTimes(1);
  });

  it("should print allowable input characters", async () => {
    render(<FieldContainer />);

    await screen.findByLabelText(inputLabel);

    const input: HTMLInputElement = screen.getByLabelText(inputLabel);
    userEvent.type(input, "1234{enter}");

    expect(input).toHaveValue("1234");
  });

  it("should cancel printing all other characters than [0-9]", async () => {
    render(<FieldContainer />);

    await screen.findByLabelText(inputLabel);

    const input: HTMLInputElement = screen.getByLabelText(inputLabel);
    userEvent.type(input, "!1$RE%3$@6#$");

    expect(input).toHaveValue("136");
  });
});
