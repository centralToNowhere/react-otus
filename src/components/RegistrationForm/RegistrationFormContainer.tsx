import React, { FC } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useSelector } from "react-redux";
import { useRegistration, selectLoginPending, selectLoginError } from "@/auth";

export const RegistrationFormContainer: FC = () => {
  const [player, onPlayerRegistration] = useRegistration();
  const loginPending = useSelector(selectLoginPending);
  const loginError = useSelector(selectLoginError);
  const onPlayerRegName = (playerName: string | null) => {
    onPlayerRegistration(playerName);
  };

  return (
    <RegistrationForm
      onPlayerRegistration={onPlayerRegName}
      player={player}
      loginPending={loginPending}
      loginError={loginError}
    />
  );
};
