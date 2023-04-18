"use strict";

const draggables = document.getElementsByClassName("draggable");
const gameBoxes = document.getElementsByClassName("game-box");
const screen = document.querySelector("#game-screen");

let shapesBoxesCoordinates = {};

let dropBoxesCenters = [];

// runs when dificulity is selected and starts event listeners and fills the shapes
function gameStart() {
  gameStartShapesFill();
  findDropBoxesCenters();

  for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("mousedown", onMouseDown);
    draggables[i].addEventListener("dragstart", dragStart);
    draggables[i].addEventListener("dragend", dragEnd);
  }
}

function gameStartShapesFill() {
  for (let i = 0; i < shapeWindows.length; i++) {
    if (shapeWindows[i].innerHTML === "") {
      fillGameShape(shapeWindows[i]);
    }
  }
}

screen.addEventListener("dragover", dragOver);

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

// Drag over purpose is to find the mouse location on the screen
function dragOver(e) {
  e.preventDefault();

  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].classList.remove(`highlighted-square`);
    gameBoxes[i].classList.remove(`highlighted-square2`);
  }

  // The fallowing code determines if center of dragable boxes are within dropboxes.
  // getting mosue cordinates during drag
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  const mactchedActiveSquares = findingMacthingSquares(mouseX, mouseY);

  if (mactchedActiveSquares[1]) {
    mactchedActiveSquares[0].forEach((element) => {
      element.classList.add(`highlighted-square`);
    });
  }
  highlightTiles();
}

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

  if (mactchedActiveSquares[1]) {
    mactchedActiveSquares[0].forEach((element) => {
      element.classList.remove(`empty-field`);
      element.classList.add(`filled-field`);
    });

    // clears out draggable box and creates new draggable shape
    this.parentElement.innerHTML = "";
    gameStartShapesFill();

    // pick up a new created element parent from object that was created during onClick event
    const shapeWindowChild = shapesBoxesCoordinates.parent.children[0];

    // adds event listeners to new created element
    shapeWindowChild.addEventListener("mousedown", onMouseDown);
    shapeWindowChild.addEventListener("dragstart", dragStart);
    shapeWindowChild.addEventListener("dragend", dragEnd);
  }

  destroyTiles();
  findDropBoxesCenters();

  // cleaning up data after drag ended
  shapesBoxesCoordinates = {};
}

// DragStart starst all events right after mouse event listeners and prevents mouse event listeners from hapening
function dragStart() {
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
