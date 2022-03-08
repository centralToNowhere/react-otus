import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldCellSize } from "@/components/Fields/CellSize/FieldCellSize";
import { IFieldProps } from "@/components/Form";
import { store } from "@/store/redux/store";
import { Provider } from "react-redux";
import { isValidCellSizeString } from "@/utils";

export default {
  title: "Components/FormFields/CellSize",
  component: FieldCellSize,
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
    formValidators: [isValidCellSizeString()],
    error: {
      show: false,
      msg: "cellSize error",
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
      <FieldCellSize {...args} />
    </Provider>
  );
};

export const CellSizeInput = Template;
