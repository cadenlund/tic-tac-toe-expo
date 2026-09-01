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
  return null; // TODO(teammate): LINES = 3 rows + 3 cols + 2 diagonals, then check all 8
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
  return board; // TODO(teammate): validate, then return a new array
}

/**
 * @param {Array<'X'|'O'|null>} board
 * @returns {boolean} true when every square is filled and there is no winner.
 */
export function isDraw(board) {
  return false; // TODO(teammate)
}
