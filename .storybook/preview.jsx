import "@/styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { css } from "@emotion/react";
import { COLORS } from "../src/styles/ui-styled";
import { AppBox} from "../src/App";

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