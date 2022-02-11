export interface IPlayer {
  registered: boolean;
  name: string;
}

export const defaultPlayer: IPlayer = {
  registered: false,
  name: "",
};

export type PlayerStorageData = IPlayer;
