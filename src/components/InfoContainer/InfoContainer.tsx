import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectGenerationNumber } from "@/components/GameField";
import { Info } from "@/components/InfoContainer";

export const InfoContainer: FC = () => {
  const generationNumber = useSelector(selectGenerationNumber);

  return <Info generationNumber={generationNumber} />;
};
