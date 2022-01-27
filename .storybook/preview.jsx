import "@/styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { css } from "@emotion/react";
import { AppBox } from "../src/App";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen"
}

export const decorators = [
  (Story) => (
    <AppBox css={css`
      background: inherit;
      min-height: auto;
      height: 0
    `}>
      <Story />
    </AppBox>
  ),
];