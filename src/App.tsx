import React, { FC, useReducer } from "react";
import ErrorBoundary from "@/components/error/Error";
import { AppReducer, initialState } from "@/state";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { GameFieldContainer } from "@/components/GameFieldContainer";
import "./styles/reset.css";

export const App: FC = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <ErrorBoundary>
      <AppBox data-testid={"react-lifecycle"}>
        <GameFieldContainer
          cellSize={state.cellSize}
          maxFieldWidth={state.maxFieldWidth}
          maxFieldHeight={state.maxFieldHeight}
          capacity={state.capacity}
          speed={state.speed}
          activeCells={state.activeCells}
          dispatch={dispatch}
        />
      </AppBox>
    </ErrorBoundary>
  );
};

const AppBox = styled.div`
  height: 100vh;
  background: ${COLORS.secondary};
`;
