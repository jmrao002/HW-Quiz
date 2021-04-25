// Global variables
let time = 15 * questions.length;
let timeLimit;
let questionContainerEl = document.getElementById("question-container");
let questionTextEl = document.getElementById("question-text");
let responseOptionsEl = [
  document.getElementById("option0"),
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
];
let resultEl = document.getElementById("answer-result");
let playerInitialsEl = document.getElementById("player-initials");
let alertBoxEl = document.getElementById("alert-box");
let questionNumEl = 0;
let scoresArrayEl;
// playerInitialsEl.value = "";

// Function that will execute upon clicking the start button
function startQuiz() {
  // Hide title screen
  let hideInstructions = document.getElementById("instructions-screen");
  hideInstructions.classList.add("hide");
  // Set timer
  let timeRemainingEl = document.getElementById("time-remaining");
  timeRemainingEl.textContent = "Time: " + time;
  // show question container
  questionContainerEl.style = "display: block";
  // Show first question
  getQuestion();
  startTimer();
}

function startTimer() {
  timeLimit = setInterval(function () {
    time--;
    document.getElementById("time-remaining").textContent = "Time: " + time;
    if (time <= 0) {
      clearInterval(timeLimit);
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
    clearInterval(time);
    endGame();
    return;
  } else {
    // loop show choices
    for (let i = 0; i < responseOptionsEl.length; i++) {
      responseOptionsEl[i].textContent =
        i + 1 + ". " + questionInfoEl.choices[i];
      responseOptionsEl[i].value = questionInfoEl.choices[i];
    }
    document.getElementById("question-text").textContent = questionInfoEl.title;
    // show the question
    questionContainerEl.style = "display: block";
  }
  answerCheck();
}

// check user selection
function answerCheck(event) {
  let answerText = "";
  let answer = event.target.value;
  if (event.target.nodeName == "BUTTON") {
    if (answer) {
      if (answer === questions[questionNumEl].answer) {
        answerText = "Correct!";
      } else {
        answerText = "Wrong!";
        time -= 15;
        // set timer to zero if it goes negative
        if (time <= 0) {
          time = 0;
        }
      }

      // show then hide the result of the response
      resultEl.innerHTML = `<hr /> ${answerText}`;
      if (resultEl.style != "display: block;") {
        resultEl.style = "display: block;";
      }
      setTimeout(function () {
        resultEl.style = "display: none;";
      }, 750);
    }
    // get next question
    questionNumEl++;
    getQuestion();
  }
}

// end game
function endGame() {
  let gameOverEl = document.getElementById("end-game-container");
  // set their score, show end screen, clear timer
  if (time != 0) {
    document.getElementById("#show-score").textContent = time;
  } else {
    document.getElementById("#show-score").textContent =
      "You did not finish 🤦‍♂️🤦‍♀️";
  }
  setTimeout(function () {
    questionContainerEl.style = "display: none";
    resultEl.style = "display: none;";
    gameOverEl.classList.remove("hide");
  }, 750);
}

// save high score
function saveHighScore(event) {
  event.preventDefault();
  if (playerInitials.value.trim() == "") {
    if (alertBoxEl.style != "display:block;") {
      alertBoxEl.style = "display:block;";

      setTimeout(function () {
        alertBoxEl.style = "display: none;";
      }, 1000);
    }
    return;
  } else {
    let newHighScore = {
      initials: playerInitialsEl.value.toUpperCase().trim(),
      score: time,
    };
    scoresArrayEl.push(newHighScore);
    scoresArrayEl.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItm("local-high-scores", JSON.stringify(scoresArrayEl));
    window.location.href = "./scores.html";
  }
}


// prompt for initials
// save score to localStorage

// event listeners
// start button click
document.getElementById("start-btn").onclick = startQuiz;
// check answer click
document.addEventListener("click", answerCheck);
// save high score
document.getElementById("submit-button").onclick = saveHighScore;
