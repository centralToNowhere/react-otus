import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxHeight } from "./FieldMaxHeight";
import { IFieldProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default {
  title: "Components/FormFields/MaxHeight",
  component: FieldMaxHeight,
  args: {
    formRawData: {
      rawMaxWidth: "500",
      rawMaxHeight: "500",
      rawCellSize: "40",
      highlight: false,
    },
    onRawChange: () => {
      // empty function
    },
    onChange: () => {
      // empty function
    },
  },
} as Meta;

const Template: Story<
  IFieldProps<{
    rawMaxWidth: string;
    rawMaxHeight: string;
    rawCellSize: string;
    highlight: boolean;
  }>
> = (args) => {
  return (
    <Provider store={store}>
      <FieldMaxHeight {...args} />
    </Provider>
  );
};

export const MaxHeightInput = Template.bind({});
