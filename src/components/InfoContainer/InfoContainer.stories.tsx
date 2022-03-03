import React from "react";
import { Story, Meta } from "@storybook/react";
import { IInfoProps, Info } from "@/components/InfoContainer";

export default {
  title: "Components/Info",
  component: Info,
  args: {
    generationNumber: 254,
  },
} as Meta;

const Template: Story<IInfoProps> = (args) => <Info {...args} />;

export const InfoDefault = Template;
