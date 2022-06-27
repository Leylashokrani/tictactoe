// ** Offline Game Logic

function Move() {
  this.row = -1;
  this.col = -1;
}

let player = "CPU",
  opponent = "Player";

export function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] === "_") return true;

  return false;
}

// This is the evaluation function
function evaluate(b) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
      if (b[row][0] === player) return +10;
      else if (b[row][0] === opponent) return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
      if (b[0][col] === player) return +10;
      else if (b[0][col] === opponent) return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    if (b[0][0] === player) return +10;
    else if (b[0][0] === opponent) return -10;
  }

  if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    if (b[0][2] === player) return +10;
    else if (b[0][2] === opponent) return -10;
  }

  // Else if none of them have
  // won then return 0
  return 0;
}

// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board
function minimax(board, depth, isMax) {
  let score = evaluate(board);

  // If Maximizer has won the game
  // return his/her evaluated score
  if (score === 10) return score;

  // If Minimizer has won the game
  // return his/her evaluated score
  if (score === -10) return score;

  // If there are no more moves and
  // no winner then it is a tie
  if (isMovesLeft(board) === false) return 0;

  // If this maximizer's move
  if (isMax) {
    let best = -1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === "_") {
          // Make the move
          board[i][j] = player;

          // Call minimax recursively
          // and choose the maximum value
          best = Math.max(best, minimax(board, depth + 1, !isMax));

          // Undo the move
          board[i][j] = "_";
        }
      }
    }
    return best;
  }

  // If this minimizer's move
  else {
    let best = 1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === "_") {
          // Make the move
          board[i][j] = opponent;

          // Call minimax recursively and
          // choose the minimum value
          best = Math.min(best, minimax(board, depth + 1, !isMax));

          // Undo the move
          board[i][j] = "_";
        }
      }
    }
    return best;
  }
}

// This will return the best possible
// move for the player
export function findBestMove(board) {
  let bestVal = -1000;
  let bestMove = new Move();
  bestMove.row = -1;
  bestMove.col = -1;

  // Traverse all cells, evaluate
  // minimax function for all empty
  // cells. And return the cell
  // with optimal value.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (board[i][j] === "_") {
        // Make the move
        board[i][j] = player;

        // compute evaluation function
        // for this move.
        let moveVal = minimax(board, 0, false);

        // Undo the move
        board[i][j] = "_";

        // If the value of the current move
        // is more than the best value, then
        // update best
        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }

  return bestMove;
}

// randomly chooses an empty panel in the board and passes it back
export function makeRandomMove(board) {
  while (true) {
    // randomly generates a row and a column
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    if (board[row][col] === "_") return { row: row, col: col };
  }
}

function checkRow(board, lastMove) {
  return (
    board[lastMove.row][lastMove.col] ===
      board[lastMove.row][(lastMove.col + 1) % 3] &&
    board[lastMove.row][lastMove.col] ===
      board[lastMove.row][(lastMove.col + 2) % 3]
  );
}

function checkCol(board, lastMove) {
  return (
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 1) % 3][lastMove.col] &&
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 2) % 3][lastMove.col]
  );
}

function checkAscDiagonal(board, lastMove) {
  return (
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 1) % 3][(lastMove.col + 1) % 3] &&
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 2) % 3][(lastMove.col + 2) % 3]
  );
}

function checkDescDiagonal(board, lastMove) {
  return (
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 1) % 3][(lastMove.col + 2) % 3] &&
    board[lastMove.row][lastMove.col] ===
      board[(lastMove.row + 2) % 3][(lastMove.col + 4) % 3]
  );
}

export function checkForWin(board, lastMove) {
  if (lastMove.row === 1 || lastMove.col === 1) {
    if (lastMove.row === 1 && lastMove.col === 1) {
      if (
        checkCol(board, lastMove) ||
        checkRow(board, lastMove) ||
        checkAscDiagonal(board, lastMove) ||
        checkDescDiagonal(board, lastMove)
      )
        return true;
    } else {
      if (checkCol(board, lastMove) || checkRow(board, lastMove)) return true;
    }
  } else {
    if (lastMove.row === 0) {
      if (lastMove.col === 0) {
        if (
          checkCol(board, lastMove) ||
          checkRow(board, lastMove) ||
          checkAscDiagonal(board, lastMove)
        )
          return true;
      } else {
        if (
          checkCol(board, lastMove) ||
          checkRow(board, lastMove) ||
          checkDescDiagonal(board, lastMove)
        )
          return true;
      }
    } else {
      if (lastMove.col === 2) {
        if (
          checkCol(board, lastMove) ||
          checkRow(board, lastMove) ||
          checkAscDiagonal(board, lastMove)
        )
          return true;
      } else {
        if (
          checkCol(board, lastMove) ||
          checkRow(board, lastMove) ||
          checkDescDiagonal(board, lastMove)
        )
          return true;
      }
    }
  }
  //   console.log(false);
  return false;
}
