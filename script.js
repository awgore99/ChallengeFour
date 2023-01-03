let timerElement = document.getElementById("timer");
let timerCount = 60;
let startButton = document.getElementById("start");
let questionNumber = 0;
let questionEl = document.getElementById("questions");
let answerEl = document.getElementById('answers');
let answer = "";
let scoreEl = document.getElementById("points");
let score = 0;
let sumbitButton = document.getElementById("nameButton");
let playerName = document.getElementById("playerName");
let scores = document.getElementById("scores");
//Questions Object
const questions = [
    {
        question: "What file type do we use to declare a file to be a Javascript File?",
        choices: [".html", ".css", ".js", ".pdf"],
        answer: ".js"
    },
    {
        question: "What is the tag we need in an html page to include a js file?",
        choices: ["<script>", "<scribe>", "<scoob>", "<scrape>"],
        answer: "<script>"
    },
    {
        question: "Which method removes the last element of an array?",
        choices: ["pop()", "slice()", "split()", "None of the above"],
        answer: "pop()"
    }
];

//Hides the quiz and finish containers until needed
if (document.getElementById("quiz") && document.getElementById("gameEnd")) {
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("gameEnd").classList.add("d-none");
};
function start() {
    //Hiding instructions container and showing quiz container
    document.getElementById("instructions").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");

    setTimer();
    getQuestions();

}

function setTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        } else if (questionNumber === questions.length + 1) {
            clearInterval(timer);
            endGame();
        }
    }, 1000)
};

function getQuestions() {
    //Save question answer globally
    answer = questions[questionNumber].answer;

    questionEl.textContent = questions[questionNumber].question;
    answerEl.innerHTML = "";
    //Iterate through choices array in the given question
    let choices = questions[questionNumber].choices;
    for (var i = 0; i < choices.length; i++) {
        //Create clickability for each choice, as well as adding them to the page
        var selection = document.createElement('button');
        selection.textContent = choices[i];
        answerButton = answerEl.appendChild(selection);
    }
    questionNumber++;
}

if (startButton) {
    startButton.addEventListener("click", start);
};
//Checks the answer and then either updates the score, or timer
if (answerEl) {
    answerEl.addEventListener("click", function (event) {
        let correctBool = document.getElementById("correctBool");
        if (answer === event.target.textContent) {
            correctBool.innerHTML = "Correct! 1 point added to your score!";
            score++;
            scoreEl.textContent = "Score: " + score;
        } else {
            correctBool.innerHTML = "Incorrect! 3 seconds removed from your quiz timer!"
            timerCount = timerCount - 3;
        }
        getQuestions();
    })
};

function endGame() {
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("gameEnd").classList.remove("d-none");
}

function saveScore() {
    let name = playerName.value.trim();
    let scores = JSON.parse(window.localStorage.getItem('scores')) || [];
    let newScore = {
        score: score,
        name: name
    }
    scores.push(newScore);
    window.localStorage.setItem('scores', JSON.stringify(scores));
    window.location.href = 'scores.html';
}

function getScores() {
    let scores = JSON.parse(window.localStorage.getItem('scores'));
    for (let i = 0; i < scores.length; i++) {
        var li = document.createElement('li');
        li.textContent = scores[i].name + ' - ' + scores[i].score;

        var scoreBox = document.getElementById('scores');
        scoreBox.appendChild(li);
    }
};
if (sumbitButton) {
    sumbitButton.addEventListener("click", saveScore);
};
if (scores) {
    getScores();
};