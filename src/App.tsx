import React, {FC, useEffect, useReducer} from "react";
import ErrorBoundary from "@/components/error/Error";
import { AppReducer, initialState } from "@/state";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { GameFieldContainer } from "@/components/GameFieldContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationScreen } from "@/components/RegistrationScreen";
import { authProtected, usePlayerRegistration } from "@/auth/Auth";
import "./styles/reset.css";

const AuthGameFieldContainer = authProtected(GameFieldContainer);

export const App: FC = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const onPlayerRegistration = usePlayerRegistration(state.player, dispatch);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppBox data-testid={"react-lifecycle"}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGameFieldContainer
                  cellSize={state.cellSize}
                  maxFieldWidth={state.maxFieldWidth}
                  maxFieldHeight={state.maxFieldHeight}
                  capacity={state.capacity}
                  speed={state.speed}
                  activeCells={state.activeCells}
                  player={state.player}
                  dispatch={dispatch}
                />
              }
            />
            <Route
              path="/registration"
              element={
                <RegistrationScreen
                  player={state.player}
                  onPlayerRegistration={onPlayerRegistration}
                  dispatch={dispatch}
                />
              }
            />
          </Routes>
        </AppBox>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const AppBox = styled.div`
  height: 100vh;
  background: ${COLORS.secondary};
`;
