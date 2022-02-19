import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldCellSize } from "@/components/Fields/CellSize/FieldCellSize";
import { IFieldProps } from "@/components/Form";
import { store } from "@/store/redux/store";
import { Provider } from "react-redux";

export default {
  title: "Components/FieldCellSize",
  component: FieldCellSize,
  args: {
    value: "40",
    onChange: () => {
      // empty function
    },
  },
} as Meta;

const Template: Story<IFieldProps> = (args: IFieldProps) => {
  return (
    <Provider store={store}>
      <FieldCellSize {...args} />
    </Provider>
  );
};

export const CellSizeInput = Template;
