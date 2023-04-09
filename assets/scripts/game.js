//Variables

// list of all shapes to use
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

const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameShapes = $(`#game-shapes`);

// Functions to call once the game loads
gameScreenDimentions();
gameBoardAndScreenDimentions();
newGameBoardGrid();

//-------- End of Functions to call on load-------

//-------------------------------------FUNCTIONS---------------------------
function gameScreenDimentions() {
  let viewRatio = 3 / 4;
  let height;
  let width;

  // Determines if height is bigger and with and decides witch way to set up 3x4 ratio.
  // after making this decition it checks for highest proportions to fit 3x4 ratio box
  if (window.innerWidth < window.innerHeight) {
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
  gameScreen.css(`width`, width);
  gameScreen.css(`height`, height);
}

function gameBoardAndScreenDimentions() {
  const gameScreenWidth = gameScreen.innerWidth();
  const gameScreenHeight = gameScreen.innerHeight();
  const maxDimension = Math.min(gameScreenWidth, gameScreenHeight);

  gameBoard.css(`width`, maxDimension + `px`);
  gameBoard.css(`height`, maxDimension + `px`);

  if (window.innerWidth < window.innerHeight) {
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

// Shapes array rearanging function to create new shapes by fliping it clockwise
function flipTile(array, timesToFlip) {
  // determening if the shape firsin 1x1 , 2x2, 3x3, or 4x4
  const shapeDimentionlenght = Math.sqrt(array.length);

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
        throw new Error("shape found");
    }
    finalArray = [...newArray];
    i++;
  }
  return finalArray;
}

//--------------------------------END OF FUNCTIONS--------------------------------

// Event listeners to call if screen dimentions change
window.addEventListener(`resize`, gameScreenDimentions);
window.addEventListener(`resize`, gameBoardAndScreenDimentions);
