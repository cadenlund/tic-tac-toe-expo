// Status.js — the banner that sits above the board.
//
// Renders three sections:
//   1. Turn banner — shows whose turn it is, or the winner / draw result.
//   2. Score tracker — running tally of X wins, O wins, and draws.
//   3. "New Round" button — resets the board but keeps the score.

import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * @param {object} props
 * @param {'X'|'O'|null} props.winner  winning player, or null
 * @param {boolean} props.isDraw
 * @param {boolean} props.xIsNext      whose turn it is when there's no winner
 * @param {{ X: number, O: number, draws: number }} props.score
 * @param {() => void} props.onReset   clears the board but keeps the score
 */
export default function Status({ winner, isDraw, xIsNext, score, onReset }) {
  // ── Determine the banner text and style based on game state ──
  let bannerText;
  let bannerStyle = styles.bannerText;

  if (winner) {
    // Game over — announce the winner
    bannerText = `${winner} wins! 🎉`;
    bannerStyle = [styles.bannerText, winner === 'X' ? styles.textX : styles.textO];
  } else if (isDraw) {
    // All cells filled, no winner
    bannerText = "It's a draw! 🤝";
    bannerStyle = [styles.bannerText, styles.textDraw];
  } else {
    // Game in progress — show whose turn it is
    const currentPlayer = xIsNext ? 'X' : 'O';
    bannerText = `${currentPlayer}'s turn`;
    bannerStyle = [
      styles.bannerText,
      xIsNext ? styles.textX : styles.textO,
    ];
  }

  // Game is over when there's a winner or a draw
  const gameOver = winner || isDraw;

  return (
    <View style={styles.container}>
      {/* ── 1. Turn / Result Banner ── */}
      <Text style={bannerStyle}>{bannerText}</Text>

      {/* ── 2. Score Tracker ── */}
      <View style={styles.scoreRow}>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreLabel, styles.textX]}>X</Text>
          <Text style={styles.scoreValue}>{score.X}</Text>
        </View>

        <View style={styles.scoreDivider} />

        <View style={styles.scoreItem}>
          <Text style={[styles.scoreLabel, styles.textDraw]}>Draw</Text>
          <Text style={styles.scoreValue}>{score.draws}</Text>
        </View>

        <View style={styles.scoreDivider} />

        <View style={styles.scoreItem}>
          <Text style={[styles.scoreLabel, styles.textO]}>O</Text>
          <Text style={styles.scoreValue}>{score.O}</Text>
        </View>
      </View>

      {/* ── 3. New Round Button (visible only when the round is over) ── */}
      {gameOver && (
        <Pressable
          onPress={onReset}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.resetButtonPressed,
          ]}
        >
          <Text style={styles.resetButtonText}>New Round</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 16,
  },

  // ── Banner ──
  bannerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0', // slate-200 neutral fallback
  },
  textX: {
    color: '#2dd4bf', // teal-400 — matches App.js markX
  },
  textO: {
    color: '#fbbf24', // amber-400 — matches App.js markO
  },
  textDraw: {
    color: '#94a3b8', // slate-400
  },

  // ── Score tracker ──
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  scoreItem: {
    alignItems: 'center',
    gap: 2,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  scoreDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#334155', // slate-700
  },

  // ── New Round button ──
  resetButton: {
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1e293b', // slate-800
    borderWidth: 1,
    borderColor: '#475569', // slate-600
  },
  resetButtonPressed: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
});

