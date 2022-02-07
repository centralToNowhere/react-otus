import React, { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IPlayer } from "@/player/Player";
import { routeNames } from "@/routes/routeNames";
import { login, selectPlayer } from "@/auth/AuthRdx";
import { useAppDispatch } from "@/store/redux/store";
import { useSelector } from "react-redux";

export const withAuthProtection = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>
): FC<T> => {
  const AuthProtected: FC<T> = (props) => {
    const player = useSelector(selectPlayer);

    return player.registered ? (
      <Component {...props} />
    ) : (
      <Navigate to="/registration" />
    );
  };

  return AuthProtected;
};

export const usePlayerRegistration = (): [
  IPlayer,
  (playerName: string | null) => void
] => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const player = useSelector(selectPlayer);

  useEffect(() => {
    if (player.registered) {
      navigate(routeNames.game, { replace: true });
    }
  }, [navigate, player.registered]);

  return [
    player,
    (playerName: string | null) => {
      if (playerName) {
        dispatch(login(playerName));
      }
    },
  ];
};
