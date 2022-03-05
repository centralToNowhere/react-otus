import React, { FC, MutableRefObject } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FocusableSeparator } from "@/components/FocusableSeparator/FocusableSeparator";
import { css } from "@emotion/react";
import { isTouchDevice } from "@/utils/TouchDeviceDetection";

const parentBox = {
  bottom: 130,
  height: 130,
  left: 0,
  right: 100,
  top: 0,
  width: 100,
  x: 0,
  y: 0,
};

const handleBox = {
  bottom: 70,
  height: 30,
  left: 0,
  right: 100,
  top: 50,
  width: 100,
  x: 0,
  y: 50,
};

const Template: FC = () => {
  return (
    <div
      css={css`
        width: 100px;
        overflow: hidden;
      `}
      data-testid="div-parent"
    >
      <div
        css={css`
          background: green;
          overflow: hidden;
        `}
        data-testid="div1"
        data-testh="50"
      >
        Content of div 1
      </div>
      <FocusableSeparator />
      <div
        css={css`
          background: yellow;
          overflow: hidden;
        `}
        data-testid="div2"
        data-testh="50"
      >
        Content of div 2
      </div>
    </div>
  );
};

const NoSiblings: FC = () => {
  return (
    <div
      css={css`
        width: 100px;
        overflow: hidden;
      `}
      data-testid="div-parent"
    >
      <FocusableSeparator />
    </div>
  );
};

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("focusable separator tests", () => {
  it("should render focusable separator", () => {
    const { asFragment } = render(<FocusableSeparator />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("from 50/50 to 70/30", async () => {
    render(<Template />);

    const handle = screen.getByRole("separator");

    const parent = screen.getByTestId("div-parent");
    const div1 = screen.getByTestId("div1");
    const div2 = screen.getByTestId("div2");

    parent.getBoundingClientRect = jest.fn().mockReturnValue(parentBox);
    handle.getBoundingClientRect = jest.fn().mockReturnValue(handleBox);

    fireEvent(
      handle,
      new MouseEvent("mousedown", {
        clientY: 50,
      })
    );
    fireEvent(
      parent,
      new MouseEvent("mousemove", {
        clientY: 70,
      })
    );

    fireEvent.mouseUp(document);

    expect(handle).toHaveAttribute("aria-valuenow", "70");
    expect(div1).toHaveAttribute("data-testh", "70");
    expect(div2).toHaveAttribute("data-testh", "30");
  });

  it("should resize from 50/50 to 0/100", () => {
    render(<Template />);

    const handle = screen.getByRole("separator");

    const parent = screen.getByTestId("div-parent");
    const div1 = screen.getByTestId("div1");
    const div2 = screen.getByTestId("div2");

    parent.getBoundingClientRect = jest.fn().mockReturnValue(parentBox);
    handle.getBoundingClientRect = jest.fn().mockReturnValue(handleBox);

    fireEvent(
      handle,
      new MouseEvent("mousedown", {
        clientY: 50,
      })
    );
    fireEvent(
      parent,
      new MouseEvent("mousemove", {
        clientY: 100,
      })
    );

    fireEvent.mouseUp(document);

    expect(handle).toHaveAttribute("aria-valuenow", "100");
    expect(div1).toHaveAttribute("data-testh", "100");
    expect(div2).toHaveAttribute("data-testh", "0");
  });

  it("should resize from 50/50 to 100/0", () => {
    render(<Template />);

    const handle = screen.getByRole("separator");

    const parent = screen.getByTestId("div-parent");
    const div1 = screen.getByTestId("div1");
    const div2 = screen.getByTestId("div2");

    parent.getBoundingClientRect = jest.fn().mockReturnValue(parentBox);
    handle.getBoundingClientRect = jest.fn().mockReturnValue(handleBox);

    fireEvent(
      handle,
      new MouseEvent("mousedown", {
        clientY: 50,
      })
    );
    fireEvent(
      parent,
      new MouseEvent("mousemove", {
        clientY: 0,
      })
    );

    fireEvent.mouseUp(document);

    expect(handle).toHaveAttribute("aria-valuenow", "0");
    expect(div1).toHaveAttribute("data-testh", "0");
    expect(div2).toHaveAttribute("data-testh", "100");
  });

  it("should throw error", () => {
    render(<NoSiblings />);

    const handle = screen.getByRole("separator");
    const parent = screen.getByTestId("div-parent");

    parent.getBoundingClientRect = jest.fn().mockReturnValue(parentBox);
    handle.getBoundingClientRect = jest.fn().mockReturnValue(handleBox);

    fireEvent(
      handle,
      new MouseEvent("mousedown", {
        clientY: 50,
      })
    );

    fireEvent(
      parent,
      new MouseEvent("mousemove", {
        clientY: 25,
      })
    );

    expect(handle).toHaveAttribute("aria-valuenow", "50");
  });

  it("should throw on resizerRef === null", () => {
    jest.spyOn(React, "useRef").mockReturnValue({
      current: null,
      set: () => null,
    } as MutableRefObject<HTMLDivElement | null>);

    render(<Template />);

    const handle = screen.getByRole("separator");
    const parent = screen.getByTestId("div-parent");
    const div1 = screen.getByTestId("div1");
    const div2 = screen.getByTestId("div2");

    parent.getBoundingClientRect = jest.fn().mockReturnValue(parentBox);
    handle.getBoundingClientRect = jest.fn().mockReturnValue(handleBox);

    fireEvent(
      handle,
      new MouseEvent("mousedown", {
        clientY: 50,
      })
    );
    fireEvent(
      parent,
      new MouseEvent("mousemove", {
        clientY: 25,
      })
    );

    fireEvent.mouseUp(document);

    expect(handle).toHaveAttribute("aria-valuenow", "50");
    expect(div1).toHaveAttribute("data-testh", "50");
    expect(div2).toHaveAttribute("data-testh", "50");
  });

  describe("isTouchDevice", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("should return true", () => {
      let mockedNavigator: Navigator & {
        msMaxTouchPoints: number;
      };

      const windowMock = jest.spyOn(window, "window", "get");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ontouchstart, ...mockedWindow } = window;

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: -1,
        msMaxTouchPoints: 1,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(true);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: 1,
        msMaxTouchPoints: -1,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(true);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: 0,
        msMaxTouchPoints: 1,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(true);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: 1,
        msMaxTouchPoints: 0,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(true);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: -1,
        msMaxTouchPoints: -1,
      };

      windowMock.mockReturnValue({
        ...window,
        ontouchstart: () => {
          // empty
        },
        navigator: mockedNavigator as Navigator,
      } as Window &
        typeof globalThis & {
          ontouchstart: () => void;
        });

      expect(isTouchDevice()).toBe(true);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: 0,
        msMaxTouchPoints: 0,
      };

      windowMock.mockReturnValue({
        ...window,
        ontouchstart: () => {
          // empty
        },
        navigator: mockedNavigator as Navigator,
      } as Window &
        typeof globalThis & {
          ontouchstart: () => void;
        });

      expect(isTouchDevice()).toBe(true);
    });

    it("should return false", () => {
      let mockedNavigator: Navigator & {
        msMaxTouchPoints: number;
      };

      const windowMock = jest.spyOn(window, "window", "get");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ontouchstart, ...mockedWindow } = window;

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: -1,
        msMaxTouchPoints: -1,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(false);

      mockedNavigator = {
        ...window.navigator,
        maxTouchPoints: 0,
        msMaxTouchPoints: 0,
      };

      windowMock.mockReturnValue({
        ...mockedWindow,
        navigator: mockedNavigator as Navigator,
      } as Window & typeof globalThis);

      expect(isTouchDevice()).toBe(false);
    });
  });
});
