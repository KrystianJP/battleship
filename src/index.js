import * as shipFile from "./ship";
import * as gameboardFile from "./gameboard";
import * as playerFile from "./player";
import "../styles/style.css";

// DOM elements
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

// initial styling
gameGrids.forEach((gameGrid) => {
  gameGrid.style[
    "grid-template-rows"
  ] = `repeat(${gameboardFile.Gameboard.rowSize}, auto)`;
  gameGrid.style[
    "grid-template-columns"
  ] = `repeat(${gameboardFile.Gameboard.colSize}, auto)`;
  // entering all grid items
  for (
    let i = 0;
    i < gameboardFile.Gameboard.rowSize * gameboardFile.Gameboard.colSize;
    i++
  ) {
    gameGrid.appendChild(gridCell.cloneNode(true));
  }
});
