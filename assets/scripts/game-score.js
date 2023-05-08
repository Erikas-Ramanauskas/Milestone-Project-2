"use strict";

// Last file for game files group, this works with detecting sucsessfull shape drops, counting score, and seeting dificulty levels

// I left variables for scores in game-setup file to keep all in one place it is being used in other files.

/**
 * Test dragable squares center location against dropboxes area to see which ones are maching
 * @param {number} mouseX Mouse X coordinates
 * @param {number} mouseY Mouse Y coordinates
 * @returns array of elements matched, and true or false if all elements maches and the shape can be placed.
 */
function findingMacthingSquares(mouseX, mouseY) {
  let mactchedActiveSquares = [];

  // looping thought dragable boxes
  shapesBoxesCoordinates.boxArray.forEach((element) => {
    const boxCenterX = mouseX + element.distanceX;
    const boxCenterY = mouseY + element.distanceY;

    dropBoxesCenters.forEach((e) => {
      // checkign if the dragable box center coordinates are within a dropbox square
      // added 1% reduction in avialable size due to shapes catching squares they should not
      const condition1 = boxCenterX > e.left * 1.01;
      const condition2 = boxCenterX < e.right / 1.01;
      const condition3 = boxCenterY > e.top * 1.01;
      const condition4 = boxCenterY < e.bottom / 1.01;

      if (condition1 && condition2 && condition3 && condition4) {
        mactchedActiveSquares.push(e.element);
      }
    });
  });

  // checks mached active squares agains the dragable shape box array, if the mount maches this meanst the shape can be droped there.
  const dropableOrNot = mactchedActiveSquares.length === shapesBoxesCoordinates.boxArray.length;

  return [mactchedActiveSquares, dropableOrNot];
}

// function detects when ever the is row/column/3x3 square match, and depending on condition either highlight or destroy tiles
function highlightTiles(condition) {
  // true for highlight tiles and false for only destroying
  const highlightOrDestroy = condition === "highlight" ? true : false;
  // set records tiles when one of the rows, columns or squares reaches 9 (maximum) and it helps with sorting out dublication in case row and column crosses
  const recordTiles = new Set();
  // records the game score regardles of how many tiles is destroyed, it calculates how many rows, collumns or squares are destroyed in one go
  let gameBaseScore = 0;

  // multiple loops to loop though rows, then colums and squares finding out wich ones are full and then pushign it to set.
  for (let i = 0; i < 9; i++) {
    // getting individual row
    const rows = document.getElementsByClassName(`grid-row-${i}`);
    const columns = document.getElementsByClassName(`grid-column-${i}`);
    const squares = document.getElementsByClassName(`grid-square-${i}`);

    // creating group arrays to record if it reaches 9
    let row = [];
    let column = [];
    let square = [];

    // Looping though groups to find filled tiles
    // in case it is highlight (true) it test for squares that player hovers the shape as well and for destroy (false) it takes this option away.
    for (let i = 0; i < 9; i++) {
      const test =
        rows[i].classList.contains("filled-field") ||
        (rows[i].classList.contains(`highlighted-square`) && highlightOrDestroy);
      if (test) row.push(rows[i]);
    }
    for (let i = 0; i < 9; i++) {
      const test =
        columns[i].classList.contains("filled-field") ||
        (columns[i].classList.contains(`highlighted-square`) && highlightOrDestroy);
      if (test) column.push(columns[i]);
    }
    for (let i = 0; i < 9; i++) {
      const test =
        squares[i].classList.contains("filled-field") ||
        (squares[i].classList.contains(`highlighted-square`) && highlightOrDestroy);
      if (test) square.push(squares[i]);
    }

    // looping though full group of 9 that is filled and pushing to set
    if (row.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(row[i]);
        gameBaseScore++;
      }
    }
    if (column.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(column[i]);
        gameBaseScore++;
      }
    }
    if (square.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(square[i]);
        gameBaseScore++;
      }
    }
  }

  // dificulty testing is added for higher dificulities as i would like to disable highlight for hard mode
  const dificulty = gameSettings.dificulty;

  if (recordTiles.size > 0) {
    recordTiles.forEach((e) => {
      if (highlightOrDestroy && dificulty < 4) {
        e.classList.add(`highlighted-square2`);
      } else if (!highlightOrDestroy) {
        e.classList.remove(`filled-field`);
        e.classList.add(`empty-field`);
      }
    });

    // play destruction sound if tiles are destroyed
    if (!highlightOrDestroy) {
      playAudio(`destroy`);
      // checks for combination and calculates potins acordingly
      gameChangeUpdate(gameBaseScore);

      return true;
    }
  }
}

function trigerGameOverCheck() {
  // checks if a player still has some turns left

  const draggables = document.getElementsByClassName(`draggable`);
  const gameBoard = document.getElementById(`game-board`).children;

  const gameBoardArray = arrayFromHTML(gameBoard);
  let draggablesArray = [];

  for (let draggable of draggables) {
    draggablesArray.push(arrayFromHTML(draggable.children));
  }

  // fallowing check if player has still one or more rotations and pushes posible rotated shapes in to array
  if (gameSettings.rotationScore > 0) {
    for (let draggable of draggables) {
      const draggableArray = arrayFromHTML(draggable.children).flat();

      // checks for only left and right rotations
      const draggableRight = rotateShape(draggableArray, 1);
      const draggableLeft = rotateShape(draggableArray, 3);

      const draggableMatrixRight = matrixFromArray(draggableRight);
      const draggableMatrixLeft = matrixFromArray(draggableLeft);

      draggablesArray.push(draggableMatrixRight);
      draggablesArray.push(draggableMatrixLeft);

      // check for double rotation as well if player has more than 1 rotation point
      if (gameSettings.rotationScore > 1) {
        const draggable180 = rotateShape(draggableArray, 2);
        const draggableMatrix180 = matrixFromArray(draggable180);
        draggablesArray.push(draggableMatrix180);
      }
    }
  }

  // alowing time to return new shape
  setTimeout(function () {
    // shows meniu options once the game is over
    if (!checkForGameOver(gameBoardArray, draggablesArray)) {
      // changes resume button to game over message
      gameOverScore.innerHTML = Math.floor(gameSettings.currentScore);
      gameOverMessage.style.display = `block`;
      resumeButton.style.display = `none`;
      menuModal.show();
      gamesCount();
    }
  }, 1000);
}

// the function checks if there are any more space for either of shapes to fit in. and returns either true or false

function checkForGameOver(gameBoardArray, draggablesArray) {
  // if a match found it is changed to true and all loops ends as well as game continues
  let matchFound = false;

  for (let shape of draggablesArray) {
    // using function to reduce shape size if there are unused rows or columns
    // the function will not work if the shape has gap and no ajecent blocks
    const newShape = reduceShapeMatrix(shape);

    const shapeColumns = newShape[0].length;
    const shapeRows = newShape.length;
    // declaring a limit on were the shape can be. for example shape size 3x3 first square can be at 0-6 row or column to not go over the edge
    const columnLimit = 10 - shapeColumns;
    const rowLimit = 10 - shapeRows;

    // first two loops positions the shape at the grid chosing the first square of grid as starting point
    for (let c = 0; c < columnLimit; c++) {
      for (let r = 0; r < rowLimit; r++) {
        // next 2 loops determines wich shape square is being checked against the grid
        for (let sr = 0; sr < shapeRows; sr++) {
          // checks if individual boxes can fit, every time it finds it does not fit it breaks both loops
          // how ever if it find a match in all loops and goes though both at the end it declares matchFound as true and ends all loops
          let endloop = false;
          for (let sc = 0; sc < shapeColumns; sc++) {
            // shapes square position is added to current board position to mach each shape
            if (gameBoardArray[r + sr][c + sc] && newShape[sr][sc]) {
              endloop = true;
              break;
            }
          }
          if (endloop) break;
          if (sr === shapeRows - 1) {
            matchFound = true;
          }
        }
        if (matchFound) break;
      }
      if (matchFound) break;
    }
    if (matchFound) break;
  }

  // if it goes though all of the loops without finding match false is returned indicating that no more space avialable
  return matchFound;
}

// this functions goal is to reduce entire matrix and delete unused rows or colums so the shape can be later checked against the board
// Note that this function will break the previous fuctionality if the shapes with gap of row or column in the shape would be introduced.
function reduceShapeMatrix(matrix) {
  const matrixLenght = matrix.length;
  let newMatrix = [...matrix];

  // Deletes the rows and columns that has no active squares
  // In all cases starting from the end and working backwards as otherwise it would skip the rows or colums.
  for (let i = matrixLenght - 1; i > -1; i--) {
    // clears out rows if they dont have any active squares
    if (!newMatrix[i].includes(true)) newMatrix.splice(i, 1);

    // two loops: one is filling array for the column to check if every matrix row's index contains false
    // if it does second array deletes the same index at every row
    let column = [];
    for (let u = newMatrix.length - 1; u > -1; u--) {
      column.push(newMatrix[u][i]);
    }
    if (!column.includes(true)) {
      for (let u = newMatrix.length - 1; u > -1; u--) {
        newMatrix[u].splice(i, 1);
      }
    }
  }
  return newMatrix;
}

// this is callled every time the shape is droped in a game box pushing the turns and recalculating shape procentages
function gameDificulityAdjustment() {
  gameSettings.turn++;
  shapeDificulityAdjustment(gameSettings.turn);
}

// adjusts shapes procentage acording game turn
// can be used during a game or every time the game loaded from memory
function shapeDificulityAdjustment(gameTurn) {
  let mediumShapes = gameSettings.mediumBaseProcentage;
  let hardShapes = gameSettings.hardBaseProcentage;

  const mediumMultiplier = gameSettings.mediumShapeMultiplier;
  const hardMultiplier = gameSettings.hardShapeMultiplier;

  const mediumShapeTurn = gameSettings.mediumShapeTurn;
  const hardShapeTurn = gameSettings.hardShapeTurn;

  // the fallowing delays modification until a certain game turn
  if (gameTurn >= mediumShapeTurn) {
    mediumShapes = shapeDificulityMultiplication(mediumShapes, mediumMultiplier, gameTurn - mediumShapeTurn);
  }
  if (gameTurn >= hardShapeTurn) {
    hardShapes = shapeDificulityMultiplication(hardShapes, hardMultiplier, gameTurn - hardShapeTurn);
  }

  gameSettings.easyShapesProcentage = 1000 - mediumShapes - hardShapes;
  gameSettings.mediumShapesProcentage = mediumShapes;
  gameSettings.hardShapesProcentage = hardShapes;
}

// this function calculates a chancefor medium and hard shapes to be drafted.
function shapeDificulityMultiplication(baseProc, multiplier, gameTurn) {
  let newProc = baseProc;
  for (let i = 0; i < gameTurn; i++) {
    // fallowing formula creates diminishing returns with each game turn but capping at 45% if player ever reches this point
    if (newProc > 449) {
      newProc = newProc;
    } else {
      newProc = Math.ceil(newProc + baseProc * Math.pow(multiplier, i));
    }
  }
  return newProc;
}

// plays specific audios when called
function playAudio(sound) {
  switch (sound) {
    case `drop`:
      dropAudio.play();
      break;
    case `destroy`:
      destroyAudio.play();
      break;
  }
}

// game scores update
function gameChangeUpdate(baseScore) {
  // check if there is a combination and multiply score reward , updates data and pushes to html
  const dificulityAdjustedScore = (gameSettings.dificulty - 1) * 0.2 * baseScore + baseScore;

  const newGameScore = baseScore > 9 ? dificulityAdjustedScore * 1.5 : dificulityAdjustedScore;
  gameSettings.currentScore += newGameScore;

  // checking how many points will be added to rotations
  const noOfRotations = baseScore / 9 - gameSettings.dificulty;
  gameSettings.rotationScore += noOfRotations > 0 ? noOfRotations : 0;

  //
  switch (gameSettings.dificulty) {
    case 1:
      gameSettings.easyWeekScore =
        gameSettings.easyWeekScore < gameSettings.currentScore ? gameSettings.currentScore : gameSettings.easyWeekScore;

      gameSettings.easyHighestScore =
        gameSettings.easyHighestScore < gameSettings.currentScore
          ? gameSettings.currentScore
          : gameSettings.easyHighestScore;

      break;
    case 2:
      gameSettings.mediumWeekScore =
        gameSettings.mediumWeekScore < gameSettings.currentScore
          ? gameSettings.currentScore
          : gameSettings.mediumWeekScore;

      gameSettings.mediumHighestScore =
        gameSettings.mediumHighestScore < gameSettings.currentScore
          ? gameSettings.currentScore
          : gameSettings.mediumHighestScore;
      break;
    case 3:
      gameSettings.hardWeekScore =
        gameSettings.hardWeekScore < gameSettings.currentScore ? gameSettings.currentScore : gameSettings.hardWeekScore;

      gameSettings.hardHighestScore =
        gameSettings.hardHighestScore < gameSettings.currentScore
          ? gameSettings.currentScore
          : gameSettings.hardHighestScore;
      break;
    default:
      throw console.error(`game dificulty not found`);
  }

  renderGameScores();
}

// game scores update
function renderGameScores() {
  currentScoreCount.innerHTML = Math.floor(gameSettings.currentScore);
  rotationCount.innerHTML = gameSettings.rotationScore;

  let weekOrTotal;
  switch (gameSettings.dificulty) {
    case 1:
      gameSettings.highestScore =
        gameSettings.easyHighestScore > gameSettings.easyWeekScore
          ? gameSettings.easyHighestScore
          : gameSettings.easyWeekScore;

      weekOrTotal = gameSettings.easyHighestScore > gameSettings.easyWeekScore;

      break;
    case 2:
      gameSettings.highestScore =
        gameSettings.mediumHighestScore > gameSettings.mediumWeekScore
          ? gameSettings.mediumHighestScore
          : gameSettings.mediumWeekScore;

      weekOrTotal = gameSettings.mediumHighestScore > gameSettings.mediumWeekScore;
      break;
    case 3:
      gameSettings.highestScore =
        gameSettings.hardHighestScore > gameSettings.hardWeekScore
          ? gameSettings.hardHighestScore
          : gameSettings.hardWeekScore;

      weekOrTotal = gameSettings.hardHighestScore > gameSettings.hardWeekScore;
      break;
    default:
      throw console.error(`game dificulty not found`);
  }

  if (!weekOrTotal) {
    highScoreText.innerHTML = `High-score:`;
  } else {
    highScoreText.innerHTML = `Best of Week:`;
  }
  highScoreCount.innerHTML = Math.floor(gameSettings.highestScore);
}

function gamesCount() {
  switch (gameSettings.dificulty) {
    case 1:
      gameSettings.easyGamesPlayed++;
      break;
    case 2:
      gameSettings.mediumGamesPlayed++;
      break;
    case 3:
      gameSettings.hardGamesPlayed++;
      break;
    default:
      throw console.error(`game dificulty not found`);
  }
}
