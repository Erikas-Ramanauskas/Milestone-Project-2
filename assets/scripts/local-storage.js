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
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: "1vkwq8IBPgUNpYV95B8jDIz3qVEZfqzW3J8p9SkTkdcU",
    // The A1 notation of the values to retrieve.
    range: "Highscores!A1:E20",

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: "ROWS",

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: "SERIAL_NUMBER", //
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
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
  var API_KEY = "AIzaSyB-RrHuqjZvk8y3fBeQ2CNbRzDpCIu4AVQ";

  var CLIENT_ID = "275977954404-t29tlf1roh06t3lq9icljbkgf0hhqijp.apps.googleusercontent.com";

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
