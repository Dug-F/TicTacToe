import { useReducer } from "react";
import "./App.css";
import Cell from "./components/Cell.jsx";
import player from "./functions/player.js";
import isTerminalState from "./functions/isTerminalState.js";
import maxValue from "./functions/maxValue.js";
import minValue from "./functions/minValue.js";

const initialPlayer = 1;

function handleCellClick(state, action) {
  if (state.grid[action.index] !== 0) {
    return state;
  }

  const newGrid = [...state.grid];

  if (action.type === "player") {
    newGrid[action.index] = player(state.grid);
  }

  if (!isTerminalState(newGrid)) {
    const nextPlayer = player(newGrid);
    const outcome = nextPlayer === 1 ? maxValue(newGrid) : minValue(newGrid);
    newGrid[outcome.action] = nextPlayer;
  }

  return { grid: newGrid };
}

const initialGrid = Array.from({ length: 9 }).fill(0);

function App() {
  const [state, dispatcher] = useReducer(handleCellClick, { grid: initialGrid });

  function handleComputerFirstClick() {
    dispatcher({ index: 0, type: "computer" });
  }

  const cells = state.grid.map((cell, index) => <Cell key={index} value={cell} index={index} onClick={dispatcher} />);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid grid-cols-3 border border-white ">{cells}</div>
      {/* <button className="text-white mt-10 bg-blue-700 rounded-full border border-white p-3 hover:bg-blue-600 active:bg-blue-800" onClick={handleComputerFirstClick}>
        Computer first
      </button> */}
    </div>
  );
}

export default App;
