export interface IPlayer {
  registered: boolean,
  name: string | null
}

export const isPlayer = (player: IPlayer): player is IPlayer => {
  return player && typeof player === "object"
    && typeof player.registered === "boolean"
    && (typeof player.name === "string" || player.name === null);
}