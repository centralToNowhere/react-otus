import React, { FC } from "react";
import { l10n } from "@/l10n/ru";
import { PlayerRegistrationForm } from "@/components/RegistrationScreen/PlayerRegistrationForm";
import { IPlayer } from "@/state/actions";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export interface IRegistrationScreenProps {
  player: IPlayer;
  onPlayerRegistration?: (playerName: string | null) => void;
}

export const RegistrationScreen: FC<IRegistrationScreenProps> = (props) => {
  const onPlayerRegistration = props.onPlayerRegistration
    ? props.onPlayerRegistration
    : () => {
        //empty
      };

  const onPlayerRegName = (playerName: string | null) => {
    onPlayerRegistration(playerName);
  };

  return (
    <RowContainer>
      <ColumnContainer />
      <RegistrationContainer>
        <h1>{l10n.gameHeading}</h1>
        <PlayerRegistrationForm
          onPlayerRegistration={onPlayerRegName}
          player={props.player}
        />
      </RegistrationContainer>
    </RowContainer>
  );
};

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
  justify-content: center;

  h1 {
    font-size: 2em;
    margin: 20px;
    display: block;
  }

  form {
    background: ${COLORS.secondary};
  }
`;
