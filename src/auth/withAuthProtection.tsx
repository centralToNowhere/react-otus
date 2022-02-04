import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectPlayer } from "@/auth";
import { Navigate } from "react-router-dom";

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
