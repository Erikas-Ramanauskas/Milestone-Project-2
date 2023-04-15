"use strict";

const draggables = [...document.querySelectorAll(".draggable")];
const gameBoxes = document.querySelectorAll(".game-box");
const screen = document.querySelector("#game-screen");

let shapesBoxesCoordinates = {};

let dropBoxesCenters = [];

findDropBoxesCenters();

draggables.forEach((element) => {
  element.addEventListener("mousedown", onMouseDown);
  element.addEventListener("dragstart", dragStart);
  element.addEventListener("dragend", dragEnd);
});

screen.addEventListener("dragover", dragOver);

function onMouseDown(e) {
  // recording were mouse was clicked
  shapesBoxesCoordinates.mouseDownX = e.pageX;
  shapesBoxesCoordinates.mouseDownY = e.pageY;
  shapesBoxesCoordinates.boxArray = [];
  e.target.parentElement.style.position = "absolute";
  e.target.parentElement.style.maxwidth = "absolute";

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
      info.id = parseInt(element.classList[2].split("-")[1]);

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

  // console.log(`drag Over`, `pageX:`, e.pageX + "px", `pageY`, e.pageY + "px");

  gameBoxes.forEach((element) => {
    element.classList.remove(`highlighted-square`);
  });

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
}

/**
 * Test dragable squares center location against dropboxes area to see which ones are maching
 * @param {number} mouseX Mouse X coordinates
 * @param {number} mouseY Mouse Y coordinates
 * @returns array of elements macthed, and true or false if all elements maches and the shape can be placed.
 */

function findingMacthingSquares(mouseX, mouseY) {
  let mactchedActiveSquares = [];

  // looping thought dragable boxes
  shapesBoxesCoordinates.boxArray.forEach((element) => {
    const boxCenterX = mouseX + element.distanceX;
    const boxCenterY = mouseY + element.distanceY;

    dropBoxesCenters.forEach((e) => {
      // checkign if the dragable box center coordinates are within a dropbox square
      const condition1 = boxCenterX > e.left;
      const condition2 = boxCenterX < e.right;
      const condition3 = boxCenterY > e.top;
      const condition4 = boxCenterY < e.bottom;

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

  gameBoxes.forEach((element) => {
    element.classList.remove(`highlighted-square`);
  });

  // getting mosue cordinates during the drop
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  const mactchedActiveSquares = findingMacthingSquares(mouseX, mouseY);

  if (mactchedActiveSquares[1]) {
    mactchedActiveSquares[0].forEach((element) => {
      element.classList.remove(`empty-field`);
      element.classList.add(`filled-field`);
      findDropBoxesCenters();
    });

    // clears out draggable box
    this.innerHTML = "";
  }

  // cleaning up data after drag ended
  shapesBoxesCoordinates = {};
}

// DragStart starst all events right after mouse event listeners and prevents mouse event listeners from hapening
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
  gameBoxes.forEach((element) => {
    // creating object for each of the the elements
    if (element.classList.contains(`empty-field`)) {
      const info = {};

      info.empty = element.classList[1] == "empty-field" ? true : false;

      const rect = element.getBoundingClientRect();

      // recording square dimention coordinates
      info.left = rect.left;
      info.right = rect.right;
      info.top = rect.top;
      info.bottom = rect.bottom;

      // taking id for the element
      info.id = parseInt(element.id.split("-")[2]);

      info.element = element;

      dropBoxesCenters.push(info);
    }
  });
}
