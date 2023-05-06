/**
 * @jest-environment jsdom
 */

const addition = require("../game-setup");

beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("game.html", "UTF-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("Calculator", () => {
  describe("Addition function", () => {
    test("should return 42 for 20 + 22", () => {
      console.log(document.querySelector(`#volume`));
      expect(addition(20, 22)).toBe(42);
    });
  });
  describe("Subtract function", () => {});
  describe("Multiply function", () => {});
  describe("Divide function", () => {});
});
