import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { GameContainer } from "@/components/Game";
import { RegistrationScreen } from "@/components/RegistrationScreen/RegistrationScreen";
import { withAuthProtection } from "@/auth";
import { routeNames } from "@/routes";

const AuthGame = withAuthProtection(GameContainer);

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={routeNames.game} element={<AuthGame />} />
      <Route path={routeNames.registration} element={<RegistrationScreen />} />
    </Routes>
  );
};
