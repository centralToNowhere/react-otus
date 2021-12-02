import React, { FC } from "react";
import ErrorBoundary from "@/components/error/Error";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { FieldContainer } from "@/components/FieldContainer";
import "./styles/reset.css";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AppBox data-testid={"react-lifecycle"}>
        <FieldContainer
          cellSize={40}
          maxFieldWidth={window.innerWidth}
          maxFieldHeight={window.innerHeight / 2}
          capacity={50}
          speed={1}
        />
      </AppBox>
    </ErrorBoundary>
  );
};

const AppBox = styled.div`
  height: 100vh;
  background: ${COLORS.secondary};
`;

export default App;
