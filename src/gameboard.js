// 10x10 x:A-J y: 1-10
class Gameboard {
  static rowSize = 10;
  static colSize = 10;
  constructor() {
    this.shipPositions = [];
    this.hitPositions = [];
    this.ships = [];
  }

  place(ship) {
    if (this._checkValidShipPosition(ship)) {
      ship.positions.forEach((position) => this.shipPositions.push(position));
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
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getRowValue(placedPos) < stored) {
        return this._getRowValue(placedPos);
      }
    }, Infinity);
  }
  _minColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getColValue(placedPos) < stored) {
        return this._getColValue(placedPos);
      }
    }, Infinity);
  }
  _maxRowValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getRowValue(placedPos) > stored) {
        return this._getRowValue(placedPos);
      }
    }, -Infinity);
  }
  _maxColValue(ship) {
    return ship.positions.reduce((stored, placedPos) => {
      if (this._getColValue(placedPos) > stored) {
        return this._getColValue(placedPos);
      }
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
      if (newRowValue > Gameboard.rowSize || newRowValue < 1) {
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
      if (newColValue > Gameboard.colSize || newColValue < 1) {
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
    return !newShip.positions.some((newPos) => {
      let newRowValue = this._getRowValue(newPos);
      let newColValue = this._getColValue(newPos);

      // get min + max value of row and col for each ship and check if the new position values are within them +-1
      return this.ships.some((placedShip) => {
        let minRowValue = this._minColValue(placedShip);
        let maxRowValue = this._maxRowValue(placedShip);
        let minColValue = this._minColValue(placedShip);
        let maxColValue = this._maxColValue(placedShip);

        if (
          !(
            newRowValue >= minRowValue - 1 &&
            newRowValue <= maxRowValue + 1 &&
            newColValue >= minColValue - 1 &&
            newColValue <= maxColValue + 1
          )
        ) {
          return true;
        }
        return false;
      });
    });
  }

  receiveAttack(pos) {
    if (!this.hitPositions.includes(pos)) {
      this.hitPositions.push(pos);
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].positions.includes(pos)) {
          this.ships[i].hit(pos);
          break;
        }
      }
      return true;
    }
    return false;
  }
}

export { Gameboard };
