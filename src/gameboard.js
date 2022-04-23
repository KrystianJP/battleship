// 10x10 x:A-J y: 1-10
class Gameboard {
  constructor() {
    this.hitPositions = [];
    this.ships = [];
  }

  placeLogically(ship) {
    if (this.checkValidShipPosition(ship)) {
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  place(grid, ship) {
    if (this.placeLogically(ship)) {
      this.placeInGrid(grid, ship);
      return true;
    }
    return false;
  }

  static getRowValue(pos) {
    return Number(pos.substring(0, pos.indexOf(":")));
  }

  static getColValue(pos) {
    return Number(pos.substring(pos.indexOf(":") + 1));
  }

  _minRowValue(ship) {
    let minimum = ship.positions.reduce((stored, placedPos) => {
      if (Gameboard.getRowValue(placedPos) < stored) {
        return Gameboard.getRowValue(placedPos);
      }
      return stored;
    }, Infinity);
    return minimum;
  }
  _minColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (Gameboard.getColValue(placedPos) < stored) {
        return Gameboard.getColValue(placedPos);
      }
      return stored;
    }, Infinity);
  }
  _maxRowValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (Gameboard.getRowValue(placedPos) > stored) {
        return Gameboard.getRowValue(placedPos);
      }
      return stored;
    }, -Infinity);
  }
  _maxColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (Gameboard.getColValue(placedPos) > stored) {
        return Gameboard.getColValue(placedPos);
      }
      return stored;
    }, -Infinity);
  }

  // direction = "row" / "col"
  // pos = "row:col"
  static addToPosition(pos, direction, val) {
    if (direction === "row") {
      // getting first number
      let rowValue = Gameboard.getRowValue(pos);
      let newRowValue = rowValue + val;
      // making sure it is within range
      if (newRowValue > 10 || newRowValue < 1) {
        return false;
      }
      // concatenating to it the rest of the position
      return String(newRowValue) + pos.substring(pos.indexOf(":"));
    } else if (direction === "col") {
      // this is the reverse of the row branch
      let colValue = Gameboard.getColValue(pos);
      let newColValue = colValue + val;
      if (newColValue > 10 || newColValue < 1) {
        return false;
      }
      return pos.substring(0, pos.indexOf(":") + 1) + String(newColValue);
    } else {
      throw new TypeError("INVALID DIRECTION PARAMETER");
    }
  }

  // checks if ship's position is valid by checking it is near or overlapping existing ship
  checkValidShipPosition(newShip) {
    // gives true if a single value is invalid, so must be inverted
    return !newShip.positions.some((newPos) => {
      return !this.checkValidPosition(newPos);
    });
  }

  checkValidPosition(pos) {
    let newRowValue = Gameboard.getRowValue(pos);
    let newColValue = Gameboard.getColValue(pos);

    // get min + max value of row and col for each ship and check if the new position values are within them +-1
    // if a single value is INVALID, return TRUE
    return !this.ships.some((placedShip) => {
      let minRowValue = this._minRowValue(placedShip);
      let maxRowValue = this._maxRowValue(placedShip);
      let minColValue = this._minColValue(placedShip);
      let maxColValue = this._maxColValue(placedShip);

      if (
        newRowValue >= minRowValue - 1 &&
        newRowValue <= maxRowValue + 1 &&
        newColValue >= minColValue - 1 &&
        newColValue <= maxColValue + 1
      ) {
        // INVALID THEREFORE TRUE
        return true;
      }
      return false;
    });
  }

  // will check if valid position and send the hit, the ship will then check if it is hit
  receiveAttack(pos) {
    if (!this.hitPositions.includes(pos)) {
      this.hitPositions.push(pos);
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].hit(pos)) {
          break;
        }
      }
      return true;
    }
    return false;
  }

  allSunk() {
    if (this.ships.every((ship) => ship.isSunk())) {
      return true;
    }
    return false;
  }

  static findGridRow(nr, cols) {
    return Math.floor(nr / cols) + 1;
  }

  static findGridCol(nr, row, cols) {
    return nr - (row - 1) * cols + 1;
  }

  static findPositionFromGridNr(nr, cols) {
    let row = Gameboard.findGridRow(nr, cols);
    let col = Gameboard.findGridCol(nr, row, cols);
    return String(row) + ":" + String(col);
  }

  // row and col starting from 1
  static findGridNr(cols, row, col) {
    return cols * (row - 1) + (col - 1);
  }

  static findGridNrFromPosition(pos, cols) {
    let row = Gameboard.getRowValue(pos);
    let col = Gameboard.getColValue(pos);
    return Gameboard.findGridNr(cols, row, col);
  }

  // DOM manipulation
  // placing the ship visually on given grid
  placeInGrid(grid, ship) {
    let shipLength = ship.positions.length;
    ship.positions.forEach((pos) => {
      let gridNr = Gameboard.findGridNr(
        10,
        Gameboard.getRowValue(pos),
        Gameboard.getColValue(pos),
      );
      let gridNode = grid.children[gridNr];
      gridNode.classList.add("ship");
      gridNode.setAttribute("id", "ship" + String(ship.id));
    });
  }

  static markHit(grid, gridNr) {
    let gridNode = grid.children[gridNr];
    gridNode.classList.add("hit");
  }

  static checkHit(grid, gridNr) {
    if (grid.children[gridNr].classList.contains("ship")) {
      return true;
    } else {
      return false;
    }
  }

  removeShipLogically(id) {
    this.ships.some((ship) => {
      if (ship.id === id) {
        this.ships.splice(this.ships.indexOf(ship), 1);
        return true;
      }
      return false;
    });
  }

  removeShipFromGrid(grid, id) {
    grid.querySelectorAll(".grid-cell").forEach((cell) => {
      if (cell.id.substring(4) === id) {
        cell.classList.remove("ship");
        return true;
      }
      return false;
    });
  }

  removeShip(grid, id) {
    this.removeShipLogically(id);
    this.removeShipFromGrid(grid, id);
  }

  generateRandomShips(player, grid) {
    for (let shipType of [
      ["C", 5],
      ["B", 4],
      ["D", 3],
      ["S", 3],
      ["P", 2],
    ]) {
      while (true) {
        let ship = player.randomShipPosition(shipType[1], shipType[0]); // ship object / false
        if (ship) {
          this.place(grid, ship);
          break;
        }
      }
    }
  }
}

export { Gameboard };
