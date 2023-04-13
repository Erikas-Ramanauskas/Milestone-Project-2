"use strict";

const draggables = [...document.querySelectorAll(".draggable")];
const gameBoxes = document.querySelectorAll(".game-box");
const screen = document.querySelector(".content");

const shapesBoxesCoordinates = {
  mouseDownX: 0,
  mouseDownY: 0,
  boxArray: [],
};

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
  const info = {};
  // recording all coordinates of were shapes centers are relative to the mouse
  siblings.forEach((element) => {
    const rect = element.getBoundingClientRect();

    // calculating half distance to the center
    info.halfX = rect.width / 2;
    info.halfY = rect.height / 2;

    // calculating center cordinates of the square
    info.cordinateX = rect.left + info.halfX;
    info.cordinateY = rect.top + info.halfY;

    // takign id for the element
    info.id = parseInt(element.classList[1].split("-")[1]);

    // pushing all collected data to an array
    shapesBoxesCoordinates.boxArray.push(info);
  });

  draggables.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.parentElement.classList.add("active");
}

// Drag over purpose is to find the mouse location on the screen
function dragOver(e) {
  e.preventDefault();
  // console.log(`drag Over`, `pageX:`, e.pageX + "px", `pageY`, e.pageY + "px");
}

//Drag end works like onMouseUp and does all events right after.
function dragEnd(e) {
  console.log("drag End");
  e.target.parentElement.classList.remove("active");
  this.classList.remove("invisible");
}

// DragStart starst all events right after mouse event listeners and prevents mouse event listeners from hapening
function dragStart(e) {
  setTimeout(() => this.classList.add("invisible"), 0);
  draggables.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.parentElement.classList.add("active");
}

//array containing information of all drop box centers

function findDropBoxesCenters() {
  gameBoxes.forEach((element) => {
    // creating object for each of the the elements
    const info = {};

    const rect = element.getBoundingClientRect();

    // calculating half distance to the center
    info.halfX = rect.width / 2;
    info.halfY = rect.height / 2;

    // calculating center cordinates of the square
    info.cordinateX = rect.left + info.halfX;
    info.cordinateY = rect.top + info.halfY;

    // takign id for the element
    info.id = parseInt(element.id.split("-")[2]);

    dropBoxesCenters.push(info);
  });
}
//Calling the function
