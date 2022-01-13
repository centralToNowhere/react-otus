import React, { FC } from "react";
import { FormElement } from "@/components/Form";
import { jsx, css } from '@emotion/react'
import { IPlayer, SetPlayerAction } from "@/state/actions";
import { FormField } from "@/components/Form";
import { AppAction } from "@/state";
import { FormButton } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import { COLORS } from "@/styles/ui-styled";

interface IPlayerContainerProps {
  player: IPlayer,
  dispatch: React.Dispatch<AppAction>
}

export const PlayerContainer: FC<IPlayerContainerProps> = (props) => {
  return (
    <FormElement css={css`
      position: absolute;
      left: 0;
      align-self: flex-start;
      margin-right: auto;
    `}>
      <FormField css={css`
        display: inline-block;

        p.player-name {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0;
          border-bottom: 2px solid ${COLORS.accent};
        };

        div.player-stats {
          margin: 20px 0;
        };

        li {
          margin: 10px 0 10px 20px;
        }
      `}>
        <p className="player-name">{props.player.name}</p>
        <div className="player-stats">
          <p>Cтатистика</p>
          <ul>
            <li>Очки: 25</li>
            <li>Количество кликов: 34</li>
          </ul>
        </div>
        <FormButton
          css={css`
          text-align: center;
        `}
          type="button"
          onClick={() => {props.dispatch(SetPlayerAction({registered: false, name: null}))}}
        >
          {l10n.logoutButton}
        </FormButton>
      </FormField>
    </FormElement>
  )
}