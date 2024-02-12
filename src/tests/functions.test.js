import { describe, it, expect, test } from "vitest";
import player from "../functions/player";
import actions from "../functions/actions";
import actionResult from "../functions/actionResult";
import isTerminalState from "../functions/isTerminalState";
import terminalStateValue from "../functions/terminalStateValue";
import maxValue from "../functions/maxValue";
import minValue from "../functions/minValue";

describe("Test next player to move", () => {
  it("empty board", () => {
    expect(player([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(1);
  });

  it("first player has moved", () => {
    expect(player([1, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(-1);
  });

  it("both players have moved", () => {
    expect(player([1, 0, 0, 0, 0, 0, 0, -1, 0])).toBe(1);
  });
})

describe("Test possible next actions", () => {
  it("empty board", () => {
    expect(actions([0, 0, 0, 0, 0, 0, 0, 0, 0])).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("some moves made", () => {
    expect(actions([1, 0, -1, 0, 1, 0, 0, -1, 0])).toStrictEqual([1, 3, 5, 6, 8]);
  });

  it("some different moves made", () => {
    expect(actions([0, 0, 1, 0, 0, 0, 0, 0, -1])).toStrictEqual([0, 1, 3, 4, 5, 6, 7]);
  });

  it("board is full", () => {
    expect(actions([1, -1, 1, -1, 1, -1, 1, -1, 1])).toStrictEqual([]);
  });
});

describe("Test action result", () => {
  it("empty board, first player to move in cell 3", () => {
    expect(actionResult([0, 0, 0, 0, 0, 0, 0, 0, 0], 3, 1)).toStrictEqual([0, 0, 0, 1, 0, 0, 0, 0, 0]);
  });

  it("mid game, second player to move in cell 6", () => {
    expect(actionResult([1, -1, 0, 1, 0, 0, 0, 0, 0], 6, -1)).toStrictEqual([1, -1, 0, 1, 0, 0, -1, 0, 0]);
  });
});

describe("Test if board is in terminal state", () => {
  it("empty board", () => {
    expect(isTerminalState([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(false);
  });

  it("winning top horizontal line", () => {
    expect(isTerminalState([1, 1, 1, -1, 0, 0, -1, 0, 0])).toBe(true);
  });

  it("winning middle horizontal line", () => {
    expect(isTerminalState([0, 1, 0, -1, -1, -1, 1, 0, 1])).toBe(true);
  });

  it("winning bottom horizontal line", () => {
    expect(isTerminalState([-1, 1, -1, 1, -1, -1, 1, 1, 1])).toBe(true);
  });

  it("winning left column", () => {
    expect(isTerminalState([-1, 1, 0, -1, -1, 1, -1, 1, 1])).toBe(true);
  });

  it("winning middle column", () => {
    expect(isTerminalState([1, -1, -1, 1, -1, 1, 0, -1, 1])).toBe(true);
  });

  it("winning right column", () => {
    expect(isTerminalState([1, -1, -1, 1, 1, -1, 0, 1, -1])).toBe(true);
  });

  it("winning diagonal top left to bottom right", () => {
    expect(isTerminalState([1, 0, -1, -1, 1, 0, 0, 0, 1])).toBe(true);
  });

  it("winning diagonal top right to bottom left", () => {
    expect(isTerminalState([-1, 0, 1, -1, 1, 0, 1, -1, 0])).toBe(true);
  });

  it("board completed, no winning line", () => {
    expect(isTerminalState([1, -1, 1, -1, 1, -1, -1, 1, -1])).toBe(true);
  });

  it("incomplete board, no winning line", () => {
    expect(isTerminalState([1, -1, 0, -1, 1, -1, -1, 1, -1])).toBe(false);
  });

});

describe("Test value of win line for boards in terminal state", () => {
  it("empty board", () => {
    expect(terminalStateValue([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0);
  });

  it("winning top horizontal line", () => {
    expect(terminalStateValue([1, 1, 1, -1, 0, 0, -1, 0, 0])).toBe(1);
  });

  it("winning middle horizontal line", () => {
    expect(terminalStateValue([0, 1, 0, -1, -1, -1, 1, 0, 1])).toBe(-1);
  });

  it("winning bottom horizontal line", () => {
    expect(terminalStateValue([-1, 1, -1, 1, -1, -1, 1, 1, 1])).toBe(1);
  });

  it("winning left column", () => {
    expect(terminalStateValue([-1, 1, 0, -1, -1, 1, -1, 1, 1])).toBe(-1);
  });

  it("winning middle column", () => {
    expect(terminalStateValue([1, -1, -1, 1, -1, 1, 0, -1, 1])).toBe(-1);
  });

  it("winning right column", () => {
    expect(terminalStateValue([1, -1, -1, 1, 1, -1, 0, 1, -1])).toBe(-1);
  });

  it("winning diagonal top left to bottom right", () => {
    expect(terminalStateValue([1, 0, -1, -1, 1, 0, 0, 0, 1])).toBe(1);
  });

  it("winning diagonal top right to bottom left", () => {
    expect(terminalStateValue([-1, 0, 1, -1, 1, 0, 1, -1, 0])).toBe(1);
  });

  it("board completed, no winning line", () => {
    expect(terminalStateValue([1, -1, 1, -1, 1, -1, -1, 1, -1])).toBe(0);
  });

});

describe("Test max value from current state by evaluating all possible actions", () => {
  it("completed board - first player wins", () => {
    expect(maxValue([1, 1, 1, -1, -1, 1, -1, 1, -1])).toStrictEqual({value: 1, action: -1});
  });

  it("board with only one possible move - first player to play and win", () => {
    expect(maxValue([1, 1, 0, -1, -1, 1, -1, 1, -1])).toStrictEqual({value: 1, action: 2});
  });

  it("open board - first player to play and win", () => {
    expect(maxValue([1, -1, 1, 1, -1, 0, 0, 0, -1])).toStrictEqual({value: 1, action: 6});
  });
});

describe("Test min value from current state by evaluating all possible actions", () => {
  it("completed board - second player to play", () => {
    expect(minValue([-1, -1, -1, 1, 1, -1, 1, -1, 1])).toStrictEqual({value: -1, action: -1});
  });

  it("board with 2 moves to go - second player to play and win", () => {
    expect(minValue([1, -1, 1, 1, -1, 1, -1, 0, 0])).toStrictEqual({value: -1, action: 7});
  });

  it("open board - second player to play and win", () => {
    expect(minValue([1, -1, 1, 1, -1, 0, 0, 0, 0])).toStrictEqual({value: -1, action: 7});
  });
});

describe("Test value from current state by evaluating all possible actions", () => {
  it("completed board - no winner", () => {
    expect(maxValue([-1, 1, -1, 1, 1, -1, 1, -1, 1])).toStrictEqual({value: 0, action: -1});
  });
});
