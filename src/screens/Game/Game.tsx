import React from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { FormContainer } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { PlayerBlockContainer } from "@/components/PlayerBlock";
import { FocusableSeparator } from "@/components/FocusableSeparator/FocusableSeparator";
import { isTouchDevice } from "@/utils/TouchDeviceDetection";
import { InfoContainer } from "@/components/InfoContainer/InfoContainer";
import { FigurePaletteContainer } from "@/components/FigurePalette";

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
        <GameFieldContainer data-testid={"gameFieldContainer"}>
          <GameField />
        </GameFieldContainer>
        {isTouchDevice() ? null : <FocusableSeparator />}
        <ControlContainer>
          <SidebarContainer>
            <LeftSidebar>
              <InfoContainer />
              <PlayerBlockContainer />
            </LeftSidebar>
          </SidebarContainer>
          <FormContainer
            key={this.props.formKey}
            onButtonClickFn={this.props.onButtonClickFn}
          />
          <SidebarContainerRight>
            <RightSidebar>
              <FigurePaletteContainer />
            </RightSidebar>
          </SidebarContainerRight>
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
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 20px 0 20px;

  & > * {
    margin-bottom: 20px;
  }

  .game-settings-form {
    max-width: 480px;
  }

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    flex: 1;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 100%;
    padding-top: 0;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const SidebarContainerRight = styled(SidebarContainer)`
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    justify-content: flex-end;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: 2px solid ${COLORS.border};
  border-radius: 10px;
  min-width: 0;

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    min-width: auto;
    width: auto;
  }
`;

const LeftSidebar = styled(Sidebar)``;

const RightSidebar = styled(Sidebar)``;
