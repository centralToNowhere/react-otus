// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  return teams.reduce((prevTeam: Team, currentTeam) => {
    return prevTeam.score < currentTeam.score ? currentTeam : prevTeam;
  }).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  return Object.keys(qsObj)
    .reduce((prevKey, currentKey) => {
      return prevKey.concat(`${currentKey}=${qsObj[currentKey]}&`);
    }, "?")
    .slice(0, -1);
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
  const paramsString = qs.match(/^\?(?<query>.+)$/)?.groups?.query;

  if (!paramsString) {
    throw new TypeError(`expected query, got ${qs}`);
  }

  return paramsString.split("&").reduce((qsObj: QsObj, current: string) => {
    const keyValue: string[] = current.split("=");

    if (Array.isArray(keyValue) && keyValue.length === 2) {
      qsObj[keyValue[0]] = keyValue[1];
    }

    return qsObj;
  }, {} as QsObj);
};
