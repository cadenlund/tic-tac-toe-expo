// game.js — pure game logic. No React in this file.
//
// TEAMMATE: this file is yours (Trello: "win detection" + "applyMove", one commit).
// App.js already imports all three functions and calls them on every tap, so the
// board goes from dead to playable the moment you fill these in.
//
// Board shape (owned by App.js): a flat array of 9 cells, each 'X' | 'O' | null.
//
//   0 | 1 | 2
//  ---+---+---
//   3 | 4 | 5
//  ---+---+---
//   6 | 7 | 8

/**
 * @param {Array<'X'|'O'|null>} board
 * @returns {{ player: 'X'|'O', line: number[] } | null} the winner plus the three
 *   indexes that won, or null if nobody has won yet. App.js uses `line` to paint
 *   the winning cells green, so it has to come back with the player.
 */
export function getWinner(board) {
  // All 8 possible winning lines: 3 rows, 3 columns, 2 diagonals
  const LINES = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  // Check each line — if all three cells match a non-null player, we have a winner
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }

  return null; // no winner yet
}

/**
 * @param {Array<'X'|'O'|null>} board
 * @param {number} index 0-8, the cell that was tapped
 * @param {'X'|'O'} player
 * @returns {Array<'X'|'O'|null>} a NEW array, or the exact same `board` reference
 *   when the move is illegal (square already taken, or the game is over).
 *   App.js checks `next === board` to decide whether to flip turns, so returning
 *   the same reference on a rejected move matters. Never mutate the input.
 */
export function applyMove(board, index, player) {
  // Reject the move if the game is already won
  if (getWinner(board)) return board;

  // Reject the move if the cell is already occupied
  if (board[index] !== null) return board;

  // Valid move — create a new board array with the player's mark placed
  const next = [...board];
  next[index] = player;
  return next;
}

/**
 * @param {Array<'X'|'O'|null>} board
 * @returns {boolean} true when every square is filled and there is no winner.
 */
export function isDraw(board) {
  // A draw occurs when every cell is filled and nobody has won
  return board.every((cell) => cell !== null) && !getWinner(board);
}
