import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxWidth } from "./FieldMaxWidth";
import { IFieldProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default {
  title: "Components/FieldMaxWidth",
  component: FieldMaxWidth,
  args: {
    value: "500",
    onChange: () => {
      // empty function
    },
  },
} as Meta;

const Template: Story<IFieldProps> = (args: IFieldProps) => {
  return (
    <Provider store={store}>
      <FieldMaxWidth {...args} />
    </Provider>
  );
};

export const MaxWidthInput = Template.bind({});
