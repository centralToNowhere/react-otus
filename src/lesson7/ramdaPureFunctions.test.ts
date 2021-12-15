import {
  getTopName,
  Team,
  QsObj,
  createQs,
  parseQs,
} from "./ramdaPureFunctions";

test("getTopName", () => {
  const teams: Team[] = [
    { name: "Lions", score: 5 },
    { name: "Tigers", score: 4 },
    { name: "Bears", score: 6 },
    { name: "Monkeys", score: 2 },
  ];

  expect(getTopName(teams)).toBe("Bears");
});

test("createQs", () => {
  const qsObj: QsObj = {
    page: "2",
    pageSize: "10",
    total: "205",
    somethingElse: "value",
  };

  expect(createQs(qsObj)).toBe(
    "?page=2&pageSize=10&total=205&somethingElse=value"
  );
});

test("createQs empty object", () => {
  const qsObj = {};

  expect(createQs(qsObj)).toBe("");
});

test("createQs not all props", () => {
  type NotAllPropsQsObj = {
    page: string;
    pageSize: string;
  };

  const qsObj: NotAllPropsQsObj = {
    page: "2",
    pageSize: "10",
  };

  expect(createQs(qsObj)).toBe("?page=2&pageSize=10");
});

test("parseQs", () => {
  const qs = "?page=2&pageSize=10&total=205&somethingElse=value";

  expect(parseQs(qs)).toEqual({
    page: "2",
    pageSize: "10",
    total: "205",
    somethingElse: "value",
  });
});

test("parseQs empty qs", () => {
  const qs = "";

  expect(() => parseQs(qs)).toThrowError(`expected query, got ${qs}`);
});
