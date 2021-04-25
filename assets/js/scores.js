let scoresArray = JSON.parse(localStorage.getItem("localHighScores"));

function printLeaderboard() {
  let scoresList = document.getElementById("scores-list");
  let html = "";
  let scoreAlternating = false;
  for (var i = 0; i < scoresArray.length; i++) {
    if (scoreAlternating) {
      html += `<h3 class="scoreStyle scoreAltColour">${i + 1}. ${
        scoresArray[i].initials
      } - ${scoresArray[i].score}</h3>`;
      scoreAlternating = false;
    } else {
      html += `<h3 class="scoreStyle">${i + 1}. ${scoresArray[i].initials} - ${
        scoresArray[i].score
      }</h3>`;
      scoreAlternating = true;
    }
  }
  scoresList.innerHTML = html;
}

function clearScores() {
  localStorage.clear();
  scoresList.innerHTML = "";
}

printLeaderboard();
document.getElementById("clear-scores").onclick = clearScores;
