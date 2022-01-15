import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import {
  GameFieldContainer,
  GameFieldContainerDefaultProps,
} from "@/components/GameFieldContainer";
import {
  IRegistrationScreenProps,
  RegistrationScreen,
} from "@/components/RegistrationScreen/RegistrationScreen";
import { usePlayerRegistration, withAuthProtection } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";
import {basename} from "@/routes/basename";

export type AppRouterProps = GameFieldContainerDefaultProps &
  IRegistrationScreenProps;

const AuthGameFieldContainer = withAuthProtection(GameFieldContainer);

export const AppRouter: FC<Omit<AppRouterProps, "navigate">> = (props) => {
  const onPlayerRegistration = usePlayerRegistration(
    props.player,
    props.dispatch
  );

  return (
    <Routes>
      <Route
        path={`${basename}${routeNames.game}`}
        element={
          <AuthGameFieldContainer
            cellSize={props.cellSize}
            maxFieldWidth={props.maxFieldWidth}
            maxFieldHeight={props.maxFieldHeight}
            capacity={props.capacity}
            speed={props.speed}
            activeCells={props.activeCells}
            player={props.player}
            dispatch={props.dispatch}
          />
        }
      />
      <Route
        path={`${basename}${routeNames.registration}`}
        element={
          <RegistrationScreen
            player={props.player}
            onPlayerRegistration={onPlayerRegistration}
          />
        }
      />
    </Routes>
  );
};
