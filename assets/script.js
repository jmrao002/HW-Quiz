// Define variables to be used to access elements via the DOM
let timeRemaining = document.getElementById("timeRemaining");
let startBtn = document.getElementById("startBtn");
let questionContainer = document.getElementById("questionContainer");
let questionText = document.getElementById("questionText");
let responseOptions = document.getElementById("responseOptions");
let option0 = document.getElementById("option0");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");

// Function that will execute upon clicking the start button
function startQuiz() {
  // start timer
  // find dom element to show the question
  getQuestion();
}

function getQuestion() {
  // get the current question

  // show the question
  // loop show the choices (buttons)
  // add event listener for each button created
  answerCheck();
}

// check user selection
function answerCheck() {
  // check the user selection against correct answer
  // incorrect remove seconds
  // set score
  // get next question
  getQuestion();
  // if questions.length
  endGame();
}

// end game
function endGame() {
  // set their score
  // show end screen
  // clear out timer
}

// save high score
function saveHighScore() {
  // prompt for initials
  // save score to localStorage
}

// event listeners
// start button click
startBtn.addEventListener("click", startQuiz);
// check answer click

// save high score
saveScore.addEventListener("click", saveHighScore);
