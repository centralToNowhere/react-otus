import { IFieldControlState } from "@/components/Fields";
import { IAuthState } from "@/auth";

export interface IPlayer {
  registered: boolean;
  name: string | null;
}

export const defaultPlayer: IPlayer = {
  registered: false,
  name: null,
};

export type PlayerStorageData = IFieldControlState &
  Omit<IAuthState, "loginPending">;
