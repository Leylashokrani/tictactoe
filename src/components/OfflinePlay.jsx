// ** Material UI Imports
import { Stack, Typography } from "@mui/material";

// ** React Imports
import { useEffect, useState } from "react";

// ** User Components
import GameBoard from "./GameBoard";
import {
  findBestMove,
  makeRandomMove,
  checkForWin,
  isMovesLeft,
} from "./gameLogic";

// ** Offline Play Component
const OfflinePlay = () => {
  // ** Game Board List Hook
  const [board, setBoard] = useState([
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ]);

  // ** Player or CPU Turn Hook
  const [turn, setTurn] = useState(
    Math.floor(Math.random() * 2) === 0 ? "CPU" : "Player"
  );

  // ** CPU Move Count Hook
  const [cpuMoves, SetCpuMoves] = useState(0);

  // ** Winner Hook
  const [winner, setWinner] = useState("");

  // ** Handle Player's Turn on the Board
  const handlePlayerTurn = (panel, rowIndex, panelIndex) => {
    if (panel === "_" && turn === "Player" && winner === "") {
      // checks if panel is empty and if it's Player's turn
      let temp = board;
      temp[rowIndex][panelIndex] = "Player"; // updates the panel on the board to Player
      setBoard(temp);
      if (checkForWin(temp, { row: rowIndex, col: panelIndex }))
        // checks if players last move resulted in a Win
        setWinner("Player");
      else setTurn("CPU"); // changes the Turn into CPU's Turn
    }
  };

  // ** Handle CPU's Turn on the Board
  const handleCpuTurn = () => {
    if (turn === "CPU") {
      let bestMove;
      if (cpuMoves === 0) {
        bestMove = makeRandomMove(board); // makes a random first move
        SetCpuMoves(cpuMoves + 1);
      } else {
        bestMove = findBestMove(board); // finds the best MiniMaxed move available
        SetCpuMoves(cpuMoves + 1);
      }
      if (bestMove.row !== -1 && bestMove.col !== -1) {
        // checks if the best move is a valid move
        setTimeout(() => {
          let temp = board;
          temp[bestMove.row][bestMove.col] = "CPU"; // updates the panel of the best more to CPU
          setBoard(temp);
          if (checkForWin(temp, bestMove))
            // checks if CPU's last move resulted in a Win
            setWinner("CPU");
          if (isMovesLeft(board)) setTurn("Player");
          // checks if there's any moves left and then changes the turn; if not calls the game Draw
          else setWinner("Draw");
        }, 300);
      } else {
        setWinner("Draw"); // updates winner to Draw since there's no moves available
      }
    }
  };
  useEffect(() => {
    handleCpuTurn();
    //eslint-disable-next-line
  }, [turn]);

  // ** JSX render for game board
  return (
    <Stack my={"5rem"} direction={"column"} spacing={6} alignItems={"center"}>
      <Typography variant={"h2"} color={"#ffffff"} fontFamily={"Lobster"}>
        Offline Play
      </Typography>
      <Typography
        variant="h5"
        color={"#ffffff"}
        visibility={winner ? "hidden" : "visible"}
      >
        {turn}'s Turn
      </Typography>
      <GameBoard
        board={board}
        player={"Player"}
        opponent={"CPU"}
        handlePlayerTurn={handlePlayerTurn}
      />
      <Typography
        variant="h5"
        color={"#ffffff"}
        visibility={winner ? "visible" : "hidden"}
      >
        {winner} {winner !== "Draw" && "Wins"}!
      </Typography>
    </Stack>
  );
};

export default OfflinePlay;
