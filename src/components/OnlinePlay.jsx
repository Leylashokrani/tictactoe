// React Imports
import { useEffect } from "react";

// ** Material UI Imports
import { Stack, Typography } from "@mui/material";

// ** Parse Import
import Parse from "parse";

// ** User Components
import GameBoard from "./GameBoard";

// ** Styled Components
import { FormButton } from "./styledComponents";

// ** Offline Play Component
const OnlinePlay = ({ gameId, results, user, end, setEnd }) => {
  // ** Game Board List Hook
  const board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  // ** Update User's Match History
  const updateHistory = async () => {
    const query = new Parse.Query("User");
    let opponent;
    try {
      if (results[0].attributes.createBy === user) {
        opponent = await query.get(results[0].attributes.opponent);
      } else {
        opponent = await query.get(results[0].attributes.createBy);
      }

      console.log(opponent);
      const self = Parse.User.current();
      console.log(self);
      self.set("history", [
        {
          date: new Date(),
          opponent: opponent.attributes.username,
          result:
            results[0].attributes.winner === self.id
              ? "Win"
              : results[0].attributes.winner === "Draw"
              ? "Draw"
              : "Loss",
        },
        ...self.attributes.history,
      ]);
      try {
        await self.save();
        setEnd(true);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ** Automatically update history on game End
  useEffect(() => {
    if (
      results &&
      results.length > 0 &&
      results[0].attributes.winner !== "" &&
      !end
    ) {
      updateHistory();
    }
  });

  // ** Handle Player's Turn on the Board
  const handlePlayerTurn = async (panel, rowIndex, panelIndex) => {
    if (
      panel === "_" &&
      results &&
      results.length > 0 &&
      results[0].attributes.turn === user &&
      results[0].attributes.winner === ""
    ) {
      console.log("ok");
      const res = await Parse.Cloud.run("makeMove", {
        gameId: gameId,
        userId: user,
        move: `gameBoard${rowIndex}${panelIndex}`,
      });
      console.log(res);
    }
  };

  // ** JSX render for game board
  return (
    <Stack my={"5rem"} direction={"column"} spacing={6} alignItems={"center"}>
      <Typography variant="h2" color={"#ffffff"} fontFamily={"Lobster"}>
        Online Play
      </Typography>
      {results && results.length > 0 && results[0].attributes.turn !== "" && (
        <Typography
          variant="h5"
          color={"#ffffff"}
          visibility={
            results && results.length > 0 && results[0].attributes.winner
              ? "hidden"
              : "visible"
          }
        >
          {results && results.length > 0 && results[0].attributes.turn === user
            ? "Your"
            : "Opponent's"}{" "}
          Turn
        </Typography>
      )}

      <GameBoard
        board={
          results && results.length > 0
            ? [
                [
                  results[0].attributes.gameBoard00,
                  results[0].attributes.gameBoard01,
                  results[0].attributes.gameBoard02,
                ],
                [
                  results[0].attributes.gameBoard10,
                  results[0].attributes.gameBoard11,
                  results[0].attributes.gameBoard12,
                ],
                [
                  results[0].attributes.gameBoard20,
                  results[0].attributes.gameBoard21,
                  results[0].attributes.gameBoard22,
                ],
              ]
            : board
        }
        player={results && results.length > 0 && results[0].attributes.createBy}
        opponent={
          results && results.length > 0 && results[0].attributes.opponent
        }
        handlePlayerTurn={handlePlayerTurn}
      />
      <Typography
        variant="h5"
        color={"#ffffff"}
        visibility={
          results && results.length > 0 && results[0].attributes.winner
            ? "visible"
            : "hidden"
        }
      >
        {results && results.length > 0 && results[0].attributes.winner === user
          ? "You Win"
          : results &&
            results.length > 0 &&
            results[0].attributes.winner !== "Draw"
          ? "You Lost"
          : "Draw"}
        !
      </Typography>
      {(!results || !results.length > 0 || end) && (
        <FormButton
          variant="contained"
          color="secondary"
          onClick={() => window.location.assign("/online")}
        >
          Play Again
        </FormButton>
      )}
    </Stack>
  );
};

export default OnlinePlay;
