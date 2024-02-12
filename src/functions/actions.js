/**
 * 
 * @param {[int]} grid the current state of the game grid
 * @return{[int]} an array of potential next moves
 */
export default function actions(grid) {
    return grid.map((cellValue, index) => cellValue === 0 ? index : -1)
               .filter(value => value >= 0);
}