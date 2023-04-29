"use strict";

// This is a first JS file dealing with entire setup of game board, positioning and size of it
// Additionly it will call all nececeraly globar variables for other files

// DOM elements
const container = $(`#game-screen-container`);
const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameControls = $(`#game-controls`);
const gameShapes = $(`#game-shapes`);

// Three diferent shape dificulities are set for the start of the game, then adjusted as a game progresses
// To set up game procentage, using thousands instead of hundreds to be more precice on procentages

const gameSettings = {
  easyBaseProcentage: 910,
  mediumBaseProcentage: 60,
  hardBaseProcentage: 30,

  easyShapesProcentage: 910,
  mediumShapesProcentage: 60,
  hardShapesProcentage: 30,
  // Every game turn medium and hard base value will be multiplied and increced with diminishing returns
  mediumShapeMultiplier: 0.7, // 90%
  hardShapeMultiplier: 0.8, // 99%

  mediumShapeTurn: 20,
  hardShapeTurn: 40,

  // Game scores setting. Turns are used for procentage base calculation
  turn: 0,
  totalScore: 0,
  // Game dificulity is set by numbers 1 = easy, 2 = medium, 3 = hard
  dificulity: 0,
};

//determines if screen is horizontal or vertical and this function used for many others as a variable.
let horizontalOrNot; //true for vertical, false for horizontal, checked on load and on resize.

// Functions to call once the game loads
window.addEventListener(`load`, () => {
  horizontalOrNot = container.innerWidth() < container.innerHeight();
  gameScreenDimentions();
  gameBoardAndScreenDimentions();
  newGameBoardGrid();
  setShapesContainerSize();
});

// Functions to call when screen resizes
window.addEventListener(`resize`, () => {
  horizontalOrNot = container.innerWidth() < container.innerHeight();
  gameScreenDimentions();
  gameBoardAndScreenDimentions();
  setShapesContainerSize();
});

//-------------------------------------FUNCTIONS---------------------------

// setting screen dimentions and layout
function gameScreenDimentions() {
  const viewRatio = 3 / 5.5;
  let height;
  let width;

  // Determines if height is bigger or with and decides witch way to set up 3x4 ratio.
  // after making this decition it check's for largest proportions to fit 3x4 ratio box
  if (horizontalOrNot) {
    if (container.innerWidth() / viewRatio < container.innerHeight()) {
      width = `100%`;
      height = `${container.innerWidth() / viewRatio}px`;
    } else {
      height = `100%`;
      width = `${container.innerHeight() * viewRatio}px`;
    }
  } else {
    if (container.innerHeight() / viewRatio < container.innerWidth()) {
      height = `100%`;
      width = `${container.innerHeight() / viewRatio}px`;
    } else {
      width = `100%`;
      height = `${container.innerWidth() * viewRatio}px`;
    }
  }
  gameScreen.css(`width`, width).css(`height`, height);
}

// board screen dimentions calculations for loading up and on screen size change
function gameBoardAndScreenDimentions() {
  const gameScreenWidth = gameScreen.innerWidth();
  const gameScreenHeight = gameScreen.innerHeight();
  const maxDimension = Math.min(gameScreenWidth, gameScreenHeight);

  gameBoard.css(`width`, maxDimension + `px`);
  gameBoard.css(`height`, maxDimension + `px`);
  gameBoard.css(`padding`, maxDimension / 18 + `px`);

  if (horizontalOrNot) {
    gameShapes.css(`width`, maxDimension + `px`);
    gameShapes.css(`height`, maxDimension / 2 + `px`);
    gameShapes.css(`padding`, maxDimension / 20 + `px`);
    // seting layout of game board and pieces
    gameScreen.css(`flex-direction`, `column`);
  } else {
    gameShapes.css(`width`, maxDimension / 2 + `px`);
    gameShapes.css(`padding`, maxDimension / 20 + `px`);
    gameShapes.css(`height`, maxDimension + `px`);
    // seting layout of game board and pieces
    gameScreen.css(`flex-direction`, `row`);
  }
}

// create new game board grid at the start of the game
// calculatiosn creates 3 parameters: rows, columns and 3x3 squares and add these as separate classes
function newGameBoardGrid() {
  const boardSize = 81;
  for (let i = 0; i < boardSize; i++) {
    const rowNumber = Math.floor(i / 9);
    const columnNumber = i % 9;
    const squareNumber = Math.floor(rowNumber / 3) * 3 + Math.floor(columnNumber / 3);

    gameBoard.append(
      `<div class="game-box grid-row-${rowNumber} grid-column-${columnNumber} grid-square-${squareNumber} empty-field"></div>`
    );
  }
}

// -------------------------------------------------------------------------------------

// Seting up the size and layout of game shapes windows as well as controll button window
function setShapesContainerSize() {
  let shapeAspectRatios;
  let shapeDirection;
  let iconsDirection;
  let menuRatios;

  if (horizontalOrNot) {
    // if screen is horizontal
    shapeAspectRatios = (gameShapes.outerWidth() / 10) * 4;
    shapeDirection = `row`;
    menuRatios = gameShapes.outerWidth() / 6;
    iconsDirection = [`width`, `height`];
  } else {
    // if screen is vertical
    shapeAspectRatios = (gameShapes.outerHeight() / 10) * 4;
    shapeDirection = `column`;
    menuRatios = gameShapes.outerHeight() / 6;
    iconsDirection = [`height`, `width`];
  }

  // sets css for all shape window figures
  $(`.shape-window`).css(`width`, shapeAspectRatios).css(`height`, shapeAspectRatios);
  gameShapes.css(`flex-direction`, shapeDirection);

  // Set CSS for game controls buttons
  gameControls.css(iconsDirection[1], 2 * menuRatios + `px`).css(iconsDirection[0], 6 * menuRatios + `px`);
}
