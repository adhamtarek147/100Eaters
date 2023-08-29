// UI (HTML and CSS) is created by Jonas Schmedtmann and JS DOM is created by Adham Tarek
"use strict";

//essential elements

//buttons
let newGamebtn = document.querySelector(".btn--new");
let rollDicebtn = document.querySelector(".btn--roll");
let holdbtn = document.querySelector(".btn--hold");

//dice image
let diceImg = document.querySelector(".dice");

//player 1
let nameOfPlayer1 = document.querySelector("#name--0");
let displayedTotalScore1 = document.querySelector("#score--0");
let displayedCurrentScore1 = document.querySelector("#current--0");
let section1 = document.querySelector(".player--0");

//player 2
let nameOfPlayer2 = document.querySelector("#name--1");
let displayedTotalScore2 = document.querySelector("#score--1");
let displayedCurrentScore2 = document.querySelector("#current--1");
let section2 = document.querySelector(".player--1");

//important variables
let totalScore1, totalScore2, currentScore1, currentScore2;
let isPlayerOne = true;
let isWinner = false;

//important functions
function switchSides(isPlayerOne) {
  if (isPlayerOne === false) {
    section1.className = "player player--0";
    section2.className = "player player--1 player--active";
  } else {
    section2.className = "player player--1";
    section1.className = "player player--0 player--active";
  }
}

function checkWinner() {
  if (totalScore1 >= 100) {
    section1.className = "player player--0 player--winner";
    diceImg.className = "hidden";
    rollDicebtn.disabled = true;
    holdbtn.disabled = true;
    nameOfPlayer1.textContent = "Winner🥳";
  } else if (totalScore2 >= 100) {
    nameOfPlayer2.textContent = "Winner🥳";
    section2.className = "player player--1 player--winner";
    diceImg.className = "hidden";
    rollDicebtn.disabled = true;
    holdbtn.disabled = true;
  } else {
    switchSides(isPlayerOne);
  }
}

//start game function
function startGame() {
  //set the scores all zeroes as initital values
  displayedTotalScore1.textContent =
    displayedTotalScore2.textContent =
    displayedCurrentScore1.textContent =
    displayedCurrentScore2.textContent =
      0;
  //hide the dice image
  diceImg.className = "hidden";

  //set variables to 0 as initial value
  totalScore1 = totalScore2 = currentScore1 = currentScore2 = 0;

  //start with player one active
  isPlayerOne = true;
  section1.className = "player player--0 player--active";
  section2.className = "player player--1";

  //make the buttons run
  rollDicebtn.disabled = false;
  holdbtn.disabled = false;

  //display players names
  nameOfPlayer1.textContent = "Player 1";
  nameOfPlayer2.textContent = "Player 2";
}
startGame();

//button handlers

//new game button
newGamebtn.addEventListener("click", startGame);

//roll dice button
rollDicebtn.addEventListener("click", function () {
  //random number from 1 to 6
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  //display image depending on the random number
  diceImg.src = `dice-${randomNumber}.png`;
  diceImg.className = "dice";

  //display the scores
  if (randomNumber !== 1) {
    if (isPlayerOne) {
      currentScore1 += randomNumber;
      displayedCurrentScore1.textContent = currentScore1;
    } else {
      currentScore2 += randomNumber;
      displayedCurrentScore2.textContent = currentScore2;
    }
  } else {
    isPlayerOne = !isPlayerOne;
    switchSides(isPlayerOne);
    currentScore1 = currentScore2 = 0;
    displayedCurrentScore1.textContent = displayedCurrentScore2.textContent = 0;
  }
});

//hold button
holdbtn.addEventListener("click", function () {
  if (isPlayerOne === true) {
    totalScore1 += currentScore1;
    displayedTotalScore1.textContent = totalScore1;
    currentScore1 = 0;
    displayedCurrentScore1.textContent = currentScore1;
    diceImg.className = "hidden";
    isPlayerOne = false;
  } else {
    totalScore2 += currentScore2;
    displayedTotalScore2.textContent = totalScore2;
    currentScore2 = 0;
    displayedCurrentScore2.textContent = currentScore2;
    diceImg.className = "hidden";
    isPlayerOne = true;
  }
  checkWinner();
});
