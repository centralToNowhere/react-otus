import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PlayerBlock } from "@/components/PlayerBlock";
import userEvent from "@testing-library/user-event/dist";

describe("PlayerContainer tests", () => {
  it("should render PlayerContainer", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const onPlayerUnregister = jest.fn();
    const { asFragment } = render(
      <PlayerBlock
        onPlayerUnregister={onPlayerUnregister}
        playerName={"Ivan"}
      />
    );
    jest.spyOn(global.Math, "random").mockRestore();

    const playerNameHeading = screen.getByRole("heading", { level: 1 });

    expect(playerNameHeading).toHaveTextContent("Ivan");
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onPlayerUnregister on player logout", async () => {
    const onPlayerUnregister = jest.fn();

    render(
      <PlayerBlock
        onPlayerUnregister={onPlayerUnregister}
        playerName={"Ivan"}
      />
    );

    const unregisterButton = screen.getByRole("button");
    userEvent.click(unregisterButton);

    await waitFor(() => {
      expect(onPlayerUnregister).toHaveBeenCalledTimes(1);
    });
  });
});
