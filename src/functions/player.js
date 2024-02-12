/**
 * determines which player moves next
 * @param {[int]} grid the current state of the board grid
  * @return {int} a string representing the next player to move
 */
export default function player(grid) {
  // count how many moves each player has made
  const counts = grid.reduce(
    (counts, currentValue) => {
      if (currentValue === 1) counts.firstMover++;
      if (currentValue === -1) counts.secondMover++;
      return counts;
    },
    { firstMover: 0, secondMover: 0 }
  );

  if (counts.firstMover === counts.secondMover) return 1;
  return -1;
}
