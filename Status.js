// Status.js — the banner that sits above the board.
//
// TEAMMATE: this file is yours (Trello: "turn banner, score tracker, New Round").
// App.js already renders <Status /> with every prop you need — just build the UI.

import { StyleSheet, Text, View } from 'react-native';

/**
 * @param {object} props
 * @param {'X'|'O'|null} props.winner  winning player, or null
 * @param {boolean} props.isDraw
 * @param {boolean} props.xIsNext      whose turn it is when there's no winner
 * @param {{ X: number, O: number, draws: number }} props.score
 * @param {() => void} props.onReset   clears the board but keeps the score
 */
export default function Status({ winner, isDraw, xIsNext, score, onReset }) {
  // TODO(teammate): "X's turn" / "X wins!" / "Draw", the X-O-Draw tally,
  // and a New Round button wired to onReset.
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Status.js — TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  placeholder: {
    color: '#64748b',
    fontSize: 16,
  },
});
