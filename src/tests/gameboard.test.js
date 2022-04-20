import * as shipFile from "../ship";
import * as gameboardFile from "../gameboard";

it("places ships", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:1", "1:2"]);
  expect(gameboard.place(ship)).toBe(true);
});

it("doesn't allow overlapping ships", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:1", "1:2"]);
  gameboard.place(ship);
  let ship2 = new shipFile.Ship(["2:1", "1:1"]);
  expect(gameboard.place(ship2)).toBe(false);
});

it("add position method works for row", () => {
  let gameboard = new gameboardFile.Gameboard();
  expect(gameboard._addToPosition("1:2", "row", 3)).toBe("4:2");
});

it("add position method works for column", () => {
  let gameboard = new gameboardFile.Gameboard();
  expect(gameboard._addToPosition("1:2", "col", 3)).toBe("1:5");
});

it("doesn't allow ships to be placed 1 space next to an existing one", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:1", "1:2"]);
  gameboard.place(ship);
  let ship2 = new shipFile.Ship(["2:1", "3:1"]);
  expect(gameboard.place(ship2)).toBe(false);
});

it("receiveAttack adds to hitPositions without duplicate", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:1", "1:2"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:1");
  expect(gameboard.hitPositions).toStrictEqual(["1:1"]);
});

it("ship receives hit", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:1", "1:2"]);
  // mock function in order to check if hit was run
  ship.hit = jest.fn();
  gameboard.place(ship);
  gameboard.receiveAttack("1:1");
  expect(ship.hit).toHaveBeenCalled();
});

it("ship doesn't mark when not hit", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:6");
  expect(ship.hitPositions).toStrictEqual([]);
});

it("ship doesn't allow duplicate hits", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("1:5");
  expect(ship.hitPositions).toStrictEqual(["1:5"]);
});

it("allows multiple ships to be placed if valid", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "1:6"]);
  let ship2 = new shipFile.Ship(["3:5", "3:6"]);
  gameboard.place(ship);
  // expect(gameboard.ships).toStrictEqual([ship, ship2]);
  expect(gameboard.place(ship2)).toBe(true);
});

it("gives minimum row value correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "2:5"]);
  expect(gameboard._minRowValue(ship)).toBe(1);
});
it("gives minimum col value correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "1:6"]);
  expect(gameboard._minColValue(ship)).toBe(5);
});
it("gives maximim row value correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "2:5"]);
  expect(gameboard._maxRowValue(ship)).toBe(2);
});
it("gives minimum row value correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "1:6"]);
  expect(gameboard._maxColValue(ship)).toBe(6);
});

it("allSunk method returns true correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "1:6"]);
  let ship2 = new shipFile.Ship(["3:5", "3:6"]);
  gameboard.place(ship);
  gameboard.place(ship2);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("1:6");
  gameboard.receiveAttack("3:5");
  gameboard.receiveAttack("3:6");
  expect(gameboard.allSunk()).toBe(true);
});

it("allSunk method returns false correctly", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(["1:5", "1:6"]);
  let ship2 = new shipFile.Ship(["3:5", "3:6"]);
  gameboard.place(ship);
  gameboard.place(ship2);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("3:5");
  expect(gameboard.allSunk()).toBe(false);
});

it("finds correct grid row", () => {
  let gameboard = new gameboardFile.Gameboard();
  expect(gameboard._findGridRow(7, 3)).toBe(3);
});

it("finds correct grid column", () => {
  let gameboard = new gameboardFile.Gameboard();
  expect(gameboard._findGridCol(7, 3, 3)).toBe(2);
});

it("finds correct grid nr", () => {
  let gameboard = new gameboardFile.Gameboard();
  expect(gameboard._findGridNr(3, 3, 2)).toBe(7);
});
