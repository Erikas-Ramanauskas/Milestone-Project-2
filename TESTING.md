# Tedoku -  Testing Documentation

![Tedoku site shown on multiple screen sizes]()

Visit the deployed site: [Tedoku](https://erikas-ramanauskas.github.io/Milestone-Project-2/)

- - -

## CONTENTS

* [AUTOMATED TESTING](#AUTOMATED-TESTING)
  * [W3C Validator](#W3C-Validator)
  * [JavaScript Validator](#JavaScript-Validator)
  * [Python Validator](#Python-Validator)
  * [Lighthouse](#Lighthouse)
* [MANUAL TESTING](#MANUAL-TESTING)
  * [Testing User Stories](#Testing-User-Stories)
  * [Full Testing](#Full-Testing)

Testing was ongoing throughout the entire build. I utilised Chrome developer tools as well as different browsers to see effects and implemented changes as needed.

Each page has been inspected using google chrome developer tools and lighthouse Firefox inspector tool to ensure that each page is fully responsive on a variety of different screen sizes and devices. I also physicaly tested the webiste on the Iphone 12, Ipad air, Macbook and Pc computers.

- - -

## AUTOMATED TESTING

### W3C Validator

[W3C](https://validator.w3.org/) was used to validate the HTML on all pages of the website. It was also used to validate the CSS.


* [Index Page W3C HTML Validation](https://validator.w3.org/nu/?doc=https%3A%2F%2Ffoundintranslationsodaci.herokuapp.com%2F) - Pass
* [Game Page W3C HTML Validation](documentation/testing/login-user.png) - Pass
* [Highscore Page W3C HTML Validation](documentation/testing/login-user.png) - Pass

- - -

### JavaScript Validator

[jest](https://jestjs.io/) was used to validate the JavaScript.

In order to validate a developer writen test some code unfortunately must be comented out due to asynchronus Javascript issues. As i started testing at first these errors were thrown in. 

First was having issue with Jquery $ being an error and program not finding (i did not taken screenshot of this).I have specificaly changed all of the code from using Jquery to Vanila Javascript, but it did not solve the problem. However Mentor Gareth provided with [this](https://github.com/facebook/create-react-app/issues/2337) that solved first problem.

The other one were by bootstrap not being found. So i moved from linking external bootrap and jquery to downloading both of libraries directly to the project and linking it up. However this did not solve the problem. Upon Using Tutor assistance, Alan sugested not to use the code at all. Which was part of my important code for game over functionality. So i decided to disable it for automated testing and bring back for actual functionality.

/assets/scripts/game-setup.js line-32
````javascript 
const menuModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
  keyboard: false,
});
````
![Bootrap error]()


The Last one is due to asynchronus javascript not finding id="volume" before the test is run and failing test imedietly. The decition was to coment it out during testing phase.

/assets/scripts/game-setup.js line-198
````volumeInput.addEventListener("input", (event) => {
  gameSettings.volume = event.target.value / 200;
  setGameVolume(); 
});````
![addEventListener error]()

* [dropdown.js](documentation/testing/dropdownjs-validation.png)
* [form_validation.js](documentation/testing/form-validation-js.png)
* [language_codes.js](documentation/testing/language-list-js.png)

- - -


- - -

### Lighthouse

I used Lighthouse within the Chrome Developer Tools to test the performance, accessibility, best practices and SEO of the website.

### Desktop Results

* Index Page
  ![Index Page lighthouse testing desktop]()

* Game Page
  ![Game Page Lighthouse testing desktop]()
  
* Highscore Page
  ![Highscore Page Lighthouse testing desktop](documentation/lighthouse/signup-lh-desk.png)

### Mobile Results

* Index Page
  ![Index Page lighthouse testing mobile]()

* Game Page
  ![Game Page Lighthouse testing mobile]()
  
* Highscore Page
  ![Highscore Page Lighthouse testing mobile]()
- - -

## MANUAL TESTING

### Full Testing by developer

Full testing was performed on the following devices:

* Laptop:
  * Windows 11 2021 15 inch screen
    * Google Chrome
    * Safari
    * Firefox
    * Opera
    * OperaGX
  
* Mobile Devices:
  * iPhone 12 pro.
  * iPhone 14 pro.
    * Chrome

## Website interaction testing

| # | Feature | Expected Outcome | Testing Performed | Pass/Fail |
| --- | --- | --- | --- | --- |
| | Home page navigation | | | |
| --- | --- | --- | --- | --- |
| 1 | Navigation- Main page | Redirected to Home page | Click home button | ✅ |
| 2 | Navigation-Game page | Redirected to Game page | Click game button | ✅ |
| 3 | Navigation- Highscore page | Redirected to Highscore Page | Click Homescore button | ✅ |
| 4 | Footer- Read here button | Redirected to Read-me file of project | Click Read-here button | ✅ |
| 5 | Footer- Github logo | Redirected to Github page | Click Hithub logo | ✅ |
| 6 | Footer- Linked-In logo | Redirected to Linked-in page | Click Linked-in logo | ✅ |
| --- | --- | --- | --- | --- |
| | Game page navigation | | | |
| --- | --- | --- | --- | --- |
| 7 | Menu Buton | Activate menu modal | Click menu button | ✅ |
| 8 | Modal- Main page | Redirected to Home page | Click home button | ✅ |
| 9 | Modal-Game page | Redirected to Game page | Click game button | ✅ |
| 10 | Modal- Highscore page | Redirected to Highscore Page | Click Homescore button | ✅ |
| 11 | Modal- Resume Game button | Close modal | Click Resume game button | ✅ |
| 12 | Modal- Easy game button | Start new Easy game | Click Easy game button | ✅ |
| 13 | Modal- Medium game button | Start new Medium game | Click Medium game button | ✅ |
| 14 | Modal- Hard game button | Start new Hard game | Click Hard game button | ✅ |
| 15 | Rotate clockwise button | Rotates both shapes clockwise | Click clockwise button | ✅ |
| 16 | Rotate anticloskvise button | Rotates both shapes anticloskvise | Click anticloskvise button | ✅ |
| 17 | Modal- display game dificulity | Display game dificulity after game started | Start any game mode | ✅ |
| 18 | Modal- display and control game volume | Change volume on mouse press and scroll | Press and scroll sideways on volume control | ✅ |
| --- | --- | --- | --- | --- |
| | Highscore page navigation | | | |
| --- | --- | --- | --- | --- |
| 19 | Navigation- Main page | Redirected to Home page | Click home button | ✅ |
| 20 | Navigation-Game page | Redirected to Game page | Click game button | ✅ |
| 21 | Navigation- Highscore page | Redirected to Highscore Page | Click Homescore button | ✅ |
| 22 | Footer- Read here button | Redirected to Read-me file of project | Click Read-here button | ✅ |
| 23 | Footer- Github logo | Redirected to Github page | Click Hithub logo | ✅ |
| 24 | Footer- Linked-In logo | Redirected to Linked-in page | Click Linked-in logo | ✅ |
| --- | --- | --- | --- | --- |
| | Game Functionalities | | | |
| --- | --- | --- | --- | --- |
| 25 | Drag game shapes | Dragable game shapes | Click and hold on game shape and move mouse | ✅ |
| 26 | Drop/drop Game Shape- outside game board | Game shape returns back to original location | Click shape, drag outside of game board and drop | ✅ |
| 27 | Drop/drop Game Shape- inside game board | Game shape planted inside of game board | Click shape, drag inside of game board and drop | ✅ |
| 28 | Highlight avialabe/current drop squares | Highlight squares in blue if there is space for shape to be placed | Drag shape above avialable space | ✅ |
| 29 | Highlight avialabe/current potentiol combination | Highlight squares in red if there is space for shape to be placed and combination of 9+ is avialable | Drag shape above avialable space were combination is avialable | ✅ |
| 30 | Delete 9 combination squares after shape is droped | Deleted 9 or more squares that counted for group after shape is droped | Drop shape above avialable space were combination is avialable | ✅ |
| 31 | Earn rotation point for 2 combo in Easy game | Rewarded rotation point after combination is deleted in easy mode | Drop shape above avialable space were combination is avialable in easy mode | ✅ |
| 32 | Earn rotation point for 3 combo in Medium game | Rewarded rotation point after combination is deleted in Medium mode | Drop shape above avialable space were combination is avialable in Mediummode | ✅ |
| 33 | Earn rotation point for 4 combo in Hard game | Rewarded rotation point after combination is deleted in Hard mode | Drop shape above avialable space were combination is avialable in Medium mode | ✅ |
| 34 | Gain aditional points for extra combinations over treshold | Rewarded additional rotation for every extra combination done above treshold | Drop shape above avialable space were more combinations are avialable is avialable in any mode | ✅ |
| 35 | Play tile click sound on droping the shape | Sound is played when shape is droped | Click shape, drag inside of game board and drop | ✅ |
| 36 | Play burn sound on droping the shape when destroying 9 squares or more | Play burn sound shape is droped | Click shape, drag inside of game board and drop with destruction | ✅ |
| --- | --- | --- | --- | --- |
| | Automatic game actions | | | |
| --- | --- | --- | --- | --- |
| 37 | Create new 2 shapes when starting new game | 2 new shapes when new game started | Start new game by selecting easy/hard/medium | ✅ |
| 38 | Replace old shape with new shape when one is droped | New shape is is created instead of old one | Drop the shape in game board | ✅ |
| 39 | Game over detection and modal reactivation | Reactivates model when no more space for shapes left | Lose the game | ✅ |
| 40 | The end game shown instead of resume game button after game over | Show game over message | Lose the game | ✅ |
| 41 | Update scores every time when scores are earned | Update scores number | Earn points by cestroying tiles | ✅ |
| 42 | Update weekly scores every time when new weekly scores are reached | Update weekley scores number | Earn points by cestroying tiles and reaching weekly points | ✅ |
| 43 | Update total scores when weekley scores reaches total scores | Update total scores number | Earn points by cestroying tiles and reaching total points | ✅ |
| 44 | Change a weakly/total scores when changing game modes | Update weekley/total scores number | change to diferent game mode | ✅ |
| 45 | Update rotation point when Rotation buton used | Update rotation point number | Rotate shape | ✅ |
| --- | --- | --- | --- | --- |
| | Game reload | | | |
| --- | --- | --- | --- | --- |
| 46 | Game board- Return to last game when page is loaded | Board filled with same squares like in the game last played | Load in Game page after starting the game | ✅ |
| 47 | Shapes- Return to last game when page is loaded | Shapes filled with same squares like in the game last played | Load in Game page after starting the game | ✅ |
| 48 | Score count- Return to last game when page is loaded | Score filled with same number like in the game last played | Load in Game page after starting the game | ✅ |
| 49 | weakly score/best of the week- Return to last game when page is loaded | Weakly score/Total score filled with same number like in the game last played | Load in Game page after starting the game | ✅ |
| 50 | Rotation points- Return to last game when page is loaded | Rotation points filled with same number like in the game last played | Load in Game page after starting the game | ✅ |
| --- | --- | --- | --- | --- |
| | Hishscores page | | | |
| --- | --- | --- | --- | --- |
| 51 | Show easy/medium/hard games played total | easy/medium/hard games played total in separate colums | Load up Hishscores page | ✅ |
| 52 | Show easy/medium/hard games weekley score | easy/medium/hard wekley score in separate colums | Load up Hishscores page | ✅ |
| 53 | Show easy/medium/hard highest score | easy/medium/hard highest score in separate colums | Load up Hishscores page | ✅ |


## 3rd party testing during development
* Performed by selected individuals who were awere of my development plan to give a feadback of user expirence.

** My brother Kris - Advised on adding sound control for the game. Found opacity bug for OperaGX. Reported some weird mouse behaviour with pieces. 
** Friend Algis - Advised on colours and few design details
** Friend Lukas - Advised Adding aditionl 20% points for each game dificulity. Found Pieces not placing bug.

## 3rd party Blind Testing
* Perfomed at least 30 min testing by people who never seen the website/aplication and were given no prior information to what it is about.

** Viktoria - Easy to use
** 


Back to [README.md](README.md)