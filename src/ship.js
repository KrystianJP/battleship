class Ship {
  static ids = 0;
  // positions = ["1:1", "1:2" , "1:3"] "row:col"
  constructor(positions) {
    this.shipLength = positions.length;
    this.positions = positions;
    this.hitPositions = [];
    this.sunk = false;
    this.id = Ship.ids;
    Ship.ids++;
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
}

export { Ship };
