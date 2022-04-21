import { Ship } from "../ship";
import { Gameboard } from "../gameboard";

it("places ships", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"]);
  expect(gameboard.placeLogically(ship)).toBe(true);
});

it("doesn't allow overlapping ships", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"]);
  gameboard.placeLogically(ship);
  let ship2 = new Ship(["2:1", "1:1"]);
  expect(gameboard.placeLogically(ship2)).toBe(false);
});

it("add position method works for row", () => {
  expect(Gameboard.addToPosition("1:2", "row", 3)).toBe("4:2");
});

it("add position method works for column", () => {
  expect(Gameboard.addToPosition("1:2", "col", 3)).toBe("1:5");
});

it("doesn't allow ships to be placed 1 space next to an existing one", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"]);
  gameboard.placeLogically(ship);
  let ship2 = new Ship(["2:1", "3:1"]);
  expect(gameboard.placeLogically(ship2)).toBe(false);
});

it("receiveAttack adds to hitPositions without duplicate", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"]);
  gameboard.placeLogically(ship);
  gameboard.receiveAttack("1:1");
  expect(gameboard.hitPositions).toStrictEqual(["1:1"]);
});

it("ship receives hit", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"]);
  // mock function in order to check if hit was run
  ship.hit = jest.fn();
  gameboard.placeLogically(ship);
  gameboard.receiveAttack("1:1");
  expect(ship.hit).toHaveBeenCalled();
});

it("ship doesn't mark when not hit", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5"]);
  gameboard.placeLogically(ship);
  gameboard.receiveAttack("1:6");
  expect(ship.hitPositions).toStrictEqual([]);
});

it("ship doesn't allow duplicate hits", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5"]);
  gameboard.placeLogically(ship);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("1:5");
  expect(ship.hitPositions).toStrictEqual(["1:5"]);
});

it("allows multiple ships to be placed if valid", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5", "1:6"]);
  let ship2 = new Ship(["3:5", "3:6"]);
  gameboard.placeLogically(ship);
  // expect(gameboard.ships).toStrictEqual([ship, ship2]);
  expect(gameboard.placeLogically(ship2)).toBe(true);
});

it("gives minimum row value correctly", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5", "2:5"]);
  expect(gameboard._minRowValue(ship)).toBe(1);
});

it("allSunk method returns true correctly", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5", "1:6"]);
  let ship2 = new Ship(["3:5", "3:6"]);
  gameboard.placeLogically(ship);
  gameboard.placeLogically(ship2);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("1:6");
  gameboard.receiveAttack("3:5");
  gameboard.receiveAttack("3:6");
  expect(gameboard.allSunk()).toBe(true);
});

it("allSunk method returns false correctly", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:5", "1:6"]);
  let ship2 = new Ship(["3:5", "3:6"]);
  gameboard.placeLogically(ship);
  gameboard.placeLogically(ship2);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("3:5");
  expect(gameboard.allSunk()).toBe(false);
});

it("finds correct grid row", () => {
  expect(Gameboard.findGridRow(7, 3)).toBe(3);
});

it("finds correct grid column", () => {
  expect(Gameboard.findGridCol(7, 3, 3)).toBe(2);
});

it("finds correct grid nr", () => {
  expect(Gameboard.findGridNr(3, 3, 2)).toBe(7);
});

it("find correct position from grid number", () => {
  expect(Gameboard.findPositionFromGridNr(7, 3)).toBe("3:2");
});

it("removes correct ship logically", () => {
  let gameboard = new Gameboard();
  let ship = new Ship(["1:1", "1:2"], "P");
  let ship2 = new Ship(["3:1", "3:2", "3:3"], "S");
  gameboard.placeLogically(ship);
  gameboard.placeLogically(ship2);
  gameboard.removeShipLogically("P");
  expect(gameboard.ships).toStrictEqual([ship2]);
});
