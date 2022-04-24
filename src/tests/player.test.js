import * as shipFile from "../ship";
import * as gameboardFile from "../gameboard";
import * as playerFile from "../player";

it("computer attacks and other player receives attack", () => {
  let gameboardH = new gameboardFile.Gameboard();
  let human = new playerFile.Player(true, gameboardH);
  let gameboardC = new gameboardFile.Gameboard();
  let computer = new playerFile.Player(false, gameboardC);
  computer._randomPair = jest.fn().mockReturnValueOnce([2, 4]);
  computer.computerAttack(human);
  expect(gameboardH.hitPositions).toStrictEqual(["2:4"]);
});

it("computer only attacks valid positions", () => {
  let gameboardH = new gameboardFile.Gameboard();
  let human = new playerFile.Player(true, gameboardH);
  let gameboardC = new gameboardFile.Gameboard();
  let computer = new playerFile.Player(false, gameboardC);

  computer._randomPair = jest
    .fn()
    .mockReturnValueOnce([2, 4])
    .mockReturnValueOnce([2, 4])
    .mockReturnValueOnce([3, 4]);
  computer.computerAttack(human);
  computer.computerAttack(human);
  expect(gameboardH.hitPositions).toStrictEqual(["2:4", "3:4"]);
});
