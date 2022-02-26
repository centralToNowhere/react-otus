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
        <p>
          {l10n.description1}
          <span
            css={css`
              font-style: italic;
            `}
          >
            {l10n.gameNameFull}
          </span>
          {l10n.description2}
        </p>
        <p
          css={css`
            font-style: italic;
            font-size: 1rem;
            text-align: right;
          `}
        >
          {l10n.source}{" "}
          <a
            href="https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB"
            title={l10n.sourceName}
          >
            {l10n.sourceName}
          </a>
        </p>
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
  font-size: 1.25rem;
  line-height: 1.5;

  p {
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 1.5em;
    margin: 1em 0;
    display: block;
    line-height: 1.2em;
    align-self: start;
  }

  h1.game-name {
    font-size: 2em;
  }

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    flex-direction: column-reverse;
  }

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    font-size: 1rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  width: 50%;
  padding: 2em 2em 0 2em;

  @media screen and (max-width: ${BREAKPOINTS.lg}) {
    min-height: auto;
    width: 100%;
    height: auto;
  }
`;

const RightColumn = styled(Column)`
  align-items: initial;
  padding: 0 2rem;
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
    width: 100%;
    height: auto;
  }
`;
