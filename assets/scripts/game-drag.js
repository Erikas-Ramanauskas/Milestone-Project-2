"use strict";

// This is 3rd game js file working with drag and drop functionality and calling functions when sucsessfull drop is made.

const draggables = document.getElementsByClassName("draggable");
const gameBoxes = document.getElementsByClassName("game-box");
const screen = document.querySelector("#game-screen");

// game square coorodinates that are used with drag start
let shapesBoxesCoordinates = {};

// game board cooridantes used with drag start
let dropBoxesCenters = [];

function gameStartShapesFill() {
  for (let i = 0; i < shapeWindows.length; i++) {
    if (shapeWindows[i].innerHTML === "") {
      fillGameShape(shapeWindows[i]);
    }
  }
}

screen.addEventListener("dragover", dragOver);

// reacts when the mouses is pressed on one of tthe shapes
function onMouseDown(e) {
  shapesBoxesCoordinates = {};
  // recording shapeWindow element to use once element is droped
  shapesBoxesCoordinates.parent = e.target.parentElement.parentElement;
  // recording were mouse was clicked
  shapesBoxesCoordinates.mouseDownX = e.pageX;
  shapesBoxesCoordinates.mouseDownY = e.pageY;
  shapesBoxesCoordinates.boxArray = [];

  const siblings = [...e.target.parentElement.children];

  // recording all coordinates of were shapes centers are relative to the mouse
  // checks if the box is active as others are not needed
  siblings.forEach((element) => {
    if (element.classList.contains(`filled-box`)) {
      const info = {};
      const rect = element.getBoundingClientRect();

      // calculating half distance to the center
      info.halfX = rect.width / 2;
      info.halfY = rect.height / 2;

      // calculating center cordinates of the square at the time of mouse down
      info.cordinateX = rect.left + info.halfX;
      info.cordinateY = rect.top + info.halfY;

      // calculationg distance from square center to the mouse
      info.distanceX = info.cordinateX - shapesBoxesCoordinates.mouseDownX;
      info.distanceY = info.cordinateY - shapesBoxesCoordinates.mouseDownY;

      // takign id for the element
      info.id = parseInt(element.classList[1].split("-")[1]);

      // records entire element
      info.element = element;

      // pushing all collected data to an array
      shapesBoxesCoordinates.boxArray.push(info);
    }
  });
}

// DragStart starts all events right after mouse event listeners and prevents mouse event listeners from hapening
// however during
function dragStart(e) {
  setTimeout(() => this.classList.add("invisible"), 0);
}

/**
 * Records all drop boxes outer edges in to "dropBoxesCenters" array for later use to match with dragable boxes
 * should be only use at the begining of the game and when the screen is being resized
 */
function findDropBoxesCenters() {
  // clears old information
  dropBoxesCenters = [];

  // loops though all boxes to return information
  for (let i = 0; i < gameBoxes.length; i++) {
    // creating object for each of the the elements
    if (gameBoxes[i].classList.contains(`empty-field`)) {
      const info = {};

      info.empty = gameBoxes[i].classList[1] == "empty-field" ? true : false;

      const rect = gameBoxes[i].getBoundingClientRect();

      // recording square dimention coordinates
      info.left = rect.left;
      info.right = rect.right;
      info.top = rect.top;
      info.bottom = rect.bottom;

      // taking id for the element
      info.id = parseInt(gameBoxes[i].id.split("-")[2]);

      info.element = gameBoxes[i];

      dropBoxesCenters.push(info);
    }
  }
}

// Drag over purpose is to find the mouse location on the screen
function dragOver(e) {
  e.preventDefault();

  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].classList.remove(`highlighted-square`);
    gameBoxes[i].classList.remove(`highlighted-square2`);
  }

  // The fallowing code determines if center of dragable boxes are within dropboxes.
  // getting mouse cordinates during drag
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  const mactchedActiveSquares = findingMacthingSquares(mouseX, mouseY);

  if (mactchedActiveSquares[1]) {
    mactchedActiveSquares[0].forEach((element) => {
      element.classList.add(`highlighted-square`);
    });
  }
  highlightTiles(`highlight`);
}

//Drag end works like onMouseUp and does all events right after.
// used this instead of mouse up because while using draggable property mouse events dont triger.
function dragEnd(e) {
  this.classList.remove("invisible");

  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].classList.remove(`highlighted-square`);
    gameBoxes[i].classList.remove(`highlighted-square2`);
  }

  // getting mosue cordinates during the drop
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  const mactchedActiveSquares = findingMacthingSquares(mouseX, mouseY);

  // introduced this to counter a bug that happens when on mouse click event that does not triger when drag starts as it does not record the data for drop boxes
  const bugCheck = mactchedActiveSquares[0].length > 0;

  if (mactchedActiveSquares[1] && bugCheck) {
    // adds to the game turn after sucsessfull drop and adjust the shape dificulty
    gameDificulityAdjustment();

    mactchedActiveSquares[0].forEach((element) => {
      element.classList.remove(`empty-field`);
      element.classList.add(`filled-field`);
    });

    // check for meched tiles and destroy them
    const sound = highlightTiles(`destroy`);
    // If tiles are destroyed prevent drop audio otherwise play it.
    sound ? `` : playAudio(`drop`);

    // clears out draggable box and creates new draggable shape
    this.parentElement.innerHTML = "";
    gameStartShapesFill();
  }

  findDropBoxesCenters();
  // introduced this function due to a bug that if the shape missed a spot and did not register new shape event listeners are not added
  addNewEventListeners(`reset`);

  // cleaning up data after drag ended
  shapesBoxesCoordinates = {};

  // check if it is game over
  trigerGameOverCheck();

  // Clean and push new shapes data for local storage
  gameData.shapes = [];
  storeGameShapes();

  // Clean and push new game board data for local storage
  gameData.board = ``;
  storeGameBoard();

  setLocalStorage();
}

// Requires remove/add/reset action to work. effects draggable squares
function addNewEventListeners(action) {
  const draggables = document.getElementsByClassName(`draggable`);
  for (let i = 0; i < draggables.length; i++) {
    if (action === `remove`) {
      draggables[i].removeEventListener("mousedown", onMouseDown);
      draggables[i].removeEventListener("dragstart", dragStart);
      draggables[i].removeEventListener("dragend", dragEnd);
    } else if (action === `add`) {
      draggables[i].addEventListener("mousedown", onMouseDown);
      draggables[i].addEventListener("dragstart", dragStart);
      draggables[i].addEventListener("dragend", dragEnd);
    } else if (action === `reset`) {
      draggables[i].removeEventListener("mousedown", onMouseDown);
      draggables[i].removeEventListener("dragstart", dragStart);
      draggables[i].removeEventListener("dragend", dragEnd);

      draggables[i].addEventListener("mousedown", onMouseDown);
      draggables[i].addEventListener("dragstart", dragStart);
      draggables[i].addEventListener("dragend", dragEnd);
    } else {
      throw new Error(`Event listener action was not given`);
    }
  }
}
