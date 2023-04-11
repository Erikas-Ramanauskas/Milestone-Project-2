//Variables

// list of all shapes to use for the game
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
    [true, false, true, true, false, true, false, true, false],
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

// Temporary variables

const temporaryShapesNo = 3;

// DOM elements
const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameShapes = $(`#game-shapes`);

// Custom variables

const gameScores = {
  turns: 0,
  totalScore: 0,
  shapeNumber: 0,
};

// Three diferent shape dificulities are set for the start of the game, then adjusted as a game progresses
// To set up game procentage using thousands instead of hundreds to be more precice on procentages

const gameDificulitySettings = {
  easyShapesProcentage: 955,
  mediumShapesProcentage: 30,
  hardShapesProcentage: 15,
  // the game
  mediumShapeMultiplier: 0.9, // 90%
  hardShapeMultiplier: 0.99, // 99%
};

//determines if screen is horizontal or vertical and this function used for many others as a variable.
function horizontalOrVertical() {
  return window.innerWidth < window.innerHeight; //true for vertical, false for horizontal
}

// Functions to call once the game loads
gameScreenDimentions();
gameBoardAndScreenDimentions();
newGameBoardGrid();
fillShapesContainer(temporaryShapesNo);
addRotationIcons();
setShapesContainerSize();

//-------- End of Functions to call on load-------

//-------------------------------------FUNCTIONS---------------------------
function gameScreenDimentions() {
  const viewRatio = 3 / 4;
  let height;
  let width;

  // Determines if height is bigger or with and decides witch way to set up 3x4 ratio.
  // after making this decition it check's for largest proportions to fit 3x4 ratio box
  if (horizontalOrVertical()) {
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

function gameBoardAndScreenDimentions() {
  const gameScreenWidth = gameScreen.innerWidth();
  const gameScreenHeight = gameScreen.innerHeight();
  const maxDimension = Math.min(gameScreenWidth, gameScreenHeight);

  gameBoard.css(`width`, maxDimension + `px`);
  gameBoard.css(`height`, maxDimension + `px`);

  if (horizontalOrVertical()) {
    gameShapes.css(`width`, maxDimension + `px`);
    gameShapes.css(`height`, maxDimension / 3 + `px`);
    gameScreen.css(`flex-direction`, `column`);
  } else {
    gameShapes.css(`width`, maxDimension / 3 + `px`);
    gameShapes.css(`height`, maxDimension + `px`);
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
      `<div class="grid-cell grid-row-${rowNumber} grid-column-${columnNumber} grid-square-${squareNumber}"></div>`
    );
  }
}

// random rounded number generator, *"barowed" from JS Course*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Game shapes function for start of the game and restarting the game
function fillShapesContainer(numSquares) {
  // Clear any existing content in the container
  gameShapes.html(``);
  for (let i = 0; i < numSquares; i++) {
    gameShapes.append(`<div class="shape-window"></div>`);
  }
}

function addRotationIcons() {
  gameShapes.prepend(
    `<div id="game-icons">
    <div class="game-icon" id="rotate-left" draggable="true"><i class="fa-solid fa-rotate-left"></i></div>
    <div class="game-icon" id="rotate-right" draggable="true"><i class="fa-solid fa-rotate-right"></i></div>
    <div class="game-icon" id="menu-icon"><i class="fa-solid fa-power-off"></i></div>
    </div>`
  );
}

// -------------------------------------------------------------------------------------

function setShapesContainerSize() {
  let shapeAspectRatios;
  let shapeWindowMargin;
  let shapeDirection;
  let iconsDirection;

  if (horizontalOrVertical()) {
    // if screen is horizontal
    shapeAspectRatios = (gameShapes.outerWidth() / temporaryShapesNo) * 0.7;
    shapeWindowMargin = (gameShapes.outerWidth() / temporaryShapesNo) * 0.1;
    shapeDirection = `row`;
    iconsDirection = [`column`, `height`, `width`];
  } else {
    // if screen is vertical
    shapeAspectRatios = (gameShapes.outerHeight() / temporaryShapesNo) * 0.7;
    shapeWindowMargin = (gameShapes.outerHeight() / temporaryShapesNo) * 0.1;
    shapeDirection = `column`;
    iconsDirection = [`row`, `width`, `height`];
  }

  // sets css for all shape window figures
  $(`.shape-window`).css(`width`, shapeAspectRatios).css(`height`, shapeAspectRatios).css(`margin`, shapeWindowMargin);
  gameShapes.css(`flex-direction`, shapeDirection);
  $(`#game-icons`)
    .css(`flex-direction`, iconsDirection[0])
    .css(iconsDirection[1], shapeAspectRatios)
    .css(iconsDirection[2], `auto`);
  $(`.game-icon`)
    .css(`height`, shapeAspectRatios / 3)
    .css(`width`, shapeAspectRatios / 3);
}

//-------------------------------------- Shapes formulas ------------------------------------------------------

// Choses between easy/medium/or hard shape based on the procentages at the current stage
// this helps to control games progresive dificulity.
function choseRandomShapeDificulity() {
  const easyShapeChance = gameDificulitySettings.easyShapesProcentage; // the number will be highest number roled starting(0-955) (95.5%)
  const mediumShapeChance = gameDificulitySettings.mediumShapesProcentage + easyShapeChance;
  const chance = randomInt(0, 1000);

  //depending on the number roll we check first if it is higher than easy range (starting at 0 to 955)
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
  let array = choseRandomShapeDificulity()[randomInt(0, 9)];
  return rotateTile(array, randomInt(0, 3));
}

// Create shape HTML for a single window out of given shape array
function crateGameShapeHTML(shapeArray) {
  let shapeHTML = "";
  shapeArray.forEach((e) => (shapeHTML += e ? `<div class="shape-block-on">` : `<div class="shape-block-off">`));
  return shapeHTML;
}

// take given shape window, clear it out and fill it up with new shape details.

//--------------------------------END OF FUNCTIONS--------------------------------

// Event listeners to call if screen dimentions change
window.addEventListener(`resize`, gameScreenDimentions);
window.addEventListener(`resize`, gameBoardAndScreenDimentions);
window.addEventListener(`resize`, setShapesContainerSize);
