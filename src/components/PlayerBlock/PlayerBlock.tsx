import React, { FC } from "react";
import { FormElement } from "@/components/Form";
import { css } from "@emotion/react";
import { FormField } from "@/components/Form";
import { FormButton } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import { COLORS } from "@/styles/ui-styled";

export interface IPlayerContainerProps {
  playerName: string;
  onPlayerUnregister: () => void;
}

export const PlayerBlock: FC<IPlayerContainerProps> = (props) => {
  return (
    <FormElement
      css={css`
        border: 0;
      `}
    >
      <FormField
        css={css`
          display: inline-block;
          margin: 0;

          h1.player-name {
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0;
            border-bottom: 2px solid ${COLORS.accent};
          }

          div.player-stats-container {
            margin: 20px 0;
          }

          li {
            margin: 10px 0 10px 20px;
          }
        `}
      >
        <h1 className="player-name">{props.playerName}</h1>
        <div className="player-stats-container" />
        <FormButton
          css={css`
            text-align: center;
          `}
          type="button"
          onClick={props.onPlayerUnregister}
        >
          {l10n.logoutButton}
        </FormButton>
      </FormField>
    </FormElement>
  );
};
