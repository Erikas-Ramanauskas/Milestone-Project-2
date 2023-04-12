const fills = document.querySelectorAll(`.fill`);
const empties = document.querySelectorAll(`.empty`);

// for (let i = 0; i < fills.length; i++) {
//  fills[i].addEventListener(`dragstart`, dragStart);
// }

for (let i = 0; i < empties.length; i++) {
  empties[i].addEventListener(`dragend`, dragEnd);
  empties[i].addEventListener(`dragover`, dragOver);
  empties[i].addEventListener(`dragenter`, dragEnter);
  empties[i].addEventListener(`draleave`, dragLeave);
  empties[i].addEventListener(`drop`, dragDrop);
}

function dragStart() {
  this.className += ` hold`;
  setTimeout(() => (this.className = `invisible`), 0);
}

function dragEnd() {
  this.className = `dropbox fill`;
}

function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  this.className += ` hovered`;
}
function dragLeave() {
  this.className = ` hold`;
}
function dragDrop() {
  this.className = `empty`;
  this.append(fill);
}

fills.forEach((square) => {
  square.addEventListener("dragstart", (event) => {
    fills.forEach((square) => {
      if (square !== event.target) {
        console.log(square.innerHTML, `dragstart`);
        square.classList.remove("fill");
        square.removeEventListener("dragstart", (event) => {
          event.preventDefault();
        });
        square.dispatchEvent(new Event("dragstart"));
      }
    });
  });
});

// pickElements.forEach((square) => {
//     square.addEventListener("dragstart", (event) => {
//       event.preventDefault()
//     // Remove the active class from all buttons
//     pickElements.forEach((square) => {
//       square.classList.remove("pick");
//     });
//   });
// });
