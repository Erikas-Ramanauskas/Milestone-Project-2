"use strict";

// this function detects when ever the is row/column/3x3 square match
function destroyTiles() {
  // set records tiles when one of the rows, columns or squares reaches 9 (maximum) and it helps with sorting out dublication in case row and column crosses
  const recordTiles = new Set();

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
    for (let i = 0; i < 9; i++) {
      if (rows[i].classList.contains("filled-field")) row.push(rows[i]);
    }
    for (let i = 0; i < 9; i++) {
      if (columns[i].classList.contains("filled-field")) column.push(columns[i]);
    }
    for (let i = 0; i < 9; i++) {
      if (squares[i].classList.contains("filled-field")) square.push(squares[i]);
    }

    // looping though full group of 9 that is filled and pushing to set
    if (row.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(row[i]);
      }
    }
    if (column.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(column[i]);
      }
    }
    if (square.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(square[i]);
      }
    }
  }

  if (recordTiles.size > 0) {
    recordTiles.forEach((e) => {
      e.classList.remove(`filled-field`);
      e.classList.add(`empty-field`);
    });
  }
}

// Does exacly the same thing as function above but wiht highlighted squares (with draged shape over)
function highlightTiles() {
  // set records tiles when one of the rows, columns or squares reaches 9 (maximum) and it helps with sorting out dublication in case row and column crosses
  const recordTiles = new Set();

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

    console.log(rows[i].classList.contains("filled-field"));

    // Looping though groups to find filled tiles
    for (let i = 0; i < 9; i++) {
      if (rows[i].classList.contains("filled-field") || rows[i].classList.contains(`highlighted-square`))
        row.push(rows[i]);
    }
    for (let i = 0; i < 9; i++) {
      if (columns[i].classList.contains("filled-field") || columns[i].classList.contains(`highlighted-square`))
        column.push(columns[i]);
    }
    for (let i = 0; i < 9; i++) {
      if (squares[i].classList.contains("filled-field") || squares[i].classList.contains(`highlighted-square`))
        square.push(squares[i]);
    }

    // looping though full group of 9 that is filled and pushing to set
    if (row.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(row[i]);
      }
    }
    if (column.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(column[i]);
      }
    }
    if (square.length == 9) {
      for (let i = 0; i < 9; i++) {
        recordTiles.add(square[i]);
      }
    }
  }

  console.log(recordTiles);
  if (recordTiles.size > 0) {
    recordTiles.forEach((e) => {
      e.classList.add(`highlighted-square2`);
    });
  }
}
