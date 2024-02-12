/**
 * 
 * @param {[int]} grid current state of game board
 * @param {int} action index of cell for move to be made
 * @param {int} nextPlayer which player is making the move
 * @returns {[int]} updated grid after move
 */
export default function actionResult(grid, action, nextPlayer) {
    const newGrid = [...grid];
    newGrid[action] = nextPlayer;
    return newGrid;
}