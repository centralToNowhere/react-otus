import React from "react";
import { render, screen } from "@/utils/test-utils";
import { InfoContainer } from "@/components/InfoContainer/InfoContainer";
import { l10n } from "@/l10n/ru";

describe("InfoContainer", () => {
  const initialState = {
    fieldControl: {
      cellSize: 10,
      maxFieldWidth: 100,
      maxFieldHeight: 100,
      capacity: 50,
      speed: 2,
    },
    gameField: {
      activeCells: [],
      gameInProgress: false,
      generations: 25,
    },
  };

  it("should render generation number", () => {
    render(<InfoContainer />, {
      preloadedState: initialState,
    });

    const generationInfo = screen.getByText(`${l10n.generation}: 25`);

    expect(generationInfo).toBeInTheDocument();
  });
});
