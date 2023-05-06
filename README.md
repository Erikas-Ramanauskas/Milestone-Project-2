# Tedoku
[View the live project here](https://erikas-ramanauskas.github.io/Milestone-Project-2/)

Tedoku is a mix between tetris and sudoku with drag and drop functionality. Fill the vertical or horizontal lines as well as squares like sudoku but have them clear out to make more space or fill up board with gaps and lose the game like in tetris.

![Screenshot of Tedoku on multiple device]( Add_link)

## Table of Contents
* [Overview](#overview-1)
* [User Experience (UX)](#user-experience-ux-1)
* [Features](#features-1)
* [Technologies Used](#technologies-used-1)
* [Testing](#testing-1)
* [Deployment](#deployment--local-development)
* [Credits](#credits-1)
* [Acknowledgements](#acknowledgements-1)

## Overview
While the game concept is not new in a genre and my idea is not original and it is taken from: [Tripledot Studios](https://apps.apple.com/us/developer/tripledot-studios/id1191319103) game: [Woodoku](https://apps.apple.com/us/app/woodoku-wood-block-puzzles/id1496354836) i chose this project as i enjoyed my self quite a lot as well as i believed it will be good programing chalange to pull it of. I was not mistaken.

The simplicity of the game is as as simple as as it gets, while i do provide rules to the visitor i strongly believe and as testing shows you dont need to truly know the rules or any specific language to pick up on the simplistic rules maching to the classic games as tetris, snake or pacman jsut after a one or twor game sesions.

The beuty of such a simple games that no matter your age or language game can pickced up easily by anyone.

## User Experience (UX)
### First Time Visitor Goals
* As a First Time Visitor, I want to be able to immediately understand the main purpose of the application, "Tedoku".
* As a First Time Visitor, I want to be able to understand how to play the game.
* As a First Time Visitor, I want to be able to choose what dificulity of the game i would like.
* As a First Time Visitor, I want the pages to be responsive to be my device, no matter it's size.
* As a First Time Visitor, I want to be able to read a rules of the game.
### Returning Visitor Goals
* As a Returning Visitor, I want to be able to try my chance again at getting a higher score by being able to reload the game.
* As a Returning Visitor, I want to see highscores and statistics of the game.
* As a Returning Visitor, I want to be able to find details of dificulity levels.
* As a Returning Visitor, I want to be able to return to my previous game.
* As a Returning Visitor, I want to be able to see a developer details and links to his portfolio.
### Frequent Visitor Goals
* As a Frequent Visitor, I want to be able to give my feedback to the developer.
* As a Frequent Visitor, I want to be able to keep improving my game results and view in best scores and games played by mode.
* As a Frequent Visitor, I want to be able to see reach week a new result and top score to reach.

<!-- Edit further -->

### Design
* Colour Scheme
- The main colours used on the site represent
* Typography
- Orbitron font is used for the application logo as this is the closest to Star Trek "look" that's available from Google fonts. It is also used for the introduction message for each of the game page.
Orbitron is paired with Exo 2 font for the game content and for the buttons.
* Imagery
- The three images used for the application all represented the "look" of space, planets and nebulas. The home page image was superimposed by a png image of Star Trek Voyager spaceship from pngegg.

### Wireframes
- [Home page wireframe (mobile)](./assets/images/ux/mobile-home.webp)
- [Quiz wireframe - game page (mobile)](./assets/images/ux/mobile-quizgame.webp)
- [Quote Generator wireframe (mobile)](./assets/images/ux/mobile-quotetweet.webp)
- [Home page wireframe (desktop)](./assets/images/ux/desktop-home.webp)
- [Quiz wireframe (desktop)](./assets/images/ux/desktop-quizgame.webp)
- [Quote Generator wireframe (desktop)](./assets/images/ux/desktop-quotetweet.webp)

### Features
Tedoku is highly interactive and encourages users think about their strategies and plan their next move based on the shapes they are given.

| # | Feature | Desirability | Importance | Viability | Delivered |
| --- | --- | --- | --- | --- | --- |
| | Navigation | | | | |
| --- | --- | --- | --- | --- | --- |
| 1 | Main page | 5 | 5 | 5 | ✅ |
| 2 | Game page | 5 | 5 | 5 | ✅ |
| 3 | Highscore page | 5 | 5 | 5 | ✅ |
| 4 | ""Play!"" button changing to ""Start new game!"" | 5 | 5 | 3 | ❌ |
| 5 | Game dificulities opens up as you press ""Play!"" or ""Start new game!"" | 5 | 3 | 4 | ✅ |
| 6 | Within profile page giving player a choice of the tiles style | 4 | 3 | 3 | ❌ |
| --- | --- |--- |--- |--- |--- |
| | Visuals | | | | |
| --- | --- |--- |--- |--- |--- |
| 7 | Game boad layout changing depending on height and width and determening wich one is bigger. | 5 | 5 | 5 | ✅ |
| 8 | Diferent styles for the tiles and the board | 4 | 3 | 3 | ✅ |
| 9 | Animations on destroying the tiles | 5 | 4 | 4 | ❌ |
| 10 | Animations on the score count once points achieved | 5 | 3 | 3 | ❌ |
| 11 | Flashier animation when combo points achieved | 5 | 3 | 3 | ❌ |
| 12 | Home page and hoghscores components apearing on scroll | 5 | 3 | 4 | ✅ |
| --- | --- |--- |--- |--- |--- |
| | Game feautures | | | | |
| --- | --- |--- |--- |--- |--- |
| 13 | Easy dificulity - ability to flip the shapes, chance to get extra shapes, guided highlight for match | 5 | 4 | 5 | ✅ |
| 14 | Medium dificulity- Same as easy but no ability to flip or extra shapes | 5 | 4 | 5 | ❌ |
| 15 | Hard dificulity- Same as mediuim but timed and no highlights | 5 | 4 | 5 | ❌ |
| 16 | Insane dificulity- same as hard, but with added 25% of filled tiles becomes invisiable. | 5 | 3 | 4 | ❌ |
| 17 | Point count 1x points for single break of 9 | 5 | 5 | 5 | ❌ |
| 18 | Point count for combo of more than 9 tiles, every extra combo adds 0.5x, Example destroying 2 row or collumn will multiply points by 1.5x. For 3 combo 2x | 5 | 5 | 4 | ❌ |
| 19 | Additional point multiplier Easy 1x, Medium 1.5x Hard 2x, Insane 3x | 5 | 4 | 4 | ❌ |
| 20 | ""Game over"" message | 5 | 5 | 5 | ✅ |
| 21 | Automatic detection of game over | 5 | 5 | 5 | ✅ |
| 22 | Ability to flip tiles | 5 | 4 | 4 | ✅ |
| 23 | Upon reaching certain score Unlocking ""Insane"" dificulity | 3 | 3 | 3 | ❌ |
| --- | --- |--- |--- |--- |--- |
| | Redesigned Game feutures | | | | |
| --- | --- |--- |--- |--- |--- |
| 24 | Shape turns have limited uses | 5 | 5 | 5 | ✅ |
| 25 | Shape turns are rewarded for combinations | 5 | 5 | 5 | ✅ |
| 26 | Each dificulity has less starting turn points | 5 | 5 | 5 | ✅ |
| 27 | Each dificulity requires more combination points to reward | 5 | 5 | 5 | ✅ |
| 28 | Reward multiplier 50% for combinations for all dificulities | 5 | 5 | 5 | ✅ |
| 29 | Highlight of tiles when maching tiles found during drag | 5 | 5 | 5 | ✅ |
| 30 | Highlight of tiles when 9 matching tiles are found | 5 | 5 | 5 | ✅ |
| 31 | Additional 20% points for medium dificulity | 5 | 5 | 5 | ✅ |
| 32 | Additional 40% points for hard dificulity | 5 | 5 | 5 | ✅ |
| --- | --- |--- |--- |--- |--- |
| | Highscores | | | | |
| --- | --- |--- |--- |--- |--- |
| 33 | Player name that player can change for them self | 4 | 3 | 4 | ❌ |
| 34 | Top highscore overal showing highest score game type and score | 5 | 5 | 5 | ✅ |
| 35 | Top highscore weekley | 4 | 5 | 5 | ✅ |
| 36 | Top streek | 4 | 3 | 4 | ❌ |
| 37 | Tiles destroyed | 4 | 3 | 4 | ❌ |
| 38 | Individual top score for Easy game | 5 | 4 | 5 | ✅ |
| 39 | Individual top score for Medium game | 5 | 4 | 5 | ✅ |
| 40 | Individual top score for Hard game | 5 | 4 | 5 | ✅ |
| 41 | Individual top score for insane game | 5 | 4 | 2 | ❌ |
| 42 | Ability to share game results on social media | 5 | 3 | 2 | ❌ |
| 43 | Ability to see other top highscores between other players | 5 | 3 | 2 | ❌ |
| 44 | Ability to see top highscores between game modes | 5 | 3 | 2 | ❌ |
| 45 | Ability to see top highscores between top and week charts | 5 | 3 | 2 | ❌ |
| --- | --- |--- |--- |--- |--- |
| | Home page and tutorial | | | | |
| --- | --- |--- |--- |--- |--- |
| 46 | Video showcasing the gameplay | 4 | 3 | 4 | ❌ |
| 47 | Introduction to a game and points reward | 5 | 5 | 5 | ✅ |
| 48 | Explanation of individual level dificulities | 5 | 5 | 5 | ✅ |
| 49 | Footer with links to creator social media. | 5 | 5 | 5 | ✅ |




## Technologies Used
### Languages Used
*  HTML5
*  CSS
* JavaScript

### Frameworks, Libraries and Programmes Used
- Google Fonts used to import the Montserrat and Fira Sans fonts into the style.css file and are used on all pages of the application
- Lineicons used for the twitter button on the quotes page.
- Photoshop was used to optimize the home/ landing page, the quiz and for the quotes page. 
- Online-Convert was used to convert the png images to webp
- Adobe Stock - the developer has an existing account with Adobe Stock and all images used on the site are all licensed for use.
- Git was used for version control.
- GitPod was used as online IDE for GitHub and the terminal was used to add and commit to Git and push to GitHub.
- GitHub was and is being used as repository of the project source code and for deploying the site/ application.
- Balsamiq was used to create the wireframes for Trekkies Games project.
- Favicon was used to create favicon.
- Chrome DevTools was used to test the code and debug the code during the development process.
- Microsoft Edge DevTools was used to test the code and debug the code during the development process.
- Safari DevTools was used to test the code and debug the code during the development process.
- a11y was used to test accessibility
- W3C Markup Validation was used to test HTML code
- W3C CSS Validation Service was used to test CSS code
- JSHint was used to test JavaScript code

- Google sheets were used to create a small interactivle interface in order to create shapes for the game and turn them in to JavaScript Object for simple copy paste. It allowed me to experiment with diferent shapes without spending time manualy typing the code. [link](https://docs.google.com/spreadsheets/d/1rQbG19eHYj0ltU_YNrQAcVxWLgIqnsbVytKtXd3tatI/edit)

## Testing
Testing was carried out at every point in the development to check for issues with the code, responsiveness, design, interactivity and accessibility. The developer tools used primarily were Chrome DevTools, with the console playing a key factor in testing and debugging.

### Bugs and Solutions

### Main chalange faced and decitions made
Before going in to individual smaller bugs one issue and soliution requires its own separate topic: Drag and Drop *multiple* components.
 - Due to a nature of the game one of the requirements for the code is to create a shapes of multiple squares and have them interact with game board individualy. 
 - While drag and drop functionality was new for me (not in the course) i reasearched few vidoes but the one that was my main source of information was by [Traversy Media](https://www.youtube.com/watch?v=C22hQKE_32c&t=360s) with added info from [MDN database](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). I used this as my louchpad of drag and drop "playground" which after few trial and error was simple enough for single element. 
  - How ever problems started when i tried to do 2 things: Drag more than one element and scale element i am dragging.
  - [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) has its onwn listener functions quite similar to mouse events and one of events drag over was my hope to be a triger for each of the shapes i am draging, however there was no posibility of draging multiple sibling elements.
  - One of the ways i tried was using *dispatchEvent()* function but it completley crashed browser due to events boucing between siblings.
  - Another idea sugested by a friend to attach the shapes to a mouse cursor using: *position:absolute* and width height properties. However at that moment i relised it is not needed, as it alow user to be flexible and click anywere he wants on the shape without having pices to snap around.
  - Another issue was to do with practicaly all *mouse* events not trigering during the drag and right after dragdrop. To my understadning all of mouse events are transfered to drag functions. I had to adopt a mix of both for the final result.
  - My soliution was to capture mouse position when it is clicked on one of the shapes. In turn i captured a parent div > and taken its children > recorded all X and Y cordinates and calculated center of each shape boxes. This way using *dragover* lsitener that gave me current mouse position, i was able to calculate all active boxes of the shape while draging their parent.
  - Additionaly i captured all game board dropboxes coordinates at the start of drag of all 4 of their edges and using simple conditional testing i was able to check when ever draggable box center enters the squares, and used same principal of functionality to place them in while i did not directly appended the children as in the video (that would coused parent div to go inside of one of boxes only)
  - Lastly the issue i had that once something is beign dragged it CAN NOT be modified via css.
  - This was important for me to do as my game board is 9x9 squares and on the side i wanted to fit 3 or even 4 game shapes that could be as big as 4x4. Taking that together it is 12 or even 16 squares each in the same space as game board *check early wireframes*. this means i had to make them smaller than game board sqaures and scale them up as the player pick them up. *That is how original game i got an idea from works*
  - I have been searching multiple ways to achieve this, via *scale*, changing width and height, transforming, creating element bigger and fitting in the smaller box yet the design of draggable "shadow element" did not change. 
  - On top of it any element that is parent of draggable element transfers background color to dragable element and no traditional css rule has changed that, causing the colour to stay on invisible *inactive* squares and edges were border radius was present. the only element backgroun the shapes are not taking is <body>
  - Since i spend a large portion of time on these 2 problems and one of them was solved i decided to change a desing of the game and create shapes of the same size as the game board by fitting less of them or rearanging the layout as well as adding no backgroudn to parent divs.
  - this is something i would like to revisit in a future and build up my orriginal vision.
  

#### Solved Bugs during developing
  - There were a that coused the biger shapes of 4 width or height to split up and take over 5 leaving 1 as a gap. this is due to js resizing and causing the drop area being bigger than a shapes squares. When retrieving data of shapes X and Y i added to the top and left 1% (multiplied by 1.01) as well as divided right and bottom edges by the same. This seems to solve the problem, yet the player will have to more accurate on droping shapes than innitialy.
  
  - Several resizing issues were detected when changing direction in the phone mode, and especialy when resizing sreen size while testing in responsive mode. Main issue was that shapes and buttons mostly relied on game board dimentions. During resize event listener the order of functions were not in order and changing them around *gameBoardAndScreenDimentions();* first and *setShapesContainerSize();* after seem to solve the problem
  
  - Initialy i had event listeners added to a dragEnd listener *if* section which checks if shape was droped in the game board thus creating new shape and at the end adding new event listeners. However there is an existing bug that sometimes the droped shape does not apear on the game board and new shape is created insted but no event listeners are added to new shape making the shape unusable for the remaining of the game. Instead i created spearated function and called after *if* statement and to reset all event listeners every time drop down is perfomed. 
  
  - Home page design was relatively smooth apart a few lineup problems that were solved using bootrstap classes and mainly sticking with mb-5 and row/col classes. However one isue that at the 2 examples of combination the text was wraping diferenly since one had a longer text. This automaticaly pushed one of pictures lower than the previous one at certain sceen breakpoints. Simple soliution i found is to place invisible span text at 1400 px when the breaking of the text start so it would treat it as extra word and snap aditional rows together at the same breakpoints. How ever i would love to find out if the is simple css soliution to conect 2 elements and comand them to be same size.
  
  - Within game screen window i have added 2 buttons for rotation and used Font awesome icons. However a regular use of them complicated a size of them and on diffenrent screens they did not responded how i wanted. There were to many situations i had to work with to make them right. I decided to try out svg file instead but FA icons requires premium account. Eventualy i meved on to creating my own icons using simle google drawings that i am well familliar with and downloaded them as as svg file and used a code from it alowing me to customize them and add 5 property that worked for all screen sizes

#### Solved Bugs after public testing

### Remaining Bugs
  -There is a rare occouring bug that when the shape is droped in the game field sometimes it does not regiter but a new shape is created instead anyway. It hapens rarely and i am not sure why it hapens or how to create the bug manualy or how to solve it at the moment.

### Validation Results

The W3C Markup Validator and the W3C CSS Validator were used to test and validate every all six pages of 
the Trekkies Games interactive project to ensure that there were no syntax errors in the code. Chrome's 
Lighthouse DevTool was also used to test for Performance, Accessibility, Best Practices and SEO. 
JSHint was used to test JavaScript code quality.

* W3C Markup Validator Test Results: 
    - [Home page](./assets/images/validation/nuhtml-index.webp)
    - [Quiz page](./assets/images/validation/nuhtml-quiz.webp)
    - [Quotes page](./assets/images/validation/nuhtml-quotes.webp)
    - [Quotes page](./assets/images/validation/nuhtml-redirect.webp)
* W3C CSS Validator Test Results:
    - [Results](./assets/images/validation/css-validation.webp)
    - [Warning](./assets/images/validation/css-warnings.webp)
* JSHint Linting Results:
    - [main.js](./assets/images/validation/jshint-mainjs.webp)
    - [quiz.js](./assets/images/validation/jshint-quizjs.webp)    
    - [quote.js](./assets/images/validation/jshint-quotejs.webp)
* Lighthouse Test Results:
    - [Mobile - home page](./assets/images/validation/mobile-index.webp)
    - [Mobile - quiz page](./assets/images/validation/mobile-quiz.webp) 
    - [Mobile - quotes page](./assets/images/validation/mobile-quotes.webp)   
    - [Mobile - 404 redirect page](./assets/images/validation/mobile-redirect.webp)
    - [Desktop - home page](./assets/images/validation/desktop-index.webp)
    - [Desktop - quiz page](./assets/images/validation/desktop-quiz.webp)
    - [Desktop - home page](./assets/images/validation/desktop-quotes.webp)
    - [Desktop - home page](./assets/images/validation/desktop-redirect.webp)
* a11y Color Contrast Accessibility for the Visually Impaired Validator Results:
    - [Home page](./assets/images/validation/a11y-index.webp)      
    - [Quiz page](./assets/images/validation/a11y-quiz.webp)
    - [Quotes page](./assets/images/validation/a11y-quotes.webp)
    - [404 Redirect page](./assets/images/validation/a11-redirect.webp)

### Testing User Stories from User Experience (UX) Section
#### First Time Visitor Goals
* As a First Time Visitor, I want to be able to immediately understand the main purpose of the application, "Trekkies Games".
    - Upon landing on the site, the user is immediately made aware of what the application is about. Beneath the logo is the welcome message and message about what they will find on the site/ game.
    [Screenshot of home page](./assets/images/ux/trekkies-rules.webp)
* As a First Time Visitor, I want to be able to understand how to play the games.
     - Aside from the welcome message on the home page, the players are presented with the [quiz rules on the quiz page](./assets/images/ux/trekkies-rules.webp)
* As a First Time Visitor, I want to be able to choose what I want to do upon landing on the home page, play the quiz game or play with the quote generator.
The players have the choice to go to the [quiz game or to the quote generator on the home page](./assets/images/ux/trekkies-intro.webp). They are also able to navigate back to the home page by clicking the [game logo](./assets/images/ux/trekkies-logo.webp) on any page.
* As a First Time Visitor, I want the pages to be responsive to be my device, no matter it's size.
The whole project has been developed for mobile first and all pages are fully responsive across all devices: [Galaxy Fold](./assets/images/ux/responsive-galaxyfold.webp); [iphone12](./assets/images/ux/responsive-iphone12.webp); [midsized screens](./assets/images/ux/responsive-midsized.webp); [large screens](./assets/images/ux/responsive-large.webp).
#### Returning Visitor Goals
* As a Returning Visitor, I want to try see more quotes.
The players are able to load more quotes by clicking the [new quote button](./assets/images/ux/feature-quotes.webp).
*  As a Returning Visitor, I want to be able to find out [how much I know about Star Trek](./assets/images/ux/quiz-score.webp) and by being able to replay the quiz. 
#### Frequent Visitor Goals
* As a Frequent Visitor, I want to be able to share my favourite quotes on social media
The users are able to do just that at the click of the twitter button. They are also able to load a new quote by clicking on the [new quote button](./assets/images/ux/quotes-buttons.webp); [tweet sample](./assets/images/ux/quotes-tweet.webp)
* As a Frequent Visitor, I want to be able to give my feedback to the developer.
The [feedback form](./assets/images/ux/trekkies-modal.webp) allows the users to send the message and feedback about the games. 

#### Further Testing
During the development stage, ongoing testings were carried out for responsiveness, functions and console errors. The project under its development were tested using different DevTools (Chrome, Safari and Microsoft Edge). The pages were physically viewed on different devices available to the developer to test for links, functions and responsiveness. 

Friends, family members and colleagues were also requested to play the games and inform the developer of any broken links, bugs or glitch they may encounter. No issues were reported and some have already expressed interest for additional questions and more mini games to be added as soon as reasonable.
 
### Future Developments
* Planned future developments include:
    - adding more questions to the quiz game
    - add another game such as a rescue mission 
    - additional developments may also include a find Trekkies in your area 

## Deployment & Local Development
### Deployment
* The project was deployed to GitHub Pages using the following steps:
1. Login or signup to GitHub and locate the GitHub Repository [GitHub Repository](https://github.com/JoyZadan/star-trek-voyager).
2. On the repository page, navigate to Settings and click on it.
3. Within the Settings page, under Source choose Branch: main, then /root and click Save.
4. After about a minute, the site is published.

### Local Development
* How to Fork 
To fork the repository, use the following steps:
1. Login or signup to Github and locate the repository.
2. Click the Fork button in the top right corner

### Making Local Clone
1. Login or signup to GitHub and locate the GitHub Repository [GitHub Repository](https://github.com/JoyZadan/star-trek-voyager).
2. Under the repository name, click "clone" or "download".
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open the terminal in your preferred code editor and change the current working directory to the location you want to use for the cloned directory.
5. Type git clone, and then paste the URL you copied in Step 3. 
6. Press Enter. Your clone will be created.

## Credits
### Tools Used

 [Imgonline.tools](https://imgonline.tools/remove-color) used with screenshots of the game to remove background colour
 [BGJar](https://bgjar.com/curve-line) used to create background
 [Google_tools](https://drive.google.com/drive/folders/1_VxQCii04fFd1Zq0wxsbFM4VuxG_2guz?usp=sharing) Used to create multiple components inluding pictures, planing shape shape manipulation and probability calculation using spreadsheets.

### Codes


* Credit and thanks belong to numerous tutorials on YouTube by seasoned developers.
    - Thanks to FlorinPop's [Create a Modal (Popup) with HTML/CSS and JavaScript](https://www.youtube.com/watch?v=XH5OW46yO8I);
    [Code:](./assets/images/snippets/florinpop-js.webp)
     - Thanks to WebDev Simplified's [Build A Quiz App With JavaScript](https://www.youtube.com/watch?v=riDzcEQbX6k);
    [Code:](./assets/images/snippets/webdevsimplified-js.webp)  
    - Thanks to NetNinja's Udemy course for the code snippet on animating scores [Code:](./assets/images/snippets/netninja-js.webp) 
    - Also thanks to Jacinto Wong's Udemy course for the code snippet on how to Tweet quotes at one click of a button [Code:](./assets/images/snippets/jacintowong-js.webp)
    
### Game Idea 


### Media
* 
* 

## Acknowledgements
[Tripledot Studios](https://apps.apple.com/us/developer/tripledot-studios/id1191319103) game: [Woodoku](https://apps.apple.com/us/app/woodoku-wood-block-puzzles/id1496354836) is were i pucked up idea and general rule set for this game.

Added my own twist to gare rules and dificulity levels

## Copyrights
[Erikas Ramanauskas, 2023](https://www.linkedin.com/in/erikas-ramanauskas)
