// Define variables to be used to access elements via the DOM
let timeRemaining = document.getElementById("#timeRemaining");
let time = 15 * questions.length;
let questionContainer = document.getElementById("#questionContainer");
let questionText = document.getElementById("#questionText");
let answerText = document.getElementById("#answerResult");
let responseOptions = [
  document.getElementById("#option0"),
  document.getElementById("#option1"),
  document.getElementById("#option2"),
  document.getElementById("#option3"),
];
let playerInitials = document.querySelector("#playerInitials");
let alertBox = document.querySelector("#alertBox");
let gameOver = document.querySelector("endGameContainer");
let questionNum = 0;
let scoresArray;
playerInitials.value = "";

// Function that will execute upon clicking the start button
function startQuiz() {
  // Hide title screen
  document.querySelector("#instructionsScreen").style = "display: none";
  // start timer
  document.querySelector("#timeRemaining").textContent = "Time: " + time;
  // find dom element to show the question
  document.querySelector("#questionContainer").style = "display: block";
  // Show first question
  getQuestion();
}

function getQuestion() {
  // Get current question
  let questionInfo = questions[questionNum];
  // If there are no questions left, stop time, end function
  if (questionInfo == undefined) {
    clearInterval(timeLimit);
    endGame();
  } else {
    for (var i = 0; i < optionButtons.length; i++) {
      optionButtons[i].textContent = i + 1 + ". " + questionInfo.choices[i];
      optionButtons[i].value = questionInfo.choices[i];
    }
    document.querySelector("#questionPrompt").textContent = questionInfo.title;
    questionContainer.style = "display: block";
  }
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
document.querySelector("#startBtn").onclick = startQuiz;
// check answer click
document.addEventListener("click", answerCheck);
// save high score
saveScore.addEventListener("click", saveHighScore);
