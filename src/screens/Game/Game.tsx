import React from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";
import { FormContainer } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { PlayerBlockContainer } from "@/components/PlayerBlock";
import { FocusableSeparator } from "@/components/FocusableSeparator/FocusableSeparator";
import { isTouchDevice } from "@/utils/TouchDeviceDetection";

export interface IGameProps {
  onSpeedChange?: (value: string) => void;
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
            onSpeedChange={this.props.onSpeedChange}
            onButtonClickFn={this.props.onButtonClickFn}
          />
          <PlayerBlockContainer />
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
    overflow: auto;
    max-width: 100%;
    height: 50vh;
  }
`;

const ControlContainer = styled.div`
  position: relative;

  .game-settings-form {
    clear: right;
    float: none;
    max-width: 480px;
  }

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    overflow: hidden;
    width: 100%;
    .game-settings-form {
      margin: 20px auto;
    }

    .player-container {
      position: absolute;
      margin: 20px;
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.xl}) and (min-width: ${BREAKPOINTS.md}) {
    .game-settings-form {
      float: right;
    }
  }
`;
