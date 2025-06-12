const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const text = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

let questions = [];
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const urlParams = new URLSearchParams(window.location.search);
const selectedMode = urlParams.get("mode") || "easy";

fetch("question.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data[selectedMode]; // Load questions based on difficulty
    startGame();
  })
  .catch((err) => {
    console.error("Failed to load questions.json", err);
    alert("Could not load questions. Please try again later.");
  });

const Correct_point = 10;
const MAX_QUESTIONS = 10;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  text.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const index = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[index];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(index, 1);
  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const isCorrect = selectedAnswer == currentQuestion.answer;

    const classToApply = isCorrect ? "correct" : "incorrect";
    if (isCorrect) incrementScore(Correct_point);

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}
