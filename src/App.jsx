import { useReducer } from "react";
import "./App.css";
import Cell from "./components/Cell.jsx";
import player from "./functions/player.js"

const initialPlayer = 1;

function handleCellClick(state, action) {
  console.log("in handleCellClick, state.grid[action.index]: ", state.grid[action.index]);
  if (state.grid[action.index] !== 0) {
    return state;
  }
  const newGrid = [...state.grid];
  const nextPlayer = player(state.grid);

  newGrid[action.index] = nextPlayer;
  return { grid: newGrid, player: nextPlayer };
}

const initialGrid = Array.from({ length: 9 }).fill(0);

function App() {
  const [state, dispatcher] = useReducer(handleCellClick, { grid: initialGrid });

  const cells = state.grid.map((cell, index) => <Cell key={index} value={cell} index={index} onClick={dispatcher} />);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 border border-white ">{cells}</div>
    </div>
  );
}

export default App;
