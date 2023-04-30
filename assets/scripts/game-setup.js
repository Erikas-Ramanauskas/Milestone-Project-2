"use strict";

// This is a first JS file dealing with entire setup of game board, positioning and size of it
// Additionly it will call all nececeraly globar variables for other files

// DOM elements
const container = $(`#game-screen-container`);
const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameControls = $(`#game-controls`);
const gameShapes = $(`#game-shapes`);

const currentScoreCount = document.querySelector(`#current-score-count`);
const highScoreCount = document.querySelector(`#high-score-count`);
const rotationCount = document.querySelector(`#rotation-count-number`);

const volumeInput = document.querySelector("#volume");

const menuModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
  keyboard: false,
});

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
  mediumShapeMultiplier: 0.7, // 70%
  hardShapeMultiplier: 0.8, // 80%

  mediumShapeTurn: 0,
  hardShapeTurn: 0,

  // Game scores setting. Turns are used for procentage base calculation
  turn: 0,
  // Game dificulity is set by numbers 1 = easy, 2 = medium, 3 = hard
  dificulity: 0,

  // game Scores
  currentScore: 0,
  weekScore: 0,
  highestScore: 0,
  rotationScore: 3,

  // volume sttings
  volume: 50,
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

// runs when dificulity is selected and starts event listeners and fills the shapes
function gameStart(dificulity) {
  gameSettings.dificulity = dificulity;

  clearGameBoardandShapes();

  gameStartShapesFill();
  findDropBoxesCenters();

  addNewEventListeners(`add`);

  // sets up default parameters
  gameSettings.easyShapesProcentage = 910;
  gameSettings.mediumShapesProcentage = 60;
  gameSettings.hardShapesProcentage = 30;

  // Resets a highscores and html
  gameSettings.turn = 0;
  gameSettings.currentScore = 0;
  currentScoreCount.innerHTML = gameSettings.currentScore;
  gameSettings.weekScore = 0;
  gameSettings.highestScore = 0;
  highScoreCount.innerHTML = gameSettings.highestScore;

  // sets medium and hard shapes starting turn when it starts raising dificulity
  gameSettings.mediumShapeTurn = 25 - 5 * dificulity;
  gameSettings.hardShapeTurn = 50 - 10 * dificulity;

  // rotation count update
  gameSettings.rotationScore = 4 - dificulity;
  rotationCount.innerHTML = gameSettings.rotationScore;
}

volumeInput.addEventListener("input", (event) => {
  gameSettings.volume = event.target.value;
});

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

function clearGameBoardandShapes() {
  // clears up a game board
  const gameBoard = document.getElementsByClassName(`game-box`);
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i].classList.remove(`filled-field`);
    gameBoard[i].classList.add(`empty-field`);
  }

  //clears up game shapes
  const gameShapes = document.getElementsByClassName(`shape-window`);
  for (let i = 0; i < gameShapes.length; i++) {
    gameShapes[i].innerHTML = "";
  }
}
