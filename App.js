import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Status from './Status';
import { applyMove, getWinner, isDraw } from './game';

const EMPTY_BOARD = Array(9).fill(null);
const GAP = 10;

export default function App() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const { width, height } = useWindowDimensions();
  // Keep the board square and inside both axes on anything from an SE to a tablet.
  const boardSize = Math.min(width - 40, height * 0.5, 400);
  const cellSize = (boardSize - GAP * 2) / 3;

  const winner = getWinner(board);
  const draw = isDraw(board);

  function handlePress(index) {
    const player = xIsNext ? 'X' : 'O';
    const next = applyMove(board, index, player);
    // applyMove hands back the same reference when the move is illegal.
    if (next === board) return;

    setBoard(next);
    setXIsNext(!xIsNext);

    // Score off `next`, not `board` — state hasn't flushed yet, and doing it here
    // instead of in an effect means each round can only ever be counted once.
    const nextWinner = getWinner(next);
    if (nextWinner) {
      setScore((s) => ({ ...s, [nextWinner.player]: s[nextWinner.player] + 1 }));
    } else if (isDraw(next)) {
      setScore((s) => ({ ...s, draws: s.draws + 1 }));
    }
  }

  function handleReset() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <Status
        winner={winner ? winner.player : null}
        isDraw={draw}
        xIsNext={xIsNext}
        score={score}
        onReset={handleReset}
      />

      <View style={[styles.board, { width: boardSize, gap: GAP }]}>
        {board.map((value, index) => {
          const isWinning = winner ? winner.line.includes(index) : false;
          return (
            <Pressable
              key={index}
              onPress={() => handlePress(index)}
              style={({ pressed }) => [
                styles.cell,
                { width: cellSize, height: cellSize },
                isWinning && styles.cellWinning,
                pressed && styles.cellPressed,
              ]}
            >
              <Text
                style={[
                  styles.mark,
                  { fontSize: cellSize * 0.52 },
                  value === 'X' ? styles.markX : styles.markO,
                ]}
              >
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellWinning: {
    backgroundColor: '#15803d',
  },
  cellPressed: {
    opacity: 0.6,
  },
  mark: {
    fontWeight: '700',
  },
  markX: {
    color: '#2dd4bf',
  },
  markO: {
    color: '#fbbf24',
  },
});
