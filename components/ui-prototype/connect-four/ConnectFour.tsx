"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const ROWS = 6;
const COLS = 7;

const EMPTY = null;
const PLAYER_ONE = "P1";
const PLAYER_TWO = "P2";

type Player = typeof PLAYER_ONE | typeof PLAYER_TWO;
type Cell = Player | null;
type Board = Cell[][];

const PLAYERS: Record<Player, { label: string; className: string }> = {
  [PLAYER_ONE]: {
    label: "Player 1",
    className: styles.red,
  },
  [PLAYER_TWO]: {
    label: "Player 2",
    className: styles.yellow,
  },
};

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function getNextPlayer(player: Player): Player {
  return player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
}

function checkWinner(board: Board, row: number, col: number, player: Player): boolean {
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
  ];

  for (const [rowDir, colDir] of directions) {
    let count = 1;

    count += countPieces(board, row, col, rowDir, colDir, player);
    count += countPieces(board, row, col, -rowDir, -colDir, player);

    if (count >= 4) {
      return true;
    }
  }

  return false;
}

function countPieces(board: Board, row: number, col: number, rowDir: number, colDir: number, player: Player): number {
  let count = 0;
  let nextRow = row + rowDir;
  let nextCol = col + colDir;

  while (
    nextRow >= 0 &&
    nextRow < ROWS &&
    nextCol >= 0 &&
    nextCol < COLS &&
    board[nextRow][nextCol] === player
  ) {
    count++;
    nextRow += rowDir;
    nextCol += colDir;
  }

  return count;
}

function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every(Boolean));
}

export default function App() {
  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYER_ONE);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const gameOver = winner || isDraw;

  function handleColumnClick(col: number): void {
    if (gameOver) return;

    const nextBoard = board.map((row) => [...row]);

    let targetRow = -1;

    // Start from bottom row and find the first empty cell.
    for (let row = ROWS - 1; row >= 0; row--) {
      if (nextBoard[row][col] === EMPTY) {
        targetRow = row;
        break;
      }
    }

    // Column is full.
    if (targetRow === -1) return;

    nextBoard[targetRow][col] = currentPlayer;

    if (checkWinner(nextBoard, targetRow, col, currentPlayer)) {
      setBoard(nextBoard);
      setWinner(currentPlayer);
      return;
    }

    if (isBoardFull(nextBoard)) {
      setBoard(nextBoard);
      setIsDraw(true);
      return;
    }

    setBoard(nextBoard);
    setCurrentPlayer(getNextPlayer(currentPlayer));
  }

  function resetGame() {
    setBoard(createBoard());
    setCurrentPlayer(PLAYER_ONE);
    setWinner(null);
    setIsDraw(false);
  }

  return (
    <main className={styles.app}>
      <h1>Connect Four</h1>

      <p className={styles.status}>
        {winner
          ? `${PLAYERS[winner].label} wins!`
          : isDraw
            ? "It's a draw!"
            : `${PLAYERS[currentPlayer].label}'s turn`}
      </p>

      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={styles.cell}
              onClick={() => handleColumnClick(colIndex)}
              aria-label={`Column ${colIndex + 1}`}
            >
              <span
                className={`${styles.disc} ${
                  cell ? PLAYERS[cell].className : ""
                }`}
              />
            </button>
          ))
        )}
      </div>

      <button className={styles.resetButton} onClick={resetGame}>
        Restart Game
      </button>
    </main>
  );
}