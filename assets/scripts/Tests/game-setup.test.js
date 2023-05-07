/**
 * @jest-environment jsdom
 */

const { gameSettings } = require("../game-setup");

beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("game.html", "UTF-8");
  document.open();
  document.write(fileContents);
  document.close();
});

console.log(gameSettings);

describe("gameSettings contains correct keys", () => {
  test("dificulty key exists", () => {
    console.log(gameSettings);
    expect("dificulty" in gameSettings).toBe(true);
  });
});
