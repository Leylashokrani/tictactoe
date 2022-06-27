// ** Material UI Imports
import { Stack } from "@mui/material";

// ** User Components
import BoardPanel from "./BoardPanel";

// ** Game Board Component
const GameBoard = ({ board, handlePlayerTurn, player, opponent }) => {
  // ** JSX render for game board
  return (
    <Stack direction={"column"} spacing={2}>
      {board.map((row, rowIndex) => (
        <Stack key={rowIndex} direction={"row"} spacing={2}>
          {row.map((panel, panelIndex) => (
            <BoardPanel
              key={`${rowIndex}-${panelIndex}`}
              symbol={panel}
              player={player}
              opponent={opponent}
              onClick={() => handlePlayerTurn(panel, rowIndex, panelIndex)}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default GameBoard;
