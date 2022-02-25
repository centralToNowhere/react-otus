import { store } from "@/store/redux/store";
import React, { FC } from "react";
import ErrorBoundary from "@/components/Error/Error";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import "./styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "@/routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { basename } from "@/routes";
import { Provider } from "react-redux";

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <React.StrictMode>
        <Provider store={store}>
          <AppBox data-testid={"react-lifecycle"}>
            <BrowserRouter basename={basename}>
              <AppRouter />
            </BrowserRouter>
          </AppBox>
        </Provider>
      </React.StrictMode>
    </ErrorBoundary>
  );
};

export const AppBox = styled.div`
  min-height: 100vh;
  background: ${COLORS.secondary};
  line-height: 1;

  & button:focus {
    outline: 2px solid ${COLORS.accent};
    border: 2px solid transparent;
  }

  & p {
    margin-bottom: 0;
  }
`;
