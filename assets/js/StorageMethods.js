const LocalStorageKey = "highscores";
const highscores = GetScore();

// highscores.push({ name: "ben", score: Number.MAX_SAFE_INTEGER });
// SetScore(highscores)
// SetScore(data);
// console.log(typeof data, data, data.toString(), JSON.stringify(data));

// localStorage.setItem(LocalStorageKey, JSON.stringify(data));
// var response = localStorage.getItem(LocalStorageKey);

// console.log(typeof response, response, JSON.parse(response));

function SetScore() {
  SetLocal(LocalStorageKey, highscores);
}
function GetScore() {
  return GetLocal(LocalStorageKey) || [];
}

function SetLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function GetLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
