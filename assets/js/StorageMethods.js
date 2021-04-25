const LocalStorageKey = "highscores";
const highscores = GetScore();

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
