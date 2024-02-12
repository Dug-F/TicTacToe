import {winLines} from "../constants/constants.js"

/**
 * 
 * @param {[int]} grid current state of the grid
 * @returns 1 if winLine is 1s, -1 if winLine is -1s, otherwise 0
 */
export default function terminalStateValue(grid) {
    for (let winLine of winLines) {
        if (grid[winLine[0]] === grid[winLine[1]] && grid[winLine[1]] === grid[winLine[2]] && grid[winLine[0]] !== 0) {
        return grid[winLine[0]];
        }
    }
    return 0;
}