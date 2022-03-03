import React, { FC } from "react";
import styled from "@emotion/styled";
import { l10n } from "@/l10n/ru";

export interface IInfoProps {
  generationNumber: number;
}

export const Info: FC<IInfoProps> = ({ generationNumber }) => {
  return (
    <StyledInfoContainer>
      <p>
        {l10n.generation}: {generationNumber}
      </p>
    </StyledInfoContainer>
  );
};

const StyledInfoContainer = styled.div`
  padding: 20px;
  font-size: 1.5em;
`;
