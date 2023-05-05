"use strict";

/**
 * @jest-environment jsdom
 */

const { gameStart, gameSettings } = require("../game-setup.js");

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("game.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

//---------------------------------------------------------------------------------------------------
describe("Check if correct dificulity is given", () => {
  test("Game settings difiluity set", () => {
    console.log(gameSettings.dificulty);
    gameStart(2);
    expect(gameSettings.dificulty).toBe(2);
  });
  // test("currentGame key exists", () => {
  //     expect("currentGame" in gameStart).toBe(true);
  // });
  // test("playerMoves key exists", () => {
  //     expect("playerMoves" in gameStart).toBe(true);
  // });
  // test("choices key exists", () => {
  //     expect("choices" in gameStart).toBe(true);
  // });
  // test("choices contain correct ids", () => {
  //     expect(gameStart.choices).toEqual(["button1", "button2", "button3", "button4"]);
  // });
  // test("turnNumber key exists", () => {
  //     expect("turnNumber" in gameStart).toBe(true);
  // });
});

// ----------------------------------------------------------------------------------------------------------

// describe("newGame works correctly", () => {
//     beforeAll(() => {
//         game.score = 42;
//         game.playerMoves = ["button1", "button2"];
//         game.currentGame = ["button1", "button2"];
//         document.getElementById("score").innerText = "42";
//         newGame();
//     });
//     test("should set game score to zero", () => {
//         expect(game.score).toEqual(0);
//     });
//     test("should display 0 for the element with id of score", () => {
//         expect(document.getElementById("score").innerText).toEqual(0);
//     });
//     test("should clear the player moves array", () => {
//         expect(game.playerMoves.length).toBe(0);
//     });
//     test("should add one move to the computer's game array", () => {
//         expect(game.currentGame.length).toBe(1);
//     });
//     test("expect data-listener to be true", () => {
//         newGame();
//         const elements = document.getElementsByClassName("circle");
//         for (let element of elements) {
//             expect(element.getAttribute("data-listener")).toEqual("true");
//         }
//     });
// });

// ---------------------------------------------------------------------------------------------------
// describe("gameplay works correctly", () => {
//     beforeEach(() => {
//         game.score = 0;
//         game.currentGame = [];
//         game.playerMoves = [];
//         addTurn();
//     });
//     afterEach(() => {
//         game.score = 0;
//         game.currentGame = [];
//         game.playerMoves = [];
//     });
//     test("addTurn adds a new turn to the game", () => {
//         addTurn();
//         expect(game.currentGame.length).toBe(2);
//     });
//     test("should add correct class to light up the buttons", () => {
//         let button = document.getElementById(game.currentGame[0]);
//         lightsOn(game.currentGame[0]);
//         expect(button.classList).toContain(game.currentGame[0] + "light");
//     });
//     test("showTurns should update game.turnNumber", () => {
//         game.turnNumber = 42;
//         showTurns();
//         expect(game.turnNumber).toBe(0);
//     });
// });
