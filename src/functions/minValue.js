import isTerminalState from "./isTerminalState";
import terminalStateValue from "./terminalStateValue";
import actions from "./actions";
import actionResult from "./actionResult";
import maxValue from "./maxValue";
import player from "./player";

/**
 * part of a recursive pair of algorithms which returns the min value that can be obtained
 * from the current game position by considering all possible actions and evaluating the
 * response by the opponent
 * @param {[int]} grid the current position of the game grid
 * @return {{value: [int], action: [int]}} value: the minimum value that can be obtained from the current position, action: the index of the action that achieves that outcome
 */

export default function minValue(grid) {
  let outcome = { value: Number.MAX_VALUE, action: -1 };

  if (isTerminalState(grid)) {
    outcome.value = terminalStateValue(grid);
    return outcome;
  }

  for (let action of actions(grid)) {
    const {value} = maxValue(actionResult(grid, action, player(grid)));
    if (value < outcome.value) {
        outcome.value = value;
        outcome.action = action;
    }
    if (outcome.value === -1) break;
  }
  return outcome;
}
