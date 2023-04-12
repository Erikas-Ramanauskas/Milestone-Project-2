// const pick = document.querySelectorAll(`.pick`);
const drop = document.querySelectorAll(`.drop`);

// for (let i = 0; i < pick.length; i++) {
//   pick[i].addEventListener(`dragstart`, dragStart);

//   pick[i].addEventListener(`dragend`, dragEnd);
// }

// function dragStart() {
//   this.className += ` hold`;
//   setTimeout(() => (this.className = `invisible`), 0);
// }

// function dragEnd() {
//   this.className = `dropbox pick`;
// }

const pickElements = document.querySelectorAll(".pick");
const pickElements2 = document.querySelectorAll(".pick2");

pickElements.forEach((square) => {
  square.addEventListener("dragstart", (event) => {
    // Remove the active class from all buttons
    pickElements.forEach((square) => {
      square.classList.remove("pick");
    });

    // Add the active class to the clicked button
    const pickedSquare = event.target;
    pickedSquare.classList.add(".pick");

    // Simulate a click event on all the other buttons
    pickElements2.forEach((square) => {
      if (square !== pickedSquare) {
        square.dispatchEvent(new Event("dragstart"));
      }
    });
  });
});
