"use strict";

// This is a first JS file dealing with entire setup of game board, positioning and size of it
// Additionly it will call all nececeraly globar variables for other files

// Temporary variables

const temporaryShapesNo = 2;

// DOM elements
const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameControls = $(`#game-controls`);
const gameShapes = $(`#game-shapes`);

// Custom variables

const gameScores = {
  turns: 0,
  totalScore: 0,
  shapeNumber: 0,
};

//determines if screen is horizontal or vertical and this function used for many others as a variable.
let horizontalOrNot; //true for vertical, false for horizontal, checked on load and on resize.

// Functions to call once the game loads
window.addEventListener(`load`, () => {
  horizontalOrNot = window.innerWidth < window.innerHeight;
  gameScreenDimentions();
  gameBoardAndScreenDimentions();
  newGameBoardGrid();
  fillShapesContainer(temporaryShapesNo);
  addRotationIcons();
  setShapesContainerSize();
});

// Functions to call when screen resizes
window.addEventListener(`resize`, () => {
  horizontalOrNot = window.innerWidth < window.innerHeight;
  gameScreenDimentions();
  setShapesContainerSize();
  gameBoardAndScreenDimentions();
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
    if (window.innerWidth / viewRatio < window.innerHeight) {
      width = `100%`;
      height = `${window.innerWidth / viewRatio}px`;
    } else {
      height = `100%`;
      width = `${window.innerHeight * viewRatio}px`;
    }
  } else {
    if (window.innerHeight / viewRatio < window.innerWidth) {
      height = `100%`;
      width = `${window.innerHeight / viewRatio}px`;
    } else {
      width = `100%`;
      height = `${window.innerWidth * viewRatio}px`;
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

// Game shapes function for start of the game and restarting the game
function fillShapesContainer(numSquares) {
  // Clear any existing content in the container
  gameShapes.html(``);
  for (let i = 0; i < numSquares; i++) {
    let div = document.createElement("div");
    div.classList.add(`shape-window`);
    gameShapes.append(div);
  }
}

// adding game controll buttons
function addRotationIcons() {
  gameControls.prepend(
    `<div id="game-icons">
    <div class="game-icon" id="rotate-left" draggable="true"><i class="fa-solid fa-rotate-left"></i></div>
    <div class="game-icon" id="rotate-right" draggable="true"><i class="fa-solid fa-rotate-right"></i></div>
    <div class="game-icon" id="menu-icon"><i class="fa-solid fa-power-off"></i></div>
    </div>`
  );
}

// -------------------------------------------------------------------------------------

// Seting up the size and layout of game shapes windows
function setShapesContainerSize() {
  let shapeAspectRatios;
  let shapeDirection;
  let iconsDirection;

  if (horizontalOrNot) {
    // if screen is horizontal
    shapeAspectRatios = (gameShapes.outerWidth() / 10) * 4;
    shapeDirection = `row`;
    iconsDirection = [`row`, `width`, `height`];
  } else {
    // if screen is vertical
    shapeAspectRatios = (gameShapes.outerHeight() / 10) * 4;
    shapeDirection = `column`;
    iconsDirection = [`column`, `height`, `width`];
  }

  // sets css for all shape window figures
  $(`.shape-window`).css(`width`, shapeAspectRatios).css(`height`, shapeAspectRatios);
  gameShapes.css(`flex-direction`, shapeDirection);

  gameControls.css(`flex-direction`, iconsDirection[0]);
  $(`#game-icons`)
    .css(`flex-direction`, iconsDirection[0])
    .css(iconsDirection[1], shapeAspectRatios)
    .css(iconsDirection[2], `auto`);
  $(`.game-icon`)
    .css(`height`, shapeAspectRatios / 3)
    .css(`width`, shapeAspectRatios / 3);
}
