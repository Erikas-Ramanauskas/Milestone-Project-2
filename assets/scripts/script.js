"use strict";

const draggables = [...document.querySelectorAll(".draggable")];
const gameBoxes = document.querySelectorAll(".game-box");
const screen = document.querySelector(".content");

let shapesBoxesCoordinates = {};

const dropBoxesCenters = [];

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

  // setting up array of squares that is hovered on
  let activeSquares = [];

  // looping thought dragable boxes
  shapesBoxesCoordinates.boxArray.forEach((element) => {
    const boxCenterX = mouseX + element.distanceX;
    const boxCenterY = mouseY + element.distanceY;

    dropBoxesCenters.forEach((e) => {
      // checkign ib the dragable box center coordinates are within a square
      const condition1 = boxCenterX > e.left;
      const condition2 = boxCenterX < e.right;
      const condition3 = boxCenterY > e.top;
      const condition4 = boxCenterY < e.bottom;

      if (condition1 && condition2 && condition3 && condition4) {
        activeSquares.push(e.element);
      }
    });
  });

  if (activeSquares.length === shapesBoxesCoordinates.boxArray.length) {
    activeSquares.forEach((element) => {
      element.classList.add(`highlighted-square`);
    });
  }
}

//Drag end works like onMouseUp and does all events right after.
function dragEnd(e) {
  this.classList.remove("invisible");

  // cleaning up data after drag ended
  shapesBoxesCoordinates = {};

  gameBoxes.forEach((element) => {
    element.classList.remove(`highlighted-square`);
  });

  // draging cordinates calculation
}

// DragStart starst all events right after mouse event listeners and prevents mouse event listeners from hapening
function dragStart(e) {
  setTimeout(() => this.classList.add("invisible"), 0);
}

//array containing information of all drop box centers

function findDropBoxesCenters() {
  gameBoxes.forEach((element) => {
    // creating object for each of the the elements
    if (element.classList.contains(`empty-field`)) {
      const info = {};

      const rect = element.getBoundingClientRect();
      console.log(rect);

      // recording square dimention coordinates
      info.left = rect.left;
      info.right = rect.right;
      info.top = rect.top;
      info.bottom = rect.bottom;

      // takign id for the element
      info.id = parseInt(element.id.split("-")[2]);

      info.element = element;

      dropBoxesCenters.push(info);
    }
  });
}
