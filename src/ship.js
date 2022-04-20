class Ship {
  // positions = ["1:1", "1:2" , "1:3"] "row:col"
  constructor(shipLength, positions) {
    this.shipLength = shipLength;
    this.positions = positions;
    this.hitPositions = [];
    this.sunk = false;
  }

  hit(position) {
    if (
      this.positions.includes(position) &&
      !this.hitPositions.includes(position)
    ) {
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
