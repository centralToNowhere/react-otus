import React, { FC } from "react";
import { FormElement } from "@/components/Form";
import { css } from "@emotion/react";
import { IPlayer } from "@/state/actions";
import { FormField } from "@/components/Form";
import { FormButton } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import {BREAKPOINTS, COLORS} from "@/styles/ui-styled";

export interface IPlayerContainerProps {
  player: IPlayer;
  onPlayerUnregister: () => void;
}

export const PlayerContainer: FC<IPlayerContainerProps> = (props) => {
  return (
    <FormElement
      css={css`
        align-self: flex-start;

        @media screen and (min-width: ${BREAKPOINTS.xl}) {
          position: absolute;
          margin-right: auto;
          left: 0;
        }
      `}
    >
      <FormField
        css={css`
          display: inline-block;

          h1.player-name {
            font-size: 1.2em;
            font-weight: bold;
            margin: 0;
            border-bottom: 2px solid ${COLORS.accent};
          }

          div.player-stats {
            margin: 20px 0;
          }

          li {
            margin: 10px 0 10px 20px;
          }
        `}
      >
        <h1 className="player-name">{props.player.name}</h1>
        <div className="player-stats">
          <h2>{l10n.statistics}</h2>
          <ul>
            <li>
              {l10n.score} {Math.round(Math.random() * 100)}
            </li>
            <li>
              {l10n.clicksCount} {Math.round(Math.random() * 100)}
            </li>
          </ul>
        </div>
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
