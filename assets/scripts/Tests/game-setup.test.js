/**
 * @jest-environment jsdom
 */

const {
  gameSettings,
  gameStart,
  gameModeVisibility,
  currentGameMode,
  setVissablesAndHidden,
} = require("../game-setup");
const bootstrap = require(".../../../bootstrap-5.3.0-alpha3-dist/js/bootstrap");

beforeEach(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("game.html", "UTF-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("gameSettings contains correct keys", () => {
  beforeAll(() => {
    gameSettings.easyBaseProcentage = 910;
    gameSettings.mediumBaseProcentage = 60;
    gameSettings.hardBaseProcentage = 30;
    gameSettings.easyShapesProcentage = 910;
    gameSettings.mediumShapesProcentage = 60;
    gameSettings.hardShapesProcentage = 30;
    gameSettings.mediumShapeMultiplier = 0.7;
    gameSettings.hardShapeMultiplier = 0.8;
    gameSettings.mediumShapeTurn = 0;
    gameSettings.hardShapeTurn = 0;
    gameSettings.turn = 0;
    gameSettings.dificulty = 1;
    gameSettings.currentScore = 0;
    gameSettings.weekScore = 0;
    gameSettings.highestScore = 0;
    gameSettings.rotationScore = 3;
    gameSettings.gameWeek = 0;
    gameSettings.easyGamesPlayed = 0;
    gameSettings.easyWeekScore = 0;
    gameSettings.easyHighestScore = 0;
    gameSettings.mediumGamesPlayed = 0;
    gameSettings.mediumWeekScore = 0;
    gameSettings.mediumHighestScore = 0;
    gameSettings.hardGamesPlayed = 0;
    gameSettings.hardWeekScore = 0;
    gameSettings.hardHighestScore = 0;
    gameSettings.volume = 0;
  });
  test("easyBaseProcentage key exists", () => {
    expect("easyBaseProcentage" in gameSettings).toBe(true);
  });
  test("mediumBaseProcentage key exists", () => {
    expect("mediumBaseProcentage" in gameSettings).toBe(true);
  });
  test("hardBaseProcentage key exists", () => {
    expect("hardBaseProcentage" in gameSettings).toBe(true);
  });
  test("easyShapesProcentage key exists", () => {
    expect("easyShapesProcentage" in gameSettings).toBe(true);
  });
  test("mediumShapesProcentage key exists", () => {
    expect("mediumShapesProcentage" in gameSettings).toBe(true);
  });
  test("hardShapesProcentage key exists", () => {
    expect("hardShapesProcentage" in gameSettings).toBe(true);
  });
  test("mediumShapeMultiplier key exists", () => {
    expect("mediumShapeMultiplier" in gameSettings).toBe(true);
  });
  test("hardShapeMultiplier key exists", () => {
    expect("hardShapeMultiplier" in gameSettings).toBe(true);
  });
  test("mediumShapeTurn key exists", () => {
    expect("mediumShapeTurn" in gameSettings).toBe(true);
  });
  test("hardShapeTurn key exists", () => {
    expect("hardShapeTurn" in gameSettings).toBe(true);
  });
  test("turn key exists", () => {
    expect("turn" in gameSettings).toBe(true);
  });
  test("dificulty key exists", () => {
    expect("dificulty" in gameSettings).toBe(true);
  });
  test("currentScore key exists", () => {
    expect("currentScore" in gameSettings).toBe(true);
  });
  test("weekScore key exists", () => {
    expect("weekScore" in gameSettings).toBe(true);
  });
  test("highestScore key exists", () => {
    expect("highestScore" in gameSettings).toBe(true);
  });
  test("rotationScore key exists", () => {
    expect("rotationScore" in gameSettings).toBe(true);
  });
  test("gameWeek key exists", () => {
    expect("gameWeek" in gameSettings).toBe(true);
  });
  test("easyGamesPlayed key exists", () => {
    expect("easyGamesPlayed" in gameSettings).toBe(true);
  });
  test("easyWeekScore key exists", () => {
    expect("easyWeekScore" in gameSettings).toBe(true);
  });
  test("easyHighestScore key exists", () => {
    expect("easyHighestScore" in gameSettings).toBe(true);
  });
  test("mediumGamesPlayed key exists", () => {
    expect("mediumGamesPlayed" in gameSettings).toBe(true);
  });
  test("mediumWeekScore key exists", () => {
    expect("mediumWeekScore" in gameSettings).toBe(true);
  });
  test("mediumHighestScore key exists", () => {
    expect("mediumHighestScore" in gameSettings).toBe(true);
  });
  test("hardGamesPlayed key exists", () => {
    expect("hardGamesPlayed" in gameSettings).toBe(true);
  });
  test("hardWeekScore key exists", () => {
    expect("hardWeekScore" in gameSettings).toBe(true);
  });
  test("hardHighestScore key exists", () => {
    expect("hardHighestScore" in gameSettings).toBe(true);
  });
  test("volume key exists", () => {
    expect("volume" in gameSettings).toBe(true);
  });
});

//

describe("gameStart to change", () => {
  console.log(gameModeVisibility);
  test("gameSettings.dificulty to change to 2", () => {
    gameStart(2);
    expect("dificulty" in gameSettings).toEqual(2);
  });
});
