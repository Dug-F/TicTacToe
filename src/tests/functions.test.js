import { describe, it, expect, test } from "vitest";
import { player } from "../App";

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

