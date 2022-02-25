import React from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";
import { FormContainer } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { PlayerBlockContainer } from "@/components/PlayerBlock";

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
        <GameField />
        <ControlContainer>
          <FormContainer
            key={this.props.formKey}
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
`;

const ControlContainer = styled.div`
  position: relative;

  .game-settings-form {
    clear: right;
    float: none;
    max-width: 480px;
  }

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
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
