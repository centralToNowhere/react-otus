import React, { FC } from "react";
import { FormElement } from "@/components/Form";
import { css } from "@emotion/react";
import { FormField } from "@/components/Form";
import { FormButton } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { IPlayer } from "@/player/Player";

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
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0;
            border-bottom: 2px solid ${COLORS.accent};
          }

          div.player-stats-container {
            margin: 20px 0;

            & > h2 {
              font-size: 1.2rem;
            }

            & > ul {
              padding-left: 0;
            }
          }

          li {
            margin: 10px 0 10px 20px;
          }
        `}
      >
        <h1 className="player-name">{props.player.name}</h1>
        <div className="player-stats-container">
          <h2>{l10n.statistics}</h2>
          <ul>
            <li>{l10n.score} 0</li>
            <li>{l10n.clicksCount} 0</li>
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
