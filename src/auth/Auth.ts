import { IPlayer } from "@/player/Player";

export interface IAuthState {
  player: IPlayer;
  loginPending: boolean;
  loginError: string;
}

export type LoginError = {
  message: string;
};

export const PlayerNameNotSetError: LoginError = new Error(
  "Player name is not specified!"
);

export const PlayerNotRegisteredError: LoginError = new Error(
  "Player is not registered somehow!"
);

export const registerPlayer = (playerName: string) => {
  return new Promise<IPlayer>((resolve, reject) => {
    setTimeout(() => {
      if (playerName) {
        resolve({
          registered: true,
          name: playerName,
        });
      } else {
        reject(PlayerNameNotSetError);
      }
    }, fakeRegisterPlayerTimeout);
  });
};

export const fakeRegisterPlayerTimeout = 500;
