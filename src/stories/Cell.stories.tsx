import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CellContainer, {
  ICellContainerProps,
} from "../lesson3/components/CellContainer";
import { ICell } from "../lesson3/components/Cell";
import { Provider } from "react-redux";
import testStore from "../lesson3/redux/testStore";
import {
  setCellsAction,
  switchAliveOrDeadAction,
} from "../lesson3/redux/actions";

export default {
  component: CellContainer,
  title: "Components/Cell",
  args: {
    alive: true,
    backgroundColor: "rgb(256,93,93)",
    width: 30,
    number: 1,
    onCellClick: () => {
      testStore.dispatch(switchAliveOrDeadAction(1));
    },
  },
} as ComponentMeta<typeof CellContainer>;

const Template: ComponentStory<typeof Object> = (
  args: ICell & ICellContainerProps
) => {
  testStore.dispatch(
    setCellsAction([
      [
        {
          number: args.number,
          backgroundColor: args.backgroundColor,
          alive: args.alive,
        },
      ],
    ])
  );

  return (
    <Provider store={testStore}>
      <CellContainer {...args} />
    </Provider>
  );
};

export const Dead = Template.bind({});
Dead.args = {
  alive: false,
};

export const Alive = Template.bind({});
Alive.args = {
  alive: true,
};

export const Green = Template.bind({});
Green.args = {
  backgroundColor: "green",
};

export const Blue = Template.bind({});
Blue.args = {
  backgroundColor: "blue",
};

export const Cell23 = Template.bind({});
Cell23.args = {
  number: 23,
};

export const Cell123 = Template.bind({});
Cell123.args = {
  number: 123,
};
