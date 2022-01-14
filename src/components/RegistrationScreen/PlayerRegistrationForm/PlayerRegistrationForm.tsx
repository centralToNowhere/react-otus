import React, { FC, useCallback, useState, SyntheticEvent } from "react";
import { l10n } from "@/l10n/ru";
import { IPlayer } from "@/state/actions";
import { FormField } from "@/components/Form/FormField";
import { FormElement } from "@/components/Form";
import { css } from "@emotion/react";
import { InputField, LabelField } from "@/components/Fields";
import { FormButton } from "@/components/Buttons";

export interface IRegistrationFormProps {
  player: IPlayer;
  onPlayerRegistration: (playerName: string | null) => void;
}

export const PlayerRegistrationForm: FC<IRegistrationFormProps> = (props) => {
  const [playerName, setPlayerName] = useState(props.player.name);

  const onPlayerNameChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setPlayerName(e.currentTarget.value);
    },
    [setPlayerName]
  );

  const registerPlayer = () => {
    props.onPlayerRegistration(playerName);
  };

  return (
    <FormElement
      css={css`
        background: #e8d5f0;
        width: 70%;
        max-width: 600px;
        display: inline-block;
      `}
    >
      <FormField
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            margin-bottom: 50px;
          `}
        >
          <LabelField htmlFor="register-player-input">
            {l10n.registerPlayerLabel}
          </LabelField>
          <InputField
            css={css`
              width: 100%;
            `}
            id={"register-player-input"}
            value={playerName || ""}
            onChange={onPlayerNameChange}
            name="playerName"
            autoFocus={true}
          />
        </div>
        <FormButton
          type="button"
          css={css`
            margin-right: auto !important;
          `}
          name="startGameAsPlayer"
          onClick={registerPlayer}
        >
          {l10n.buttonStartGameAsPlayer}
        </FormButton>
      </FormField>
    </FormElement>
  );
};
