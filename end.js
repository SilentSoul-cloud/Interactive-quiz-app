const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

if (!mostRecentScore) {
  window.location.assign("index.html");
}

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: Number(mostRecentScore),
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES); // only keep top 5

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
}
saveScoreBtn.addEventListener("click", saveHighScore);
