import React, { FC } from "react";
import { l10n } from "@/l10n/ru"
import { Form as RegistrationForm } from "@/components/RegistrationScreen/Form"
import { AppAction } from "@/state";
import { IPlayer } from "@/state/actions";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export interface IRegistrationScreenProps {
  player: IPlayer;
  onPlayerRegistration?: (playerName: string | null) => void;
  dispatch: React.Dispatch<AppAction>;
}

export const RegistrationScreen: FC<IRegistrationScreenProps> = (props) => {
  const onPlayerRegistration = props.onPlayerRegistration ? props.onPlayerRegistration : () => {};

  return (
    <RowContainer>
      <ColumnContainer/>
      <RegistrationContainer>
        <h1>{l10n.gameHeading}</h1>
        <RegistrationForm
          dispatch={props.dispatch}
          onPlayerRegistration={onPlayerRegistration}
          player={props.player}
        />
      </RegistrationContainer>
    </RowContainer>
  )
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 50%;
`;

const RegistrationContainer = styled(ColumnContainer)`
  background: ${COLORS.primary};
  padding: 0 20px;
  align-items: start;
  justify-content: center;;

  h1 {
    font-size: 2em;
    margin: 20px;
    display: block;
  };
`;