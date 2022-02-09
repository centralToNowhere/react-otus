import React, { FC } from "react";
import { l10n } from "@/l10n/ru";
import { RegistrationFormContainer } from "@/components/RegistrationForm";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { css } from "@emotion/react";
import { List } from "@/components/List/List";

const rules = [
  {
    content: l10n.rule1,
  },
  {
    content: l10n.rule2,
  },
  {
    content: l10n.rule3,
    items: [
      {
        content: l10n.rule3_1,
      },
      {
        content: l10n.rule3_2,
      },
    ],
  },
  {
    content: l10n.rule4,
    items: [
      {
        content: l10n.rule4_1,
      },
      {
        content: l10n.rule4_2,
      },
      {
        content: l10n.rule4_3,
      },
    ],
  },
];

export const RegistrationScreen: FC = () => {
  return (
    <Container>
      <Column>
        <article>
          <h1>{l10n.rulesHeading}</h1>
          <List items={rules} />
        </article>
      </Column>
      <RightColumn>
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
          <RegistrationFormContainer />
        </RegistrationContainer>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    font-size: 2em;
    margin: 2em;
    display: block;
    line-height: 1.2em;
    align-self: start;
  }

  h1.game-name {
    margin: 20px 0;
    align-self: none;
  }

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    flex-direction: column-reverse;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
  width: 50%;

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    min-height: auto;
    width: 100%;
    height: auto;
  }
`;

const RightColumn = styled(Column)`
  align-items: initial;
  padding: 20px;
  background: ${COLORS.primary};
`;

const RegistrationContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    background: ${COLORS.secondary};
  }

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    justify-content: space-between;
    height: auto;
  }
`;
