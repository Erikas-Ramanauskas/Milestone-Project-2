"use strict";

// This is a first JS file dealing with entire setup of game board, positioning and size of it
// Additionly it will call all nececeraly global variables for other files

// DOM elements
const container = document.querySelector("#game-screen-container");
const gameScreen = document.querySelector("#game-screen");
const gameBoard = document.querySelector("#game-board");
const shapeWindows = document.querySelectorAll(".shape-window");
const gameControls = document.querySelector("#game-controls");
const gameShapes = document.querySelector("#game-shapes");
const loader = document.querySelector(".loader");

const currentScoreCount = document.querySelector(`#current-score-count`);
const highScoreCount = document.querySelector(`#high-score-count`);
const highScoreText = document.querySelector(`#high-score-text`);
const rotationCount = document.querySelector(`#rotation-count-number`);
const currentGameMode = document.querySelector(`#current-game-mode`);
const gameModeVisibility = document.querySelector(`.current-mode-container`);

// game over message and resume button
const gameOverMessage = document.querySelector(`#game-over-message`);
const resumeButton = document.querySelector(`#btn-resume-game`);
const gameOverScore = document.querySelector(`#game-over-score`);

// sound variables
const volumeInput = document.getElementById("volume");
const dropAudio = document.getElementById("drop-audio");
const destroyAudio = document.getElementById("destroy-audio");

// ----------------------------------------Must be disabled in order for automated test to run ------------------------------------ //
const menuModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
  keyboard: false,
});
// ----------------------------------------Must be disabled in order for automated test to run ------------------------------------ //

// Three diferent shape dificulities are set for the start of the game, then adjusted as a game progresses
// To set up game procentage, using thousands instead of hundreds to be more precice on procentages

let gameSettings = {
  easyBaseProcentage: 910,
  mediumBaseProcentage: 60,
  hardBaseProcentage: 30,

  easyShapesProcentage: 910,
  mediumShapesProcentage: 60,
  hardShapesProcentage: 30,

  // Every game turn medium and hard base value will be multiplied and increced with diminishing returns
  mediumShapeMultiplier: 0.7, // 70%
  hardShapeMultiplier: 0.8, // 80%

  // Both medium and hard will have their individual turns depending on game dificulty and general game turn
  mediumShapeTurn: 0,
  hardShapeTurn: 0,

  // Game scores setting. Turns are used for procentage base calculation
  turn: 0,
  // Game dificulty is set by numbers 1 = easy, 2 = medium, 3 = hard
  dificulty: 1,

  // game Scores
  currentScore: 0,
  weekScore: 0,
  highestScore: 0,
  rotationScore: 3,
  gameWeek: 0,

  easyGamesPlayed: 0,
  easyWeekScore: 0,
  easyHighestScore: 0,

  mediumGamesPlayed: 0,
  mediumWeekScore: 0,
  mediumHighestScore: 0,

  hardGamesPlayed: 0,
  hardWeekScore: 0,
  hardHighestScore: 0,

  // volume sttings
  volume: 0,
};

const gameData = {
  board: [],
  shapes: [],
};

//determines if screen is horizontal or vertical and this function used for many others as a variable.
let horizontalOrNot; //true for vertical, false for horizontal, checked on load and on resize.

// Functions to call once the game loads
window.addEventListener(`load`, () => {
  horizontalOrNot = container.clientWidth < container.clientHeight;
  gameScreenDimentions();
  gameBoardAndScreenDimentions();
  setShapesContainerSize();
  loader.classList.add("loader-hidden");

  // checks if player is visiting first time or if old info needs to be uploaded
  if (!getLocalStorage()) {
    newGameBoardGrid();
    gameStart(1); // In case player never visited website automaticaly starts easy game
  } else {
    oldGameBoardGrid(getLocalStorage()[1]);
    fillOldGameShapes(getLocalStorage()[1]);
    gameSettings = getLocalStorage()[0];
    addNewEventListeners(`add`);
    setOldGameVolume();
    setVissablesAndHidden(gameSettings.dificulty);
    renderGameScores();
  }

  resetGameWeek();
  renderGameScores();
  setGameVolume();
  trigerGameOverCheck();
});

// Functions to call when screen resizes
window.addEventListener(`resize`, () => {
  horizontalOrNot = container.clientWidth < container.clientHeight;
  gameScreenDimentions();
  gameBoardAndScreenDimentions();
  setShapesContainerSize();
  findDropBoxesCenters();
});

//-------------------------------------FUNCTIONS---------------------------

// runs when dificulty is selected and starts event listeners and fills the shapes
function gameStart(dificulty) {
  gameSettings.dificulty = dificulty;

  // eddits htm in modal
  setVissablesAndHidden(dificulty);

  //Resets the game components
  clearGameBoardandShapes();

  // fills new shapes
  gameStartShapesFill();
  findDropBoxesCenters();

  // sets event listeners for shapes
  addNewEventListeners(`add`);

  // sets up default parameters
  gameSettings.easyShapesProcentage = 910;
  gameSettings.mediumShapesProcentage = 60;
  gameSettings.hardShapesProcentage = 30;

  // Resets a highscores and html
  gameSettings.turn = 0;
  gameSettings.currentScore = 0;
  currentScoreCount.innerHTML = gameSettings.currentScore;
  highScoreCount.innerHTML = Math.floor(gameSettings.highestScore);

  // sets medium and hard shapes starting turn when it starts raising dificulty
  gameSettings.mediumShapeTurn = 25 - 5 * dificulty;
  gameSettings.hardShapeTurn = 50 - 10 * dificulty;

  // rotation count update
  gameSettings.rotationScore = 4 - dificulty;
  rotationCount.innerHTML = gameSettings.rotationScore;
  renderGameScores();
}

// Sets neceseraly vissables and hiden in game modal
function setVissablesAndHidden(dificulty) {
  // set up visability of game dificulty
  let text;

  switch (dificulty) {
    case 1:
      text = `Easy`;
      break;
    case 2:
      text = `Medium`;
      break;
    case 3:
      text = `Hard`;
      break;
    default:
      text = ``;
  }
  currentGameMode.innerHTML = text;
  gameModeVisibility.style.visibility = `visible`;

  // set up visabilities of resume game and hide game over message
  gameOverMessage.style.display = `none`;
  resumeButton.style.display = `block`;
}

// ----------------------------------------Must be disabled in order for automated test to run ------------------------------------ //
// functions setting game sound
volumeInput.addEventListener("input", (event) => {
  gameSettings.volume = event.target.value / 200;
  setGameVolume();
});
// ----------------------------------------Must be disabled in order for automated test to run ------------------------------------ //

function setGameVolume() {
  dropAudio.volume = gameSettings.volume;
  destroyAudio.volume = gameSettings.volume;
}

function setOldGameVolume() {
  volumeInput.value = gameSettings.volume * 200;
}

// setting screen dimentions and layout
function gameScreenDimentions() {
  const viewRatio = 3 / 5.5;
  let height, width;

  // Determines if height is bigger or with and decides witch way to set up 3x4 ratio.
  // after making this decition it check's for largest proportions to fit 3x4 ratio box

  if (container.clientWidth < container.clientHeight) {
    if (container.clientWidth / viewRatio < container.clientHeight) {
      width = "100%";
      height = `${container.clientWidth / viewRatio}px`;
    } else {
      height = "100%";
      width = `${container.clientHeight * viewRatio}px`;
    }
  } else {
    if (container.clientHeight / viewRatio < container.clientWidth) {
      height = "100%";
      width = `${container.clientHeight / viewRatio}px`;
    } else {
      width = "100%";
      height = `${container.clientWidth * viewRatio}px`;
    }
  }

  gameScreen.style.width = width;
  gameScreen.style.height = height;
}

// board screen dimentions calculations for loading up and on screen size change
function gameBoardAndScreenDimentions() {
  const gameScreenWidth = gameScreen.clientWidth;
  const gameScreenHeight = gameScreen.clientHeight;
  const maxDimension = Math.min(gameScreenWidth, gameScreenHeight);

  gameBoard.style.width = maxDimension + "px";
  gameBoard.style.height = maxDimension + "px";
  gameBoard.style.padding = maxDimension / 18 + "px";

  if (horizontalOrNot) {
    gameShapes.style.width = maxDimension + "px";
    gameShapes.style.height = maxDimension / 2 + "px";
    gameShapes.style.padding = maxDimension / 20 + "px";
    // setting layout of game board and pieces
    gameScreen.style.flexDirection = "column";
  } else {
    gameShapes.style.width = maxDimension / 2 + "px";
    gameShapes.style.padding = maxDimension / 20 + "px";
    gameShapes.style.height = maxDimension + "px";
    // setting layout of game board and pieces
    gameScreen.style.flexDirection = "row";
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

    const newGameBox = document.createElement("div");
    newGameBox.className = `game-box grid-row-${rowNumber} grid-column-${columnNumber} grid-square-${squareNumber} empty-field`;

    gameBoard.appendChild(newGameBox);
  }
}

// fills up board with old game data
function oldGameBoardGrid(oldStorage) {
  gameBoard.innerHTML = oldStorage.board;
}

// -------------------------------------------------------------------------------------

// Seting up the size and layout of game shapes windows as well as controll button window
function setShapesContainerSize() {
  let shapeAspectRatios, shapeDirection, iconsDirection, menuRatios;

  if (horizontalOrNot) {
    shapeAspectRatios = (gameShapes.offsetWidth / 10) * 4;
    shapeDirection = "row";
    menuRatios = gameShapes.offsetWidth / 6;
    iconsDirection = ["width", "height"];
  } else {
    shapeAspectRatios = (gameShapes.offsetHeight / 10) * 4;
    shapeDirection = "column";
    menuRatios = gameShapes.offsetHeight / 6;
    iconsDirection = ["height", "width"];
  }

  // set css for all shape window figures

  shapeWindows.forEach((shapeWindow) => {
    shapeWindow.style.width = shapeAspectRatios + "px";
    shapeWindow.style.height = shapeAspectRatios + "px";
  });

  gameShapes.style.flexDirection = shapeDirection;

  // set CSS for game controls buttons

  gameControls.style[iconsDirection[1]] = 2 * menuRatios + "px";
  gameControls.style[iconsDirection[0]] = 6 * menuRatios + "px";
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

//checks what week is current and what week was recorded last time, if it maches no changes done if it does not then resets highscores
function resetGameWeek() {
  // creates week number
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);

  if (gameSettings.gameWeek == weekNumber) return;

  gameSettings.gameWeek = weekNumber;
  gameSettings.easyWeekScore = 0;
  gameSettings.mediumWeekScore = 0;
  gameSettings.hardWeekScore = 0;
}
