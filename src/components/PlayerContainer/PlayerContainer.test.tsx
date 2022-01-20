import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PlayerContainer } from "@/components/PlayerContainer";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";

describe("PlayerContainer tests", () => {
  it("should render PlayerContainer", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const onPlayerUnregister = jest.fn();
    const { asFragment } = render(
      <PlayerContainer
        onPlayerUnregister={onPlayerUnregister}
        player={{
          registered: true,
          name: "Ivan",
        }}
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
      <PlayerContainer
        onPlayerUnregister={onPlayerUnregister}
        player={{
          registered: true,
          name: "Ivan",
        }}
      />
    );

    const unregisterButton = screen.getByRole("button");
    userEvent.click(unregisterButton);

    await waitFor(() => {
      expect(onPlayerUnregister).toHaveBeenCalledTimes(1);
    });
  });
});
