import { Gameboard } from "./gameboard";

class Ship {
  // positions = ["1:1", "1:2" , "1:3"] "row:col"
  // id = "C" / "B" / "D" / "S" / "P"
  constructor(positions, id) {
    this.shipLength = positions.length;
    this.positions = positions;
    this.hitPositions = [];
    this.sunk = false;
    this.id = id;
  }

  // duplicate validation occurs in Gameboard objects
  hit(position) {
    if (this.positions.includes(position)) {
      this.hitPositions.push(position);
      return true;
    }
    return false;
  }

  isSunk() {
    if (this.hitPositions.length === this.shipLength) {
      this.sunk = true;
      return true;
    }
    return false;
  }

  sink(grid) {
    for (let pos of this.positions) {
      let gridNr = Gameboard.findGridNrFromPosition(pos, 10);
      grid.querySelectorAll(".grid-cell")[gridNr].classList.add("sunk");
    }
  }

  findGridNrFromPosition(pos, cols) {
    let row = Gameboard.getRowValue(pos);
    let col = Gameboard.getColValue(pos);
    return Gameboard.findGridNr(cols, row, col);
  }
}

export { Ship };
