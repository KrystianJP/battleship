class Player {
  // isHuman = true / false
  constructor(isHuman, gameboard) {
    this.isHuman = isHuman;
    this.gameboard = gameboard;
  }

  _humanAttack(otherPlayer, pos) {
    otherPlayer.gameboard.receiveAttack(pos);
  }

  // returns eventual attacked position
  _computerAttack(otherPlayer) {
    do {
      let [randomNr1, randomNr2] = this._randomPair();
      var position = String(randomNr1) + ":" + String(randomNr2);
    } while (!otherPlayer.gameboard.receiveAttack(position));
    return position;
  }

  _randomPair() {
    let randomNr1 = Math.floor(Math.random() * 10) + 1;
    let randomNr2 = Math.floor(Math.random() * 10) + 1;
    return [randomNr1, randomNr2];
  }

  // returns the position that was attacked
  attack(otherPlayer, pos = undefined) {
    if (this.isHuman) {
      this._humanAttack(otherPlayer, pos);
      return pos;
    } else {
      return this._computerAttack(otherPlayer);
    }
  }
}

export { Player };
