import React, {
  FC,
  useCallback,
  useState,
  SyntheticEvent,
  KeyboardEvent,
} from "react";
import { l10n } from "@/l10n/ru";
import { FormField } from "@/components/Form/FormField";
import { FormElement } from "@/components/Form";
import { css } from "@emotion/react";
import { InputField, LabelField } from "@/components/Fields";
import { FormButton } from "@/components/Buttons";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import styled from "@emotion/styled";
import { Spinner } from "react-bootstrap";
import { IPlayer } from "@/player/Player";
import { FieldError } from "@/components/Fields/FieldError";

export interface IRegistrationFormProps {
  player: IPlayer;
  loginPending: boolean;
  loginError: string;
  onPlayerRegistration: (playerName: string | null) => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = (props) => {
  const [playerName, setPlayerName] = useState(props.player.name);

  const onPlayerNameChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setPlayerName(e.currentTarget.value);
    },
    [setPlayerName]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      registerPlayer();
    }
  };

  const registerPlayer = () => {
    props.onPlayerRegistration(playerName);
  };

  return (
    <FormElement
      css={css`
        width: 100%;
        max-width: 600px;
        flex-direction: row;
        font-size: 1.2rem;
        margin: 0 0 20px 0;

        @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
          flex-direction: column-reverse;
        }
      `}
    >
      <FormField
        css={css`
          display: flex;
          flex-grow: 10;
        `}
      >
        <div
          css={css`
            margin-bottom: 20px;
          `}
        >
          <LabelField htmlFor="register-player-input">
            {l10n.registerPlayerLabel}
          </LabelField>
          <InputField
            css={css`
              width: 100%;
            `}
            autoComplete={"off"}
            id={"register-player-input"}
            value={playerName || ""}
            onChange={onPlayerNameChange}
            name="playerName"
            autoFocus={true}
            onKeyDown={onKeyDown}
          />
          <FieldError show={Boolean(props.loginError)} msg={props.loginError} />
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
      <SpinnerContainer>
        <Spinner
          animation="border"
          role="status"
          css={css`
            color: ${COLORS.accent};
            visibility: ${props.loginPending ? "visible" : "hidden"};
            margin: 20px 20px 0 20px;

            @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
              display: ${props.loginPending ? "inline-block" : "none"};
            }
          `}
        />
      </SpinnerContainer>
    </FormElement>
  );
};

const SpinnerContainer = styled.div`
  flex-grow: 1;
  text-align: right;

  @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
    text-align: left;
  }
`;
