"use strict";

// this file is working with local storage and saving highscores and current game

function setLocalStorage() {
  localStorage.setItem(`gameSetting`, JSON.stringify(gameSettings));
  localStorage.setItem(`gameData`, JSON.stringify(gameData));
}

function getLocalStorage() {
  const gameSetting = JSON.parse(localStorage.getItem(`gameSetting`));
  const gameData = JSON.parse(localStorage.getItem(`gameData`));

  if (!gameSetting || !gameData) return;

  return [gameSetting, gameData];
}

//-------------------------------- Google API get -----------------------------------

function makeApiCall() {
  var params = {
    // The spreadsheet to request.
    spreadsheetId: "1vkwq8IBPgUNpYV95B8jDIz3qVEZfqzW3J8p9SkTkdcU",

    // The ranges to retrieve from the spreadsheet.
    ranges: "Highscores!A1:R20",

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false, // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.get(params);
  request.then(
    function (response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}

function initClient() {
  var API_KEY = "AIzaSyB-RrHuqjZvk8y3fBeQ2CNbRzDpCIu4AVQ"; // TODO: Update placeholder with desired API key.

  var CLIENT_ID = "275977954404-t29tlf1roh06t3lq9icljbkgf0hhqijp.apps.googleusercontent.com"; // TODO: Update placeholder with desired client ID.

  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    })
    .then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
