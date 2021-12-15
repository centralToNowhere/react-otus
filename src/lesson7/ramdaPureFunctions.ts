import { compose, curry, reduce } from "ramda";
import _ from "ts-toolbelt";

// Задание 1
export type Team = { name: string; score: number };

const getMaxScoreTeam = (a: Team, b: Team): Team => (a.score > b.score ? a : b);

// (╯ ° □ °) ╯ (┻━┻)
const getTeamProperty: _.F.Curry<
  (prop: keyof Team, team: Team) => Team[keyof Team]
> = curry(<T, P extends keyof T>(prop: P, team: T): T[P] => team[prop]);
const getName: (team: Team) => string = getTeamProperty("name");

export const getTopName = compose(getName, reduce(getMaxScoreTeam, {} as Team));

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;
type Entry = [string, string | number | boolean | object];

const getEntries = (obj: QsObj) => Object.entries(obj);
const paramsToString = (acc: string, curr: Entry): string => {
  return acc.concat(`${curr[0]}=${curr[1]}&`);
};
const sliceLastAmp = (qs: string) => qs.slice(0, -1);

export const createQs = compose(
  sliceLastAmp,
  reduce(paramsToString, "?"),
  getEntries
);

// Задание 3

const getParamsString = (qs: string) => {
  const query = qs.match(/^\?(?<query>.+)$/)?.groups?.query;

  if (!query) {
    throw new TypeError(`expected query, got ${qs}`);
  }

  return query;
};

const split = curry((delimiter: string, s: string) => s.split(delimiter));
const splitAmp = split("&");
const stringToParam = (acc: QsObj, current: string) => {
  const keyValue: string[] = current.split("=");

  if (Array.isArray(keyValue) && keyValue.length === 2) {
    acc[keyValue[0]] = keyValue[1];
  }

  return acc;
};

export const parseQs = compose(
  reduce(stringToParam, {} as QsObj),
  splitAmp,
  getParamsString
);
