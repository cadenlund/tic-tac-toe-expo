// game.test.js — unit tests for game logic
//
// Run:  npx jest game.test.js
//
// These tests verify applyMove validation, getWinner detection across all 8
// winning lines, and isDraw detection.

import { getWinner, applyMove, isDraw } from './game';

const EMPTY = Array(9).fill(null);

// ─── getWinner ──────────────────────────────────────────────────────────────

describe('getWinner', () => {
  test('returns null for an empty board', () => {
    expect(getWinner(EMPTY)).toBeNull();
  });

  test('detects top row win', () => {
    const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    const result = getWinner(board);
    expect(result).toEqual({ player: 'X', line: [0, 1, 2] });
  });

  test('detects middle row win', () => {
    const board = [null, null, null, 'O', 'O', 'O', 'X', 'X', null];
    expect(getWinner(board)).toEqual({ player: 'O', line: [3, 4, 5] });
  });

  test('detects bottom row win', () => {
    const board = ['O', null, null, null, null, null, 'X', 'X', 'X'];
    expect(getWinner(board)).toEqual({ player: 'X', line: [6, 7, 8] });
  });

  test('detects left column win', () => {
    const board = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
    expect(getWinner(board)).toEqual({ player: 'O', line: [0, 3, 6] });
  });

  test('detects middle column win', () => {
    const board = [null, 'X', 'O', null, 'X', 'O', null, 'X', null];
    expect(getWinner(board)).toEqual({ player: 'X', line: [1, 4, 7] });
  });

  test('detects right column win', () => {
    const board = [null, null, 'O', 'X', null, 'O', 'X', null, 'O'];
    expect(getWinner(board)).toEqual({ player: 'O', line: [2, 5, 8] });
  });

  test('detects main diagonal win', () => {
    const board = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
    expect(getWinner(board)).toEqual({ player: 'X', line: [0, 4, 8] });
  });

  test('detects anti-diagonal win', () => {
    const board = [null, null, 'O', null, 'O', 'X', 'O', 'X', null];
    expect(getWinner(board)).toEqual({ player: 'O', line: [2, 4, 6] });
  });

  test('returns null when no line is complete', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    // This is a draw board — no three-in-a-row
    expect(getWinner(board)).toBeNull();
  });
});

// ─── applyMove ──────────────────────────────────────────────────────────────

describe('applyMove', () => {
  test('places a mark on an empty cell and returns a new array', () => {
    const next = applyMove(EMPTY, 4, 'X');
    expect(next[4]).toBe('X');
    // Must be a new array, not a mutation of the original
    expect(next).not.toBe(EMPTY);
    expect(EMPTY[4]).toBeNull();
  });

  test('rejects a move on an occupied cell (returns same reference)', () => {
    const board = [null, null, null, null, 'X', null, null, null, null];
    const next = applyMove(board, 4, 'O');
    expect(next).toBe(board); // same reference means rejected
  });

  test('rejects a move after the game is won (returns same reference)', () => {
    const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    const next = applyMove(board, 6, 'O');
    expect(next).toBe(board);
  });

  test('allows moves on remaining cells when no winner yet', () => {
    const board = ['X', null, null, null, 'O', null, null, null, null];
    const next = applyMove(board, 1, 'X');
    expect(next).not.toBe(board);
    expect(next[1]).toBe('X');
  });
});

// ─── isDraw ─────────────────────────────────────────────────────────────────

describe('isDraw', () => {
  test('returns false for an empty board', () => {
    expect(isDraw(EMPTY)).toBe(false);
  });

  test('returns false for a partially filled board', () => {
    const board = ['X', 'O', null, null, 'X', null, null, null, null];
    expect(isDraw(board)).toBe(false);
  });

  test('returns false when all cells filled but someone has won', () => {
    // X wins via top row, but every cell is filled
    const board = ['X', 'X', 'X', 'O', 'O', 'X', 'X', 'O', 'O'];
    expect(isDraw(board)).toBe(false);
  });

  test('returns true when all cells filled and no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(isDraw(board)).toBe(true);
  });
});
