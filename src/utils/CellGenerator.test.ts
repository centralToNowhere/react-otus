import * as gen from "@/utils/CellGenerator";
import { ICell } from "@/Cell/Cell";
import {
  getRandomCells,
  getInitialCells,
  getNextGeneration,
} from "@/utils/CellGenerator";
import { getIndexedCells } from "@/components/GameField/selectors";

describe("CellGenerator tests", () => {
  it("getRandomCells should return 150 cells", () => {
    const cells = getRandomCells(15, 10, 100);

    expect(cells).toHaveLength(150);
    expect(
      cells.every((cell: ICell) => {
        return (
          cell !== null &&
          typeof cell === "object" &&
          typeof cell.x === "number" &&
          typeof cell.y === "number"
        );
      })
    ).toBe(true);
  });

  it("getRandomCells should return 150/150 cells", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(49);
    expect(getRandomCells(15, 10, 50)).toHaveLength(150);
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("getRandomCells should return 0/150 cells", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(51);
    expect(getRandomCells(15, 10, 50)).toHaveLength(0);
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("getRandomCells should return 0 cells", () => {
    expect(getRandomCells(15, 10, 0)).toHaveLength(0);
  });

  it("getRandomCells should return 1 cell", () => {
    expect(getRandomCells(1, 1, 100)).toHaveLength(1);
  });

  it("getRandomCells should return 0 cells", () => {
    expect(getRandomCells(0, 1, 100)).toHaveLength(0);
    expect(getRandomCells(1, 0, 100)).toHaveLength(0);
  });

  it("getInitialCells should return 0 cells", () => {
    expect(gen.getInitialCells(150, 100, 10)).toHaveLength(0);
  });

  const sorter = (cells: ICell[]) => {
    return cells.sort((a, b) => {
      return a.y - b.y !== 0 ? a.y - b.y : a.x - b.x;
    });
  };

  describe("single cell", () => {
    it("cell", () => {
      const input = [
        {
          x: 3,
          y: 2,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("top", () => {
      const input = [
        {
          x: 3,
          y: 0,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("left", () => {
      const input = [
        {
          x: 0,
          y: 4,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("right", () => {
      const input = [
        {
          x: 6,
          y: 4,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("bottom", () => {
      const input = [
        {
          x: 4,
          y: 6,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("top-left", () => {
      const input = [
        {
          x: 0,
          y: 0,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("top-right", () => {
      const input = [
        {
          x: 6,
          y: 0,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("bottom-left", () => {
      const input = [
        {
          x: 0,
          y: 6,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("bottom-left", () => {
      const input = [
        {
          x: 6,
          y: 6,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });
  });

  describe("2 dot colony", () => {
    it("left", () => {
      const input = [
        {
          x: 0,
          y: 3,
        },
        {
          x: 0,
          y: 4,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("right", () => {
      const input = [
        {
          x: 6,
          y: 3,
        },
        {
          x: 6,
          y: 4,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("top", () => {
      const input = [
        {
          x: 3,
          y: 0,
        },
        {
          x: 4,
          y: 0,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });

    it("bottom", () => {
      const input = [
        {
          x: 3,
          y: 6,
        },
        {
          x: 4,
          y: 6,
        },
      ];

      expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual([]);
    });
  });

  describe("3 dot colony", () => {
    it("cycle", () => {
      const input = [
        {
          x: 3,
          y: 2,
        },
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
      ];

      const output = [
        {
          x: 2,
          y: 3,
        },
        {
          x: 3,
          y: 3,
        },
        {
          x: 4,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(output, 7, 7)))
      ).toEqual(sorter(input));
    });

    it("triangle", () => {
      const input = [
        {
          x: 3,
          y: 2,
        },
        {
          x: 4,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 4,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("another 3 dot", () => {
      const input = [
        {
          x: 3,
          y: 2,
        },
        {
          x: 3,
          y: 3,
        },
        {
          x: 4,
          y: 4,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 4,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("stairs", () => {
      const input = [
        {
          x: 2,
          y: 4,
        },
        {
          x: 3,
          y: 3,
        },
        {
          x: 4,
          y: 2,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("triangle 2", () => {
      const input = [
        {
          x: 2,
          y: 2,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 3,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("triangle 3", () => {
      const input = [
        {
          x: 2,
          y: 2,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 2,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("triangle 4", () => {
      const input = [
        {
          x: 2,
          y: 2,
        },
        {
          x: 4,
          y: 4,
        },
        {
          x: 4,
          y: 2,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("triangle 5", () => {
      const input = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 3,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 3,
        },
        {
          x: 4,
          y: 4,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    it("triangle 6", () => {
      const input = [
        {
          x: 2,
          y: 3,
        },
        {
          x: 4,
          y: 3,
        },
        {
          x: 4,
          y: 4,
        },
      ];

      const output = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(output));
    });

    describe("with field overflow in next generation", () => {
      it("left", () => {
        const input = [
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 1,
          },
          {
            x: 0,
            y: 2,
          },
        ];

        const output = [
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 1,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(output));
        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(output, 7, 7)))
        ).toEqual([]);
      });

      it("top", () => {
        const input = [
          {
            x: 0,
            y: 0,
          },
          {
            x: 1,
            y: 0,
          },
          {
            x: 2,
            y: 0,
          },
        ];

        const output = [
          {
            x: 1,
            y: 0,
          },
          {
            x: 1,
            y: 1,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(output));
        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(output, 7, 7)))
        ).toEqual([]);
      });

      it("right", () => {
        const input = [
          {
            x: 6,
            y: 0,
          },
          {
            x: 6,
            y: 1,
          },
          {
            x: 6,
            y: 2,
          },
        ];

        const output = [
          {
            x: 6,
            y: 1,
          },
          {
            x: 5,
            y: 1,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(output));
        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(output, 7, 7)))
        ).toEqual([]);
      });

      it("bottom", () => {
        const input = [
          {
            x: 6,
            y: 6,
          },
          {
            x: 5,
            y: 6,
          },
          {
            x: 4,
            y: 6,
          },
        ];

        const output = [
          {
            x: 5,
            y: 5,
          },
          {
            x: 5,
            y: 6,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(output));
        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(output, 7, 7)))
        ).toEqual([]);
      });

      it("left - neighbours on next row", () => {
        const input = [
          {
            x: 0,
            y: 3,
          },
          {
            x: 1,
            y: 3,
          },
          {
            x: 6,
            y: 2,
          },
        ];

        expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual(
          []
        );
      });

      it("right - neighbours on next row", () => {
        const input = [
          {
            x: 5,
            y: 4,
          },
          {
            x: 6,
            y: 4,
          },
          {
            x: 0,
            y: 5,
          },
        ];

        expect(getNextGeneration(7, 7, getIndexedCells(input, 7, 7))).toEqual(
          []
        );
      });
    });
  });

  describe("4 dot", () => {
    it("rectangle", () => {
      const input = [
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 3,
        },
        {
          x: 4,
          y: 4,
        },
      ];

      expect(
        sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
      ).toEqual(sorter(input));
    });

    describe("with field overflow in next generation", () => {
      it("top-left", () => {
        const input = [
          {
            x: 0,
            y: 0,
          },
          {
            x: 1,
            y: 0,
          },
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 1,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(input));
      });

      it("top-right", () => {
        const input = [
          {
            x: 6,
            y: 0,
          },
          {
            x: 5,
            y: 0,
          },
          {
            x: 6,
            y: 1,
          },
          {
            x: 5,
            y: 1,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(input));
      });

      it("bottom-left", () => {
        const input = [
          {
            x: 0,
            y: 6,
          },
          {
            x: 0,
            y: 5,
          },
          {
            x: 1,
            y: 5,
          },
          {
            x: 1,
            y: 6,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(input));
      });

      it("bottom-right", () => {
        const input = [
          {
            x: 6,
            y: 6,
          },
          {
            x: 5,
            y: 6,
          },
          {
            x: 5,
            y: 5,
          },
          {
            x: 6,
            y: 5,
          },
        ];

        expect(
          sorter(getNextGeneration(7, 7, getIndexedCells(input, 7, 7)))
        ).toEqual(sorter(input));
      });
    });
  });
});
