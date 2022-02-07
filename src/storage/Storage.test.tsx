import {
  setDataToStorage,
  getDataFromStorage,
  storageKey,
  StorageData,
} from "@/storage/Storage";

describe("saving/loading state to localstorage", () => {
  const expectedData: StorageData = {
    player: {
      registered: true,
      name: "Player2",
    },
    fieldControl: {
      cellSize: 50,
      maxFieldWidth: 600,
      maxFieldHeight: 600,
      speed: 4,
      capacity: 59,
    },
  };

  it("should save player data to storage", () => {
    setDataToStorage(expectedData);

    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify(expectedData));
  });

  it("should get player data from storage", () => {
    const playerData = getDataFromStorage();

    expect(playerData).toEqual(expectedData);
  });
});
