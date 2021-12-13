/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// @ts-ignore
import App, { testA, testB, __RewireAPI__ as AppRewire } from "./App";

describe("index tests", () => {
  it("should render App", () => {
    render(<App />);
    const title = screen.getByText("React typescript template");

    expect(title).toBeVisible();
  });

  it("should test funny modules part 1", () => {
    const testAMocked = jest.fn().mockReturnValue("B");

    jest.doMock("./App.tsx", () => {
      const origin = jest.requireActual("./App.tsx");
      return { ...origin, testA: testAMocked };
    });

    const { testB, testA } = require("./App");

    expect(testA()).toBe("B");
    expect(testB()).toBe("A");
  });

  it("should test funny modules part 2", () => {
    expect(testA()).toBe("A");
    expect(testB()).toBe("A");

    AppRewire.__Rewire__("testA", () => "B");

    expect(testA()).toBe("B");
    expect(testB()).toBe("B");

    AppRewire.__ResetDependency__("testA");
  });
});
