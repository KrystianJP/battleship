// 10x10 x:A-J y: 1-10
class Gameboard {
  constructor() {
    this.hitPositions = [];
    this.ships = [];
  }

  place(ship) {
    if (this._checkValidShipPosition(ship)) {
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  _getRowValue(pos) {
    return Number(pos.substring(0, pos.indexOf(":")));
  }

  _getColValue(pos) {
    return Number(pos.substring(pos.indexOf(":") + 1));
  }

  _minRowValue(ship) {
    let minimum = ship.positions.reduce((stored, placedPos) => {
      if (this._getRowValue(placedPos) < stored) {
        return this._getRowValue(placedPos);
      }
      return stored;
    }, Infinity);
    return minimum;
  }
  _minColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getColValue(placedPos) < stored) {
        return this._getColValue(placedPos);
      }
      return stored;
    }, Infinity);
  }
  _maxRowValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getRowValue(placedPos) > stored) {
        return this._getRowValue(placedPos);
      }
      return stored;
    }, -Infinity);
  }
  _maxColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getColValue(placedPos) > stored) {
        return this._getColValue(placedPos);
      }
      return stored;
    }, -Infinity);
  }

  // direction = "row" / "col"
  // pos = "row:col"
  _addToPosition(pos, direction, val) {
    if (direction === "row") {
      // getting first number
      let rowValue = this._getRowValue(pos);
      let newRowValue = rowValue + val;
      // making sure it is within range
      if (newRowValue > 10 || newRowValue < 1) {
        throw new Error(
          "Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE",
        );
      }
      // concatenating to it the rest of the position
      return String(newRowValue) + pos.substring(pos.indexOf(":"));
    } else if (direction === "col") {
      // this is the reverse of the row branch
      let colValue = this._getColValue(pos);
      let newColValue = colValue + val;
      if (newColValue > 10 || newColValue < 1) {
        throw new Error(
          "Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE",
        );
      }
      return pos.substring(0, pos.indexOf(":") + 1) + String(newColValue);
    } else {
      throw new TypeError("INVALID DIRECTION PARAMETER");
    }
  }

  // checks if ship's position is valid by checking it is near or overlapping existing ship
  _checkValidShipPosition(newShip) {
    // gives true if a single value is invalid, so must be inverted
    return !newShip.positions.some((newPos) => {
      let newRowValue = this._getRowValue(newPos);
      let newColValue = this._getColValue(newPos);

      // get min + max value of row and col for each ship and check if the new position values are within them +-1
      // if a single value is INVALID, return TRUE
      return this.ships.some((placedShip) => {
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

  _findGridRow(nr, cols) {
    return Math.floor(nr / cols) + 1;
  }

  _findGridCol(nr, row, cols) {
    return nr - (row - 1) * cols + 1;
  }

  // row and col starting from 1
  _findGridNr(cols, row, col) {
    return cols * (row - 1) + (col - 1);
  }

  // DOM manipulation
  // placing the ship visually on given grid
  placeInGrid(grid, ship) {
    let shipLength = ship.positions.length;
    ship.positions.forEach((pos) => {
      let gridNr = this._findGridNr(
        10,
        this._getRowValue(pos),
        this._getColValue(pos),
      );
      let gridNode = grid.children[gridNr];
      gridNode.classList.add("ship");
      gridNode.setAttribute("id", "ship" + String(shipLength));
    });
  }

  static markHit(grid, gridNr) {
    let gridNode = grid.children[gridNr];
    gridNode.classList.add("hit");
  }
}

export { Gameboard };
