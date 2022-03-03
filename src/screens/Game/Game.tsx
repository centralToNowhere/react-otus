import React from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { FormContainer } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { PlayerBlockContainer } from "@/components/PlayerBlock";
import { FocusableSeparator } from "@/components/FocusableSeparator/FocusableSeparator";
import { isTouchDevice } from "@/utils/TouchDeviceDetection";
import { InfoContainer } from "@/components/InfoContainer/InfoContainer";

export interface IGameProps {
  onButtonClickFn?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  formKey?: number;
}

export class Game extends React.Component<IGameProps> {
  constructor(props: IGameProps) {
    super(props);
  }

  render() {
    return (
      <Container>
        <GameFieldContainer>
          <GameField />
        </GameFieldContainer>
        {isTouchDevice() ? null : <FocusableSeparator />}
        <ControlContainer>
          <FormContainer
            key={this.props.formKey}
            onButtonClickFn={this.props.onButtonClickFn}
          />
          <LeftSidebar>
            <InfoContainer />
            <PlayerBlockContainer />
          </LeftSidebar>
        </ControlContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    height: 100vh;
  }
`;

const GameFieldContainer = styled.div`
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    overflow: hidden;
    max-width: 100%;
    height: 50vh;
  }
`;

const ControlContainer = styled.div`
  position: relative;

  .game-settings-form {
    margin: 20px;
    clear: right;
    float: none;
    max-width: 480px;
  }

  .player-container {
    border: 0;
  }

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    overflow: hidden;
    width: 100%;
    .game-settings-form {
      margin: 20px auto;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.xl}) and (min-width: ${BREAKPOINTS.md}) {
    .game-settings-form {
      float: right;
    }
  }
`;

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 2px solid ${COLORS.border};
  border-radius: 10px;

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
