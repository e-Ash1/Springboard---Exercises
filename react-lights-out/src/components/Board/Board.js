/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

import React, { useState } from "react";
import Cell from '../Cell/Cell.js';
import '../Board/Board.css';

function Board({ nRows, nCols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard()); // Component Initialization

  function createBoard() {
    // Board Creation
    return new Array(nRows).fill(null).map(() =>
      new Array(nCols).fill(null).map(() => Math.random() < chanceLightStartsOn)
    );
  }

  function hasWon() {
    // Win Condition Check
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    // Flipping Cells
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x, boardCopy); // Flip selected cell
      flipCell(y, x - 1, boardCopy); // Left
      flipCell(y, x + 1, boardCopy); // Right
      flipCell(y - 1, x, boardCopy); // Above
      flipCell(y + 1, x, boardCopy); // Below

      return boardCopy;
    });
  }

  if (hasWon()) {
    // Game Won
    return <div>You've won!</div>;
  }

  // Rendering
  return (
    <table className="Board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${cellIndex}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
