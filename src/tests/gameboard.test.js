import * as shipFile from "../ship";
import * as gameboardFile from "../gameboard";
import { JS_EXT_TO_TREAT_AS_ESM } from "ts-jest";

it("places ships", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(2, ["1:1", "1:2"]);
  gameboard.place(ship);
  expect(gameboard.shipPositions).toStrictEqual(["1:1", "1:2"]);
});

it("doesn't allow overlapping ships", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(2, ["1:1", "1:2"]);
  gameboard.place(ship);
  let ship2 = new shipFile.Ship(2, ["2:1", "1:1"]);
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
  let ship = new shipFile.Ship(2, ["1:1", "1:2"]);
  gameboard.place(ship);
  let ship2 = new shipFile.Ship(2, ["2:1", "3:1"]);
  expect(gameboard.place(ship2)).toBe(false);
});

it("receiveAttack adds to hitPositions without duplicate", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(2, ["1:1", "1:2"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:1");
  expect(gameboard.hitPositions).toStrictEqual(["1:1"]);
});

it("ship receives hit", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(2, ["1:1", "1:2"]);
  // mock function in order to check if hit was run
  ship.hit = jest.fn();
  gameboard.place(ship);
  gameboard.receiveAttack("1:1");
  expect(ship.hit).toHaveBeenCalled();
});

it("ship doesn't mark when not hit", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(1, ["1:5"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:6");
  expect(ship.hitPositions).toStrictEqual([]);
});

it("ship doesn't allow duplicate hits", () => {
  let gameboard = new gameboardFile.Gameboard();
  let ship = new shipFile.Ship(1, ["1:5"]);
  gameboard.place(ship);
  gameboard.receiveAttack("1:5");
  gameboard.receiveAttack("1:5");
  expect(ship.hitPositions).toStrictEqual(["1:5"]);
});
