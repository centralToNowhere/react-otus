import React, { FC } from "react";
import { l10n } from "@/l10n/ru";
import { PlayerRegistrationForm } from "@/components/RegistrationScreen/PlayerRegistrationForm";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { css } from "@emotion/react";
import { usePlayerRegistration } from "@/auth/Auth";

export const RegistrationScreen: FC = (props) => {
  const [player, onPlayerRegistration] = usePlayerRegistration();
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
          player={player}
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

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
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

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
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

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    justify-content: space-between;
  }
`;
