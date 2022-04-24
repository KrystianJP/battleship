import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

class Player {
  // isHuman = true / false
  constructor(isHuman, gameboard) {
    this.isHuman = isHuman;
    this.gameboard = gameboard;
  }

  humanAttack(otherPlayer, pos) {
    otherPlayer.gameboard.receiveAttack(pos);
    return pos;
  }

  // returns eventual attacked position
  computerAttack(otherPlayer, otherGrid = undefined) {
    let useAi = false;
    if (otherGrid) {
      let gridCells = otherGrid.querySelectorAll(".grid-cell");
      for (let i = 0; i < gridCells.length; i++) {
        if (
          gridCells[i].classList.contains("ship") &&
          gridCells[i].classList.contains("hit") &&
          !gridCells[i].classList.contains("sunk")
        ) {
          useAi = true;
          break;
        }
      }
    }
    if (!useAi) {
      let sunkShips = otherPlayer.gameboard.ships.filter((ship) =>
        ship.isSunk(),
      );
      do {
        let [randomNr1, randomNr2] = this._randomPair();
        var position = String(randomNr1) + ":" + String(randomNr2);
        var valid = otherPlayer.gameboard.checkValidPosition(
          position,
          sunkShips,
        );
      } while (!valid || !otherPlayer.gameboard.receiveAttack(position));
      return position;
    } else {
      let position = this.aiChooseHit(
        otherGrid.querySelectorAll(".grid-cell"),
        otherPlayer,
      );
      otherPlayer.gameboard.receiveAttack(position);
      return position;
    }
  }

  _randomPair() {
    let randomNr1 = Math.floor(Math.random() * 10) + 1;
    let randomNr2 = Math.floor(Math.random() * 10) + 1;
    return [randomNr1, randomNr2];
  }

  // this methods requires both gameboard and ship classes
  randomShipPosition(shipLength, shipId) {
    let positions;

    while (true) {
      positions = [];
      let startPos =
        String(Math.floor(Math.random() * 9) + 1) +
        ":" +
        String(Math.floor(Math.random() * 9) + 1);
      let direction = ["col", "row"][Math.floor(Math.random() * 2)];
      for (let i = 0; i < shipLength; i++) {
        positions.push(Gameboard.addToPosition(startPos, direction, i));
      }
      if (positions.some((pos) => pos === false)) {
        continue;
      }
      break;
    }
    let ship = new Ship(positions, shipId);
    if (this.gameboard.checkValidShipPosition(ship)) {
      return ship;
    }
    return false;
  }

  // under the assumption that there is an existing hit
  aiChooseHit(oppGridCells, opponent) {
    let sunkShips = opponent.gameboard.ships.filter((ship) => ship.isSunk());
    let shipHits = opponent.gameboard.hitPositions.filter((pos) => {
      for (let i = 0; i < opponent.gameboard.ships.length; i++) {
        if (
          !opponent.gameboard.ships[i].isSunk() &&
          opponent.gameboard.ships[i].positions.includes(pos)
        ) {
          return true;
        }
      }
      return false;
    });

    let positions = [];
    if (shipHits.length === 1) {
      // check all cells adjacent
      let left = Gameboard.addToPosition(shipHits[0], "col", -1);
      let right = Gameboard.addToPosition(shipHits[0], "col", 1);
      let top = Gameboard.addToPosition(shipHits[0], "row", -1);
      let bottom = Gameboard.addToPosition(shipHits[0], "row", 1);
      let adjacent = [left, right, top, bottom];
      adjacent.forEach((pos) => {
        if (pos) {
          let cell = oppGridCells[Gameboard.findGridNrFromPosition(pos, 10)];
          if (
            !cell.classList.contains("hit") &&
            opponent.gameboard.checkValidPosition(pos, sunkShips)
          ) {
            positions.push(pos);
          }
        }
      });
    } else if (shipHits.length > 1) {
      let direction;
      if (
        shipHits[0] === Gameboard.addToPosition(shipHits[1], "row", 1) ||
        shipHits[0] === Gameboard.addToPosition(shipHits[1], "row", -1)
      ) {
        direction = "row";
      } else {
        direction = "col";
      }

      shipHits.forEach((pos) => {
        let behind = Gameboard.addToPosition(pos, direction, -1);
        let front = Gameboard.addToPosition(pos, direction, 1);
        // check if behind is valid
        if (
          behind &&
          !oppGridCells[
            Gameboard.findGridNrFromPosition(behind, 10)
          ].classList.contains("hit") &&
          opponent.gameboard.checkValidPosition(behind, sunkShips)
        ) {
          positions.push(behind);
        } else if (
          front &&
          !oppGridCells[
            Gameboard.findGridNrFromPosition(front, 10)
          ].classList.contains("hit") &&
          opponent.gameboard.checkValidPosition(front, sunkShips)
        ) {
          positions.push(front);
        }
      });
    }

    return positions[Math.floor(Math.random() * positions.length)];
  }
}

export { Player };
