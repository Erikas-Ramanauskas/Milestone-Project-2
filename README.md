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
* As a First Time Visitor, I want to be able to read a rules of the game
### Returning Visitor Goals
* As a Returning Visitor, I want to be able to try my chance again at getting a higher score by being able to reload the game.
* As a Returning Visitor, I want to see highscores and statistics of the game
### Frequent Visitor Goals
* As a Frequent Visitor, I want to be rewarded for my achievements in the game
* As a Frequent Visitor, I want to be able to give my feedback to the developer.

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
Trekkies Games is highly interactive and encourages users to click on their choices to play a game.

Trekkies Games has two main features: a quiz game on Voyager where fans can test their knowledge of the seven season show and famous Star Trek quotes generator with the option to share their favourite quote on Twitter. The game also allows for and encourages user feedback by having a button that clearly states, "send a feedback".


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
### Code
* Credit and thanks belong to numerous tutorials on YouTube by seasoned developers.
    - Thanks to FlorinPop's [Create a Modal (Popup) with HTML/CSS and JavaScript](https://www.youtube.com/watch?v=XH5OW46yO8I);
    [Code:](./assets/images/snippets/florinpop-js.webp)
     - Thanks to WebDev Simplified's [Build A Quiz App With JavaScript](https://www.youtube.com/watch?v=riDzcEQbX6k);
    [Code:](./assets/images/snippets/webdevsimplified-js.webp)  
    - Thanks to NetNinja's Udemy course for the code snippet on animating scores [Code:](./assets/images/snippets/netninja-js.webp) 
    - Also thanks to Jacinto Wong's Udemy course for the code snippet on how to Tweet quotes at one click of a button [Code:](./assets/images/snippets/jacintowong-js.webp)
    
### Content
* The quiz questions written by the developer, based on the knowledge of having watched the Star Trek shows previously. The quotes were gathered from Inc.com's [50 Star Trek Quotes Inspiring You to Boldly Go Into Your Future](https://www.inc.com/kevin-daum/50-star-trek-inspiring-you-to-boldly-go-into-your-future.html). Credit for the content (questions and quotes) ultimately belongs to Star Trek and Paramount. 

### Media
* All images were licensed from Adobe Stock
* PNG - [pngegg](https://www.pngegg.com/) for the Voyager spaceship png

## Acknowledgements
Thanks to Jo Bowden and the team at South Devon College for your help with this project, it's really appreciated.
Special mention and thanks to my mentor, Dario Carrasquel, for his support, invaluable insights and patience with me 
on this project.

## Copyrights
[Joy Zadan, 2022](www.linkedin.com/in/joy-araneta-zadan)
