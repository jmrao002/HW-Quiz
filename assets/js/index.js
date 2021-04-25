// Global variables

let time = 15 * questions.length;
let timeLimit;
const questionContainerEl = document.getElementById("question-container");
const questionTextEl = document.getElementById("question-text");
let responseOptionsEl = document.getElementsByClassName("answerChoice");
let timeRemainingEl = document.getElementById("time-remaining");
let instructionsEl = document.getElementById("instructions-screen");
let resultEl = document.getElementById("answer-result");
let initialsFormEl = document.getElementById("enter-initials");
let playerInitialsEl = document.getElementById("player-initials");
let alertBoxEl = document.getElementById("alert-box");
let gameOverEl = document.getElementById("end-game-container");
let showScore = document.getElementById("show-score");
let questionNumEl = 0;
let scoresEl = document.getElementById("scores-container");
playerInitialsEl.value = "";

// event listeners
// start button click
document.getElementById("start-btn").onclick = startQuiz;
// save high score
initialsFormEl.onsubmit = saveHighScore;
// try again button
document.getElementById("try-again").onclick = tryAgain;

// Function that will execute upon clicking the start button
function startQuiz() {
  // Hide title screen
  instructionsEl.classList.add("hide");

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

  // answerCheck();
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
    resultEl.innerHTML = "";
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
  } else {
    showScore.textContent = "You did not finish 🤦‍♂️🤦‍♀️";
  }

  setTimeout(function () {
    questionContainerEl.classList.add("hide");
    resultEl.classList.add("hide");
    gameOverEl.classList.remove("hide");
  }, 750);
}

// save high score
function saveHighScore(event) {
  event.preventDefault();

  let newHighScore = {
    initials: playerInitialsEl.value.toUpperCase().trim(),
    score: time,
  };
  highscores.push(newHighScore);
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  SetScore();
  gameOverEl.classList.add("hide");
  scoresEl.classList.remove("hide");
}

function displayScores() {
  LocalStorageKey.forEach((obj) => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerHTML = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);
  });
}

function tryAgain() {
  scoresEl.classList.add("hide");
  instructionsEl.classList.remove("hide");
}

function clearScores() {
  
}
