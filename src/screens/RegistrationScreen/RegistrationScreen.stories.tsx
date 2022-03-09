import React from "react";
import { Story, Meta } from "@storybook/react";
import { RegistrationScreen } from "@/screens/RegistrationScreen";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/auth";
import { Provider } from "react-redux";
import { basename } from "@/routes";
import { BrowserRouter } from "react-router-dom";
import {l10n} from "@/l10n/ru";

export default {
  title: "Components/RegistrationScreen",
  component: RegistrationScreen,
  args: {
    rules: [
      {
        content: l10n.rule1,
      },
      {
        content: l10n.rule2,
      },
      {
        content: l10n.rule3,
        items: [
          {
            content: l10n.rule3_1,
          },
          {
            content: l10n.rule3_2,
          },
        ],
      }
    ]
  }
} as Meta;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: {
      player: {
        name: "Player1",
        registered: false,
      },
      loginPending: false,
      loginError: "",
    },
  },
});

const Template: Story = (args) => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <RegistrationScreen {...args} />
      </BrowserRouter>
    </Provider>
  );
};

export const RegistrationScreenDefault = Template;
