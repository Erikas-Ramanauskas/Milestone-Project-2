"use strict";

// this file is working with local storage and saving highscores and current game

// used during the game to update and store game data to upload later
function setLocalStorage() {
  localStorage.setItem(`gameSetting`, JSON.stringify(gameSettings));
  localStorage.setItem(`gameData`, JSON.stringify(gameData));
}

// used when game is loaded
function getLocalStorage() {
  const gameSetting = JSON.parse(localStorage.getItem(`gameSetting`));
  const gameData = JSON.parse(localStorage.getItem(`gameData`));

  if (!gameSetting || !gameData) return;

  return [gameSetting, gameData];
}
