import { IPlayer } from "@/player/Player";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { login, selectPlayer } from "@/auth";
import { routeNames } from "@/routes";

export const useRegistration = (): [
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
