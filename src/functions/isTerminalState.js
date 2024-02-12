import {winLines} from "../constants/constants.js"

/**
 * 
 * @param {[int]} grid current state of game grid
 * @returns true if grid is in a terminal state (there is a winning line or all cells are occupied), otherwise false
 */
export default function isTerminalState (grid) {
    for (let winLine of winLines) {
        if (grid[winLine[0]] === grid[winLine[1]] && grid[winLine[1]] === grid[winLine[2]] && grid[winLine[0]] !== 0) {
            return true;
        }
    }
    const emptyCells = grid.filter(value => value === 0);
    return emptyCells.length > 0 ? false : true;
}