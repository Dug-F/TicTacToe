/**
 * determines whose move is next
 * @param {[string]} grid the current state of the board grid
 * @param {string} firstPlayer which player is to move first if the grid is empty
 * @return {string} a string representing the next player to move
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

  console.log("counts: ", counts);
  if (counts.firstMover === counts.secondMover) return 1;
  return -1;
}
