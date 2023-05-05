"use strict";

// This is second game file working with all game shape functions: creating, arranging, rotating and anythign in between

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
    [true, false, true, false, true, false, false, true, false],
    [false, true, false, true, true, true, false, true, false],
    [true, true, true, true, false, false, true, false, false],
    [true, false, false, true, true, true, true, false, false],
    [true, false, false, true, true, true, false, false, true],
    [false, true, false, false, false, true, false, true, false],
    [false, true, false, true, false, true, false, true, false],
    [true, false, false, true, false, false, false, true, true],
  ],
  hard: [
    [true, false, false, false, false, true, false, true, false, false, true, false, false, false, false, false],
    [true, false, false, false, false, true, false, true, false, false, true, false, false, true, false, false],
    [true, true, true, false, true, false, true, true, false],
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

// random rounded number generator, *"barowed" from JS Course*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Choses between easy/medium/or hard shape based on the procentages at the current stage
// this helps to control games progresive dificulty.
function choseRandomShapeDificulity() {
  const easyShapeChance = gameSettings.easyShapesProcentage; // the number will be highest number roled starting(0-955) (95.5%)
  const mediumShapeChance = gameSettings.mediumShapesProcentage + easyShapeChance;
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
function rotateShape(array, timesToFlip) {
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

// almoast identical function to previous however it will make a mirror copy of the shape as several shapes can have modified by fliping them
function mirrorShape(array) {
  // determening if the shape is 1x1 , 2x2, 3x3, or 4x4
  const shapeDimentionlenght = Math.sqrt(array.length);

  // all changes are added to newArray and not effecting finalArray untill the loop cycle is completed.
  let finalArray = [...array];
  let newArray = [];

  // no loop needed as it either hapens or not which is determined before function called
  switch (shapeDimentionlenght) {
    case 1:
      newArray = [finalArray[0]];
      break;
    case 2:
      newArray = [finalArray[1], finalArray[0], finalArray[3], finalArray[2]];
      break;
    case 3:
      newArray = [
        finalArray[2],
        finalArray[1],
        finalArray[0],
        finalArray[5],
        finalArray[4],
        finalArray[3],
        finalArray[8],
        finalArray[7],
        finalArray[6],
      ];
      break;
    case 4:
      newArray = [
        finalArray[3],
        finalArray[2],
        finalArray[1],
        finalArray[0],
        finalArray[7],
        finalArray[6],
        finalArray[5],
        finalArray[4],
        finalArray[11],
        finalArray[10],
        finalArray[9],
        finalArray[8],
        finalArray[15],
        finalArray[14],
        finalArray[13],
        finalArray[12],
      ];
      break;
    default:
      throw new Error(`shape size not found`);
  }
  // finalArray is replaced with new completed array and ready for next loop cycle
  finalArray = [...newArray];

  return finalArray;
}

// takes choseRandomShapeDificulity() array which has 10 differnet shapes and choses one at random.
function choseRandomShape() {
  // choses random shape by taking random dificulty first then rolling the dice on random shape array
  const array1 = choseRandomShapeDificulity()[randomInt(0, 9)];
  // then either fliping or not
  const array2 = randomInt(0, 1) === 1 ? mirrorShape(array1) : array1;
  // then rotating it (or not) to get even more random shape.
  const trulyRandomShape = rotateShape(array2, randomInt(0, 3));
  return trulyRandomShape;
}

// Create shape HTML for a single window out of given shape array
function crateGameShapeHTML(shapeArray) {
  let shapeHTMLinner = ``;
  shapeArray.forEach(
    (e) =>
      (shapeHTMLinner += e ? `<div class="shape-box filled-box"></div>` : `<div class="shape-box empty-box"></div>`)
  );
  return shapeHTMLinner;
}

function fillGameShape(shapeWindow, array) {
  shapeWindow.innerHTML = ``;

  let shapeArray = array;

  // picking random shape and creating its HTML if array it is not provided
  if (array === undefined) shapeArray = choseRandomShape();

  const draggableHTML = crateGameShapeHTML(shapeArray);

  // finding out if it is 1x1, 2x2, 3x3, 4x4
  const multiplier = Math.sqrt(shapeArray.length);

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
  let elementDiv = document.createElement("div");
  elementDiv.innerHTML = draggableHTML;
  elementDiv.classList.add("draggable");
  elementDiv.classList.add(dragClass);
  elementDiv.setAttribute("draggable", "true");

  shapeWindow.append(elementDiv);
}

// function is given an array of HTML colection of either shape or game board and creates a matrix of true/false for open windows and shapes
function arrayFromHTML(htmlColection) {
  // matrix crated and lengh calculated
  let matrix = [];
  const matrixLenght = Math.sqrt(htmlColection.length);

  // creating matrix rows
  for (let i = 0; i < matrixLenght; i++) {
    matrix.push([]);
  }

  for (let i = 0; i < htmlColection.length; i++) {
    // calcualting matrix row
    const rowNumber = Math.floor(i / matrixLenght);

    // checks for filled shapes in both shape and game board situations
    const trueOrFalese =
      htmlColection[i].classList.contains(`filled-box`) || htmlColection[i].classList.contains(`filled-field`);

    matrix[rowNumber].push(trueOrFalese);
  }
  return matrix;
}

//similar function to above however turing from flat array in to matrix
function matrixFromArray(array) {
  let matrix = [];
  const matrixLenght = Math.sqrt(array.length);

  // creating matrix rows
  for (let i = 0; i < matrixLenght; i++) {
    matrix.push([]);
  }

  for (let i = 0; i < array.length; i++) {
    // calcualting matrix row
    const rowNumber = Math.floor(i / matrixLenght);

    matrix[rowNumber].push(array[i]);
  }
  return matrix;
}

function rotateGameShapes(rotationDirection) {
  // rotation direction is pushed as a number 1 is for clockwise rotation, 3 is for anticlockwise.
  // this is because function rotateShape(array, timesToFlip) rotation of 3 times becomes anticlickwose turn
  const shapeWindows = document.getElementsByClassName(`shape-window`);

  if (gameSettings.rotationScore > 0) {
    for (let i = 0; i < shapeWindows.length; i++) {
      // grab shapes array and return as matrix
      const arrayMatrix = arrayFromHTML(shapeWindows[i].firstChild.children);
      // flatten the shape array
      const arrayFlatened = arrayMatrix.flat();
      // rotate array
      const rotatedShape = rotateShape(arrayFlatened, rotationDirection);
      // fill bakc the shape
      fillGameShape(shapeWindows[i], rotatedShape);
    }

    gameSettings.rotationScore -= 1;
    rotationCount.innerHTML = gameSettings.rotationScore;

    // re-add event listeners
    addNewEventListeners(`add`);
  }

  trigerGameOverCheck();
}

function fillOldGameShapes(oldShapes) {
  const shapeWindows = document.getElementsByClassName(`shape-window`);
  for (let i = 0; i < shapeWindows.length; i++) {
    shapeWindows[i].innerHTML = oldShapes.shapes[i];
  }
}

function storeGameShapes() {
  const shapeWindows = document.getElementsByClassName(`shape-window`);
  for (let i = 0; i < shapeWindows.length; i++) {
    shapeWindows[i].innerHTML;
    gameData.shapes.push(shapeWindows[i].innerHTML);
  }
}

function storeGameBoard() {
  const gameBoard = document.getElementById(`game-board`);
  gameData.board = gameBoard.innerHTML;
}
