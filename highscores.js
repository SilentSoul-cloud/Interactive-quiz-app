const highScoresList = document.getElementById("List");
const clearScoresBtn = document.getElementById("clear");

function renderScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.innerHTML = highScores.length
    ? highScores
        .map((score) => `<li>${score.name} - ${score.score}</li>`)
        .join("")
    : "<li>No high scores yet.</li>";
}

clearScoresBtn.addEventListener("click", () => {
  localStorage.removeItem("highScores");
  renderScores();
});

renderScores();
