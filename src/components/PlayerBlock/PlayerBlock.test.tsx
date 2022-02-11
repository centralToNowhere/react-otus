import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PlayerBlock } from "@/components/PlayerBlock";
import { l10n } from "@/l10n/ru";
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
    const statisticsHeading = screen.getByRole("heading", { level: 2 });
    const score = screen.getByText(l10n.score, { exact: false });
    const clicksCount = screen.getByText(l10n.clicksCount, { exact: false });

    expect(playerNameHeading).toHaveTextContent("Ivan");
    expect(statisticsHeading).toHaveTextContent(l10n.statistics);
    expect(score).toBeInTheDocument();
    expect(clicksCount).toBeInTheDocument();
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
