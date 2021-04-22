// Define variables to be used to access elements via the DOM
let timeRemainingEl = document.getElementById("timeRemaining");
let timeEl = 15 * questions.length;
let countdownEl;
let questionContainerEl = document.getElementById("questionContainer");
let questionTextEl = document.getElementById("questionText");
let responseOptionsEl = [
  document.getElementById("option0"),
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
];
let playerInitialsEl = document.querySelector("playerInitials");
let alertBoxEl = document.querySelector("alertBox");
let gameOverEl = document.querySelector("endGameContainer");
let questionNumEl = 0;
let scoresArrayEl;
playerInitials.value = "";

// Function that will execute upon clicking the start button
function startQuiz() {
  // Hide title screen
  document.querySelector("#instructionsScreen").style = "display: none";
  // Set timer
  document.querySelector("#timeRemaining").textContent = "Time: " + timeEl;
  // find dom element to show the question
  document.querySelector("#questionContainer").style = "display: block";
  // Start timer
  countdownEl = setInterval(function () {
    timeEl--;
    timeRemainingEl.textcontent = "Time: " + timeEl;
    if (timeEl <= 0) {
      clearInterval(countdownEl);
      endGame();
    }
  });
  // Show first question
  getQuestion();
}

function getQuestion() {
  // Get current question
  let questionInfoEl = questions[questionNumEl];
  // If there are no questions left, stop time, end function
  if (questionInfoEl == undefined) {
    clearInterval(countdownEl);
    endGame();
  } else {
    // loop show choices
    for (let i = 0; i < responseOptionsEl.length; i++) {
      responseOptionsEl[i].textContent =
        i + 1 + ". " + questionInfoEl.choices[i];
      responseOptionsEl[i].value = questionInfoEl.choices[i];
    }
    document.querySelector("#questionText").textContent = questionInfoEl.title;
    // show the question
    questionContainerEl.style.display = "block";
  }
  answerCheck();
}

// check user selection
function answerCheck() {
  let answerTextEl = document.getElementById("answerResult");
  // check the user selection against correct answer
  if (event.target.nodeName == "button") {
    let playerAnswerEl = event.target.value;
    if (playerAnswerEl) {
      if (playerAnswerEl === questions[questionNum].answer) {
        answerResultEl = "Correct!";
      } else {
        answerResultEl = "Incorrect!";
        timeEl -= 15;
        if (timeEl <= 0) {
          timeEl = 0;
        }
      }
      // Show answerResult
      answerTextEl.textContent = `<hr /> ${answerResult}`;
      if (answerTextEl.style != "display: block;") {
        answerTextEl.style = "display: block;";
      }
      answerTextEl.getElementById("");
    }
  }
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
