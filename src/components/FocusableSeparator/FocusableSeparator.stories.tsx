import React from "react";
import { Story, Meta } from "@storybook/react";
import { FocusableSeparator } from "@/components/FocusableSeparator";
import { css } from "@emotion/react";

export default {
  title: "Components/FocusableSeparator",
  component: FocusableSeparator,
} as Meta;

const Template: Story = () => {
  return (
    <div
      css={css`
        width: 100px;
        position: absolute;
        top: 100px;
        left: 100px;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: green;
          overflow: hidden;
        `}
      >
        Content of div 1
      </div>
      <FocusableSeparator />
      <div
        css={css`
          background: yellow;
          overflow: hidden;
        `}
      >
        Content of div 2
      </div>
    </div>
  );
};

export const FocusableSeparatorDefault = Template;
