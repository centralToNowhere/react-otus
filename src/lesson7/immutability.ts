// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};


export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  type TeamAllRecords = OriginalTeam & ExpectedTeam;

  type Entry<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T]
  type TeamEntry = Entry<TeamAllRecords>;
  type TeamEntryWithoutSize = Entry<Omit<TeamAllRecords, "size">>;

  const getEntriesFromTeam = (
    team: TeamAllRecords
  ): TeamEntry[] => {
    return Object.entries(team) as TeamEntry[];
  }

  const getTeamFromEntries = (
    entries: TeamEntry[]
  ): TeamAllRecords => {
    return Object.fromEntries(entries);
  }

  const omitSize = (
    entry: TeamEntry
  ): entry is TeamEntryWithoutSize => {
    return entry[0] !== "size"
  };

  const filterSize = (
    entries: TeamEntry[]
  ): TeamEntryWithoutSize[] => {
    return entries.filter(omitSize);
  }

  const mergedTeam: TeamAllRecords = Object.assign({}, originalTeam,{
    name: "New York Badgers",
    roster: 25
  });

  return getTeamFromEntries(filterSize(getEntriesFromTeam(mergedTeam)));
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
  return ["two", ...[...originalArray, 5].splice(2, 3)];
};

// Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeamTask3 = (originalTeam: Team): Team => {
  return {
    ...originalTeam,
    captain: {
      ...originalTeam.captain,
      age: originalTeam.captain.age + 1
    }
  }
}