import React, { FC, useReducer } from "react";
import ErrorBoundary from "@/components/error/Error";
import { AppReducer, initialState } from "@/state";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import "./styles/reset.css";
import { AppRouter } from "@/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

export const App: FC = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <ErrorBoundary>
      <AppBox data-testid={"react-lifecycle"}>
        <BrowserRouter>
          <AppRouter
            cellSize={state.cellSize}
            maxFieldWidth={state.maxFieldWidth}
            maxFieldHeight={state.maxFieldHeight}
            capacity={state.capacity}
            speed={state.speed}
            activeCells={state.activeCells}
            player={state.player}
            dispatch={dispatch}
          />
        </BrowserRouter>
      </AppBox>
    </ErrorBoundary>
  );
};

const AppBox = styled.div`
  min-height: 100vh;
  background: ${COLORS.secondary};
`;
