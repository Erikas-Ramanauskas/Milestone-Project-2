//Variables

const gameScreen = $(`#game-screen`);
const gameBoard = $(`#game-board`);
const gameShapes = $(`#game-shapes`);


// Functions to call once the game loads
gameScreenDimentions();
gameBoardAndScreenDimentions();

//-------- End of Functions to call on load-------


function gameScreenDimentions() {
    let viewRatio = 3 / 4;
    let height
    let width

    // Determines if height is bigger and with and decides witch way to set up 3x4 ratio.
    // after making this decition it checks for highest proportions to fit 3x4 ratio box
    if (window.innerWidth < window.innerHeight) {
        if ((window.innerWidth / viewRatio) < window.innerHeight) {
            width = `100%`;
            height = `${window.innerWidth / viewRatio}px`;
        } else {
            height = `100%`;
            width = `${window.innerHeight * viewRatio}px`;
        }
    } else {
        if ((window.innerHeight / viewRatio) < window.innerWidth) {
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

    gameBoard.css(`width`, maxDimension + `px`)
    gameBoard.css(`height`, maxDimension + `px`)

    if (window.innerWidth < window.innerHeight) {
        gameShapes.css(`width`, maxDimension + `px`)
        gameShapes.css(`height`, maxDimension / 3 + `px`)
        gameScreen.css(`flex-direction`, `column`)
    } else {
        gameShapes.css(`width`, maxDimension / 3 + `px`)
        gameShapes.css(`height`, maxDimension + `px`)
        gameScreen.css(`flex-direction`, `row`)
    }
}


// Event listeners to call if screen dimentions change
window.addEventListener(`resize`, gameScreenDimentions);
window.addEventListener(`resize`, gameBoardAndScreenDimentions);