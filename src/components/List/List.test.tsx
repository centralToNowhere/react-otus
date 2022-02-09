import React from "react";
import { render, screen } from "@testing-library/react";
import { List } from "@/components/List/List";

describe("List tests", () => {
  it("should render list", () => {
    const test = [
      {
        content: "test",
      },
      {
        content: "test2",
        items: [
          {
            content: "test3",
            items: [
              {
                content: "test4",
              },
            ],
          },
        ],
      },
    ];

    const { asFragment } = render(<List items={test} />);

    const test1 = screen.getByText("test");
    const test2 = screen.getByText("test2");
    const test3 = screen.getByText("test3");
    const test4 = screen.getByText("test4");

    expect(test1).toBeInTheDocument();
    expect(test1.nextElementSibling).toContainElement(test2);

    expect(test2).toBeInTheDocument();
    expect(test2.nextElementSibling).toContainElement(test3);

    expect(test3).toBeInTheDocument();
    expect(test3.nextElementSibling).toContainElement(test4);

    expect(test4).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
