import React from "react";
import { Story, Meta } from "@storybook/react";
import { IListProps, List } from "@/components/List/List";
import { l10n } from "@/l10n/ru";

export default {
  title: "Components/List",
  component: List,
  args: {
    items: [],
  },
} as Meta;

const Template: Story<IListProps> = (args) => <List {...args} />;

export const ListDefault = Template.bind({});

ListDefault.args = {
  items: [
    {
      content: l10n.rule3,
      items: [
        {
          content: l10n.rule3_1,
        },
        {
          content: l10n.rule3_2,
        },
      ],
    },
  ],
};
