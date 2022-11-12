import React, { FC } from "react";
import { PlayerBlock } from "@/components/PlayerBlock";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/auth";
import { resetFieldControls } from "@/components/Fields";
import { selectPlayerName } from "@/auth";
import { resetCells } from "@/components/GameField";

export const PlayerBlockContainer: FC = () => {
  const playerName = useSelector(selectPlayerName);
  const dispatch = useDispatch();
  const onPlayerUnregister = () => {
    dispatch(logout());
    dispatch(resetCells());
    dispatch(resetFieldControls());
  };

  return (
    <PlayerBlock
      playerName={playerName}
      onPlayerUnregister={onPlayerUnregister}
    />
  );
};
