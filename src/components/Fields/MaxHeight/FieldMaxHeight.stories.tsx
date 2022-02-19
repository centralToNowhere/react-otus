import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxHeight } from "./FieldMaxHeight";
import { IFieldProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default {
  title: "Components/FieldMaxHeight",
  component: FieldMaxHeight,
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
      <FieldMaxHeight {...args} />
    </Provider>
  );
};

export const MaxHeightInput = Template.bind({});
