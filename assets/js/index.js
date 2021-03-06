// Global variables
let time = 10 * questions.length;
let timeLimit;
const questionContainerEl = document.getElementById("question-container");
const questionTextEl = document.getElementById("question-text");
let responseOptionsEl = document.getElementsByClassName("answerChoice");
let timeRemainingEl = document.getElementById("time-remaining");
let instructionsEl = document.getElementById("instructions-screen");
let resultEl = document.getElementById("answer-result");
let initialsFormEl = document.getElementById("enter-initials");
let playerInitialsEl = document.getElementById("player-initials");
playerInitialsEl.value = "";
let gameOverEl = document.getElementById("end-game-container");
let showScore = document.getElementById("show-score");
let questionNumEl = 0;
let scoresEl = document.getElementById("scores-container");
let scoresListEl = document.getElementById("scores-list");
let youLoseEl = document.getElementById("lost-game");
let tryAgainEl = document.getElementById("try-again-container");
let viewtopScores = document.getElementById("view-scores");

let topScores = JSON.parse(localStorage.getItem("topScores")) || [];

// event listeners
// start button click
document.getElementById("start-btn").onclick = startQuiz;
// save high score
initialsFormEl.onsubmit = saveScore;
// try again button
document.getElementById("try-again").onclick = tryAgain;
// clear button
document.getElementById("clear-scores").onclick = clearScores;
// view topScores link
document.getElementById("view-scores").onclick = displayScores;

// Function that will execute upon clicking the start button
function startQuiz() {
  // Hide title screen and scores button
  instructionsEl.classList.add("hide");
  viewtopScores.classList.add("hide");
  // show question container
  questionContainerEl.classList.remove("hide");
  // Set timer
  startTimer();
  // Show first question
  getQuestion();
}

function startTimer() {
  timeRemainingEl.textContent = "Time: " + time;
  timeLimit = setInterval(function () {
    time--;
    timeRemainingEl.textContent = "Time: " + time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

// show questions in order
function getQuestion() {
  // Get current question
  let questionInfoEl = questions[questionNumEl];
  // If there are no questions left, stop time, end function
  if (questionInfoEl == undefined) {
    endGame();
    return;
  }

  // loop show choices
  for (let i = 0; i < responseOptionsEl.length; i++) {
    responseOptionsEl[i].textContent = i + 1 + ". " + questionInfoEl.choices[i];
    responseOptionsEl[i].value = questionInfoEl.choices[i];
    responseOptionsEl[i].onclick = answerCheck;
  }

  document.getElementById("question-text").textContent = questionInfoEl.title;
  // show the question
  questionContainerEl.classList.remove("hide");
}

// check user selection
function answerCheck() {
  let answerText = "";
  let answer = this.value;

  // console.log(event.target)
  // console.log(this)

  if (answer === questions[questionNumEl].answer) {
    answerText = "Correct!";
  } else {
    answerText = "Wrong!";
    time -= 15;
  }

  // show then hide the result of the response
  resultEl.classList.remove("hide");
  resultEl.innerHTML = `<hr /> ${answerText}`;

  setTimeout(function () {
    resultEl.classList.add("hide");
    resultEl.textContent = "";
  }, 750);

  // get next question
  questionNumEl++;
  getQuestion();
}

// end game
function endGame() {
  clearInterval(timeLimit);
  timeRemainingEl.classList.add("hide");
  // set their score, show end screen, clear timer
  if (time > 0) {
    showScore.textContent = time;
    gameOverEl.classList.remove("hide");
  } else {
    youLoseEl.classList.remove("hide");
    gameOverEl.classList.add("hide");
    tryAgainEl.classList.remove("hide");
  }
  questionContainerEl.classList.add("hide");
  resultEl.classList.add("hide");
}

// record initials and score to local storage and display to screen
function saveScore(event) {
  event.preventDefault();
  let score = {
    initials: playerInitialsEl.value.toUpperCase().trim(),
    score: time,
  };
  // push player input and time to the score array
  topScores.push(score);
  topScores.sort((a, b) => b.score - a.score);
  // convert the data in the array to a string so it will look nice on the screen
  localStorage.setItem("topScores", JSON.stringify(topScores));
  displayScores();
  // show and hide stuff
  showAndHideStuff();
}

// display the leaderboard
function displayScores() {
  scoresListEl.innerHTML = `<ul id="topScoresList">`;
  let topScoresList = document.getElementById("topScoresList");
  topScoresList.innerHTML = topScores
    .map((score) => {
      return `<li class="scoresList">${score.initials} - ${score.score}</li>`;
    })
    .join("");
  // show and hide stuff
  showAndHideStuff();
}

// shorthand function for showing the right divs at the right time
function showAndHideStuff() {
  viewtopScores.classList.add("hide");
  instructionsEl.classList.add("hide");
  gameOverEl.classList.add("hide");
  scoresEl.classList.remove("hide");
  tryAgainEl.classList.remove("hide");
}

// restart game
function tryAgain() {
  window.location.reload();
}

// clear scores from local storage
function clearScores() {
  localStorage.removeItem("topScores");
  while (scoresListEl.lastElementChild) {
    scoresListEl.removeChild(scoresListEl.lastElementChild);
  }
}
