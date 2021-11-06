import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Field from "../lesson3/components/Field";
import { Provider } from "react-redux";
import testStore from "../lesson3/redux/testStore";

export default {
  component: Field,
  title: "Components/Field",
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => {
  return (
    <Provider store={testStore}>
      <Field {...args} />
    </Provider>
  );
};

export const Random5 = Template.bind({});
Random5.args = {
  rowSize: 5,
};

export const Random10 = Template.bind({});
Random10.args = {
  rowSize: 10,
};

export const Random20 = Template.bind({});
Random20.args = {
  rowSize: 20,
};

export const RedRandom5 = Template.bind({});
RedRandom5.args = {
  rowSize: 5,
  backgroundColor: "red",
};

export const GreenRandom5 = Template.bind({});
GreenRandom5.args = {
  rowSize: 5,
  backgroundColor: "green",
};

export const Certain = Template.bind({});
Certain.args = {
  rowSize: 4,
  inputCells: [
    [
      { number: 0, backgroundColor: "rgb(220,228,138)", alive: true },
      { number: 1, backgroundColor: "rgb(228,134,158)", alive: false },
      { number: 2, backgroundColor: "rgb(251,149,155)", alive: true },
      { number: 3, backgroundColor: "rgb(211,121,116)", alive: true },
    ],
    [
      { number: 4, backgroundColor: "rgb(239,54,127)", alive: false },
      { number: 5, backgroundColor: "rgb(157,42,72)", alive: true },
      { number: 6, backgroundColor: "rgb(137,52,12)", alive: true },
      { number: 7, backgroundColor: "rgb(214,211,140)", alive: false },
    ],
    [
      { number: 8, backgroundColor: "rgb(11,157,173)", alive: true },
      { number: 9, backgroundColor: "rgb(253,201,142)", alive: true },
      { number: 10, backgroundColor: "rgb(166,0,17)", alive: true },
      { number: 11, backgroundColor: "rgb(92,232,1)", alive: true },
    ],
    [
      { number: 12, backgroundColor: "rgb(150,156,116)", alive: true },
      { number: 13, backgroundColor: "rgb(6,218,86)", alive: false },
      { number: 14, backgroundColor: "rgb(184,105,86)", alive: true },
      { number: 15, backgroundColor: "rgb(63,171,56)", alive: true },
    ],
  ],
};
