import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxWidth } from "./FieldMaxWidth";
import { IFieldProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import { isValidPositiveNumericString } from "@/utils";

export default {
  title: "Components/FormFields/MaxWidth",
  component: FieldMaxWidth,
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
    formValidators: [isValidPositiveNumericString()],
    error: {
      show: false,
      msg: "maxWidth error",
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
      <FieldMaxWidth {...args} />
    </Provider>
  );
};

export const MaxWidthInput = Template.bind({});
