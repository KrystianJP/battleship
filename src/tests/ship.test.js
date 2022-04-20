import * as shipFile from "../ship";
import * as gameboardFile from "../gameboard";

it("ship marks position as hit when hit", () => {
  let ship = new shipFile.Ship(1, ["1:5"]);
  ship.hit("1:5");
  expect(ship.hitPositions).toStrictEqual(["1:5"]);
});

it("ship doesn't mark when not hit", () => {
  let ship = new shipFile.Ship(1, ["1:5"]);
  ship.hit("1:6");
  expect(ship.hitPositions).toStrictEqual([]);
});

it("ship checks if ship is sunk", () => {
  let ship = new shipFile.Ship(1, ["1:5"]);
  ship.hit("1:5");
  expect(ship.isSunk()).toBe(true);
});

it("ship doesn't allow duplicate hits", () => {
  let ship = new shipFile.Ship(1, ["1:5"]);
  ship.hit("1:5");
  ship.hit("1:5");
  expect(ship.hitPositions).toStrictEqual(["1:5"]);
});
