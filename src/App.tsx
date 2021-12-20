import React, { FC } from "react";
import ErrorBoundary from "@/components/error/Error";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { GameFieldContainer } from "@/components/GameFieldContainer";
import "./styles/reset.css";

export const App: FC = () => (
  <ErrorBoundary>
    <AppBox data-testid={"react-lifecycle"}>
      <GameFieldContainer
        cellSize={40}
        maxFieldWidth={window.innerWidth}
        maxFieldHeight={window.innerHeight / 2}
        capacity={50}
        speed={2}
      />
    </AppBox>
  </ErrorBoundary>
);

const AppBox = styled.div`
  height: 100vh;
  background: ${COLORS.secondary};
`;
