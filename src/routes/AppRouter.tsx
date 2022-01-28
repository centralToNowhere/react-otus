import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { GameFieldContainer } from "@/components/GameFieldContainer";
import { RegistrationScreen } from "@/components/RegistrationScreen/RegistrationScreen";
import { withAuthProtection } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";

const AuthGameFieldContainer = withAuthProtection(GameFieldContainer);

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={routeNames.game} element={<AuthGameFieldContainer />} />
      <Route path={routeNames.registration} element={<RegistrationScreen />} />
    </Routes>
  );
};
