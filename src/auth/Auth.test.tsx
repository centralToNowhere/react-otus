import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { storageKeyPlayerName, usePlayerRegistration } from "@/auth/Auth";
import userEvent from "@testing-library/user-event/dist";
import { SetPlayerAction } from "@/state/actions";

const DummyComponent: FC<{ dispatch: () => void }> = (props) => {
  const onPlayerRegister = usePlayerRegistration(
    {
      registered: true,
      name: "Oleg",
    },
    props.dispatch
  );

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onPlayerRegister("Oleg");
        }}
      >
        Dispatch
      </button>
    </>
  );
};

describe("Auth tests", () => {
  it("should call onPlayerRegister", async () => {
    const dispatch = jest.fn();
    render(<DummyComponent dispatch={dispatch} />);

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        SetPlayerAction({
          registered: true,
          name: "Oleg",
        })
      );
    });
  });

  it("should save player to localstorage", async () => {
    const dispatch = jest.fn();
    const storageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");
    render(<DummyComponent dispatch={dispatch} />);

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(storageSetItemSpy).toHaveBeenCalledWith(
        storageKeyPlayerName,
        JSON.stringify({
          registered: true,
          name: "Oleg",
        })
      );
    });
  });
});
