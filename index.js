//Variables
let timer = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const MAX_HIGH_SCORES = 5;

const start = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");

//LocalStorage Objects
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Questions are Here
const questions = [
  {
    question: "How many planets are in our solar system?",
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false }
    ]
  },
  {
    question: "Constellation names are derived from?",
    answers: [
      { text: "English", correct: false },
      { text: "Latin", correct: true },
      { text: "American", correct: false },
      { text: "Italian", correct: false }
    ]
  },
  {
    question: "Precession of the rotation axis of the earth is caused by?",
    answers: [
      { text: "Magnetic field of the Earth", correct: false },
      { text: "The force of gravity from the sun and moon on Earths equatorial bulge", correct: true },
      { text: "Asteroid impacts", correct: false },
      { text: "The force of gravity from the Sun and Jupiter on the Earth-moon system", correct: false }
    ]
  },
  {
    question: 'Star names such as Aldebaran and Betelgeuse are:?',
    answers: [
      { text: 'English', correct: false },
      { text: 'Arabic', correct: true },
      { text: 'Greek', correct: false },
      { text: 'Latin', correct: false }
    ]
  },
  {
    question: "Star A has an apparent visual magnitude of 13.4 and Star B has an apparent visual magnitude of 15.4. Star A is_______than Star B?",
    answers: [
      { text: "2 times brighter", correct: false },
      { text: "6.3 times brighter", correct: true },
      { text: "2 times fainter", correct: false },
      { text: "6.3 times fainter", correct: false }
    ]
  }
];

//Event Listeners

start.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

//function to start the game

function startGame() {
  
    qNumber = 0;
    
    scoreArea.innerHTML = "";
    
    start.classList.add("hide");
  
    scoreArea.classList.add("hide");
  
    answerButtons.classList.remove("hide");
  
  
    qContainer.classList.remove("hide");
  
  
    startClock();
  
    while (answerButtons.firstChild) {
    
        answerButtons.removeChild(answerButtons.firstChild);
    
    }
  
    showQuestion(questions[qNumber]);
}

//function to display the questions

function showQuestion(question) {

    qElement.innerText = question.question;

    question.answers.forEach(answer => {

        const button = document.createElement("button");
    
        button.innerText = answer.text;
    
        button.classList.add("btn");
    
        if (answer.correct) {
    
            button.dataset.correct = answer.correct;
    
        }
    
        button.addEventListener("click", selectAnswer);
    
        answerButtons.appendChild(button);
    });
}

//function to start the timer

function startClock() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

//function to collect answers

function selectAnswer(e) {

    const selectedButton = e.target;

    if (!selectedButton.dataset.correct) {
    
        timer = timer - 10;
    
        console.log(timer);
    }
    if (qNumber == questions.length - 1) {
    
        gameOver();
    
    } 
    else {
    
        clearQuestion();
    
        qNumber++;
    
        showQuestion(questions[qNumber]);
    
        console.log(score);
    }
}

//function to clear the current question

function clearQuestion() {
    
    while (answerButtons.firstChild) {
    
        answerButtons.removeChild(answerButtons.firstChild);
    
    }
}

//function for game over

function gameOver() {
  
    timer = 90;
  
    score = 0;

    clearInterval(runningTimer);
  
    countdown.innerHTML = "Finished";
  
    clearQuestion();
  
    showResults();
  
    startButton.innerText = "Restart";
  
    startButton.classList.remove("hide");
  
}

// Display Results

function showResults() {
    finalScore = timer;
    
    if (finalScore < 0) {
    
        finalScore = 0;
    
    }
    
    qElement.innerText = "";
  
    scoreArea.classList.remove("hide");
  
    answerButtons.classList.add("hide");
  
    scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  
    username = document.getElementById("initials");
  
    saveButton = document.getElementById("save-btn");
  
    username.addEventListener("keyup", function() {
  
        saveButton.disabled = !username.value;
    });
}

//function to submit high scores

function submitScores(e) {
    const score = {
    
        score: finalScore,
    
        name: username.value
    };
    
    highScores.push(score);
    
    highScores.sort((a, b) => b.score - a.score);
    
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    displayScores();
}

//function to display high scores

function displayScores() {
  
    clearInterval(runningTimer);
    
    countdown.innerHTML = "";
    
    clearQuestion();
    
    qElement.innerText = "";
    
    scoreArea.classList.remove("hide");

    scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    
    const highScoresList = document.getElementById("highScoresList");
    
    highScoresList.innerHTML = highScores
    
    .map(score => {return `<li class="scoresList">${score.name} - ${score.score}</li>`;}).join("");
  
    startButton.classList.remove("hide");
  
    highScoresButton.classList.add("hide");
};

//function to clear high scores

function clearScores() {
  
    highScores = [];
  
    highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
  
    document.getElementById("clearScores").classList.add("hide");
}