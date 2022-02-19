import React from "react";
import { Story, Meta } from "@storybook/react";
import { Form, IFormProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default {
  title: "Components/SettingsForm",
  component: Form,
  args: {
    cellSize: 40,
    capacity: 48,
    speed: 1,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
  },
} as Meta;

const Template: Story<IFormProps> = (args) => (
  <Provider store={store}>
    <Form {...args} />
  </Provider>
);

export const FormDefault = Template.bind({});
