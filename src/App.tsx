import React, { FC } from "react";
import ErrorBoundary from "@/components/error/Error";
import styled from "@emotion/styled";
import { FieldContainer } from "@/components/FieldContainer";
import "./styles/reset.css";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AppBox data-testid={"react-lifecycle"}>
        <FieldContainer
          cellSize={40}
          cellsBetweenChars={1}
          fieldWidthPx={window.innerWidth}
          fieldHeightPx={window.innerHeight / 2}
        />
      </AppBox>
    </ErrorBoundary>
  );
};

const AppBox = styled.div`
  height: 100vh;
  background: #e8d5f0;
`;

export default App;
