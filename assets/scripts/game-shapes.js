"use strict";

// Shapes data arrays, all are made using ecxel helper and consist of 1, 4, 9 or 16 pieces representing 1x1, 2x2, 3x3, 4,x 4 size shapes
const shapesArray = {
  easy: [
    [true],
    [true, true, false, false],
    [true, true, false, true],
    [true, true, true, true],
    [false, false, false, true, true, true, false, false, false],
    [false, false, false, true, true, true, false, false, true],
    [true, true, true, false, true, false, false, false, false],
    [true, false, false, true, true, false, false, true, false],
    [false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false],
    [true, false, false, true],
  ],
  medium: [
    [true, false, false, false, true, false, false, false, true],
    [false, false, false, true, false, true, true, true, true],
    [false, true, false, true, false, true, false, true, false],
    [false, true, false, false, false, true, true, false, false, true, false, false, false, true, false, false],
    [true, true, true, true, false, false, true, false, false],
    [true, false, false, true, true, true, true, false, false],
    [true, false, false, true, true, true, false, false, true],
    [false, true, false, false, false, true, false, true, false],
    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, true, false],
    [true, false, false, true, false, false, false, true, true],
  ],
  hard: [
    [true, false, false, false, false, true, false, true, false, false, true, false, false, false, false, false],
    [false, true, false, true, false, true, false, true, false],
    [true, true, false, false, false, false, true, false, false, false, false, true, false, false, false, false],
    [true, false, true, true, false, true, false, true, false],
    [false, true, false, false, false, false, true, false, false, true, false, false, false, false, true, false],
    [true, false, true, false, true, true, false, false, true],
    [true, false, true, false, true, false, true, false, true],
    [true, true, true, false, false, true, true, true, true],
    [true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true],
    [false, true, false, false, true, false, true, false, false, true, false, false, false, true, false, false],
  ],
};

//-------------------------------------- Shapes formulas ------------------------------------------------------
const shapeWindows = document.getElementsByClassName(`shape-window`);
const shapeWindows2 = document.querySelectorAll(`.shape-window`);

console.log(`dqs`, shapeWindows);
console.log(`dqs2`, shapeWindows2);
console.log(`dqs[0]`, shapeWindows[0]);

const testing1 = Array.from(shapeWindows);
const testing2 = [...shapeWindows];

console.log(`testing1`, testing1);
console.log(`testing2`, testing2);

// Three diferent shape dificulities are set for the start of the game, then adjusted as a game progresses
// To set up game procentage using thousands instead of hundreds to be more precice on procentages

const gameDificulitySettings = {
  easyShapesProcentage: 955,
  mediumShapesProcentage: 30,
  hardShapesProcentage: 15,
  // Every game turn medium and hard base value will be multiplied and increced with diminishing returns
  mediumShapeMultiplier: 0.9, // 90%
  hardShapeMultiplier: 0.99, // 99%
};

// random rounded number generator, *"barowed" from JS Course*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Choses between easy/medium/or hard shape based on the procentages at the current stage
// this helps to control games progresive dificulity.
function choseRandomShapeDificulity() {
  const easyShapeChance = gameDificulitySettings.easyShapesProcentage; // the number will be highest number roled starting(0-955) (95.5%)
  const mediumShapeChance = gameDificulitySettings.mediumShapesProcentage + easyShapeChance;
  const chance = randomInt(0, 1000);

  // depending on the number roll we check first if it is higher than easy range (starting at 0 to 955)
  // then if its higher we check if it is not higher than medium (easy+medium)
  // the remaining is hard
  if (chance <= easyShapeChance) {
    return shapesArray.easy;
  } else if (chance <= mediumShapeChance) {
    return shapesArray.medium;
  } else {
    return shapesArray.hard;
  }
}

// Shapes array rearanging function to create new shapes by rotating it clockwise
// rotating the shape 3x times will rotate the shape anticlockwise
/**
 * Takes array for game tile and returns array of rotated shape clockwise
 * @param {array} array
 * @param {number} timesToFlip
 * @returns array
 */
function rotateTile(array, timesToFlip) {
  // determening if the shape is 1x1 , 2x2, 3x3, or 4x4
  const shapeDimentionlenght = Math.sqrt(array.length);

  // all changes are added to newArray and not effecting finalArray untill the loop cycle is completed.
  let finalArray = [...array];
  let newArray = [];

  let i = 0;
  while (i < timesToFlip) {
    switch (shapeDimentionlenght) {
      case 1:
        newArray = [finalArray[0]];
        break;
      case 2:
        newArray = [finalArray[2], finalArray[0], finalArray[3], finalArray[1]];
        break;
      case 3:
        newArray = [
          finalArray[6],
          finalArray[3],
          finalArray[0],
          finalArray[7],
          finalArray[4],
          finalArray[1],
          finalArray[8],
          finalArray[5],
          finalArray[2],
        ];
        break;
      case 4:
        newArray = [
          finalArray[12],
          finalArray[8],
          finalArray[4],
          finalArray[0],
          finalArray[13],
          finalArray[9],
          finalArray[5],
          finalArray[1],
          finalArray[14],
          finalArray[10],
          finalArray[6],
          finalArray[2],
          finalArray[15],
          finalArray[11],
          finalArray[7],
          finalArray[3],
        ];
        break;
      default:
        throw new Error(`shape size not found`);
    }
    // finalArray is replaced with new completed array and ready for next loop cycle
    finalArray = [...newArray];
    i++;
  }
  return finalArray;
}

// takes choseRandomShapeDificulity() array which has 10 differnet shapes and choses one at random.
function choseRandomShape() {
  // choses random shape by taking random dificulity first then rolling the dice on random shape array
  const array = choseRandomShapeDificulity()[randomInt(0, 9)];
  // then rotating it (or not) to get even more random shape.
  const trulyRandomShape = rotateTile(array, randomInt(0, 3));
  return trulyRandomShape;
}

// Create shape HTML for a single window out of given shape array
function crateGameShapeHTML(shapeArray) {
  let shapeHTMLinner;
  shapeArray.forEach(
    (e) => (shapeHTMLinner += e ? `<div class="shape-box filled-box">` : `<div class="shape-box empty-box">`)
  );
  return shapeHTMLinner;
}

function fillGameShape(shapeWindow) {
  // picking random shape and creating its HTML
  const randomShapeArray = choseRandomShape();
  const draggableHTML = crateGameShapeHTML(randomShapeArray);
  // finding out if it is 1x1, 2x2, 3x3, 4x4
  const multiplier = Math.sqrt(randomShapeArray);

  let dragClass;

  switch (multiplier) {
    case 1:
      dragClass = "draggable-one";
      break;
    case 2:
      dragClass = "draggable-two";
      break;
    case 3:
      dragClass = "draggable-three";
      break;
    case 4:
      dragClass = "draggable-four";
      break;
  }
  let shapeHTML = `<div class="draggable ${dragClass}" draggable="true">` + draggableHTML + `</div>`;

  shapeWindow.innerHtml = shapeHTML;
}

// take given shape window, clear it out and fill it up with new shape details.

//--------------------------------END OF FUNCTIONS--------------------------------
