import React from "react";
import { Story, Meta } from "@storybook/react";
import { RegistrationScreen } from "@/components/RegistrationScreen";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/auth";
import { Provider } from "react-redux";
import { basename } from "@/routes";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/RegistrationScreen",
  component: RegistrationScreen,
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
