import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const randomBool = () => Math.random() < chanceLightStartsOn ? true : false;
    const emptyBoard = [...Array(nrows)].map(e => Array(ncols).fill(""));
    let initialBoard = emptyBoard.map(row => row.map(cell => randomBool()));
    return initialBoard;
  }

  function hasWon() {
    // I did something here too
    const off = [...Array(nrows)].map(e => Array(ncols).fill(false));
    for (let i=0; i<board.length; i++) {
      for (let j=0; j<board[i].length; j++) {
        if (board[i][j] !== off[i][j]) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let copy = oldBoard;

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copy);
      if (y > 0) flipCell(y-1, x, copy);
      if (y < nrows) flipCell(y+1, x, copy);
      if (x > 0) flipCell(y, x-1, copy);
      if (x < ncols) flipCell(y, x+1, copy);

      const emptyBoard = [...Array(nrows)].map(e => Array(ncols).fill(""));
      
      // TODO: return the copy
      return emptyBoard.map((row, y)=> row.map((cell, x) => copy[y][x]));
    });

  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if (hasWon()) {
    return (
      <h1>You win!</h1>
    );
  }

  // make table board
  // TODO
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => ( 
          <tr key={y}>{
            row.map((c, x) => 
              <Cell key={`${y}-${x}`} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={c} />
            )
          }</tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;

// i fixed the rerendering issue but I still don't know if I really understand it