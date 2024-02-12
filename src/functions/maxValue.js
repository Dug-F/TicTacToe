import isTerminalState from "./isTerminalState";
import terminalStateValue from "./terminalStateValue";
import actions from "./actions";
import actionResult from "./actionResult";
import minValue from "./minValue";
import player from "./player";

/**
 * part of a recursive pair of algorithms which returns the max value that can be obtained
 * from the current game position by considering all possible actions and evaluating the
 * response by the opponent
 * @param {[int]} grid the current position of the game grid
 * @return {{value: [int], action: [int]}} value: the maximum value that can be obtained from the current position, action: the index of the action that achieves that outcome
 */

export default function maxValue(grid) {
  let outcome = { value: Number.MIN_VALUE, action: -1 };

  if (isTerminalState(grid)) {
    outcome.value = terminalStateValue(grid);
    return outcome;
  }

  for (let action of actions(grid)) {
    // console.log("in actions");
    const { value } = minValue(actionResult(grid, action, player(grid)));
    // console.log("value: ", value);
    if (value > outcome.value) {
      outcome.value = value;
      outcome.action = action;
    }
    if (outcome.value === 1) break;
  }
  return outcome;
}
