import React, {FC, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import {AppAction, IAppState, IPlayer} from "@/state";
import {SetPlayerAction} from "@/state/actions";

export const storageKeyPlayerName = "playerName";
export const authProtected = <P extends { player: IPlayer }>(Component: React.ComponentType<P>): FC<P> => {
  const AuthProtected: FC<P> = (props) => {
    const { player } = props;

    useEffect(() => {
    }, [player.registered])
    return player.registered ? <Component {...props} /> : <Navigate to="/registration" />;
  }

  return AuthProtected;
}

export const getPlayer = (): IPlayer | null => {
  const playerData = localStorage.getItem(storageKeyPlayerName);

  return playerData ? JSON.parse(playerData) : null;
}

export const setPlayer = (player: IPlayer) => {
  localStorage.setItem(storageKeyPlayerName, JSON.stringify(player));
}

export const unsetPlayer = () => {
  localStorage.removeItem(storageKeyPlayerName);
}

export const usePlayerRegistration = (
  player: IPlayer,
  dispatch: React.Dispatch<AppAction>
): (playerName: string | null) => void => {
  useEffect(() => {
    setPlayer(player);
  }, [player]);

  return (playerName: string | null) => {
    if (playerName) {
      dispatch(SetPlayerAction({
        registered: true,
        name: playerName
      }));
    }
  }
}