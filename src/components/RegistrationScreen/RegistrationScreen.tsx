import React, { FC } from "react";
import { l10n } from "@/l10n/ru";
import { PlayerRegistrationForm } from "@/components/RegistrationScreen/PlayerRegistrationForm";
import { IPlayer } from "@/state/actions";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { css } from "@emotion/react";

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
    <Container>
      <ColumnContainer>
        <h1>{l10n.rulesHeading}</h1>
      </ColumnContainer>
      <RegistrationContainer>
        <h1 className="game-name">
          {l10n.gameHeadingPart1}{" "}
          <span
            css={css`
              white-space: nowrap;
            `}
          >
            {l10n.gameHeadingPart2}
          </span>
        </h1>
        <PlayerRegistrationForm
          onPlayerRegistration={onPlayerRegName}
          player={props.player}
        />
      </RegistrationContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    font-size: 2em;
    margin: 20px;
    display: block;
    line-height: 1.2em;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
    flex-direction: column-reverse;

    h1 {
      text-align: center;
    }
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  width: 50%;

  @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
    width: 100%;
    height: auto;
  }
`;

const RegistrationContainer = styled(ColumnContainer)`
  background: ${COLORS.primary};
  padding: 0 20px;
  align-items: start;
  justify-content: center;

  form {
    background: ${COLORS.secondary};
  }

  @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
    justify-content: space-between;
  }
`;
