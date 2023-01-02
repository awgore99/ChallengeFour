let timerElement = document.getElementById("timer");
let startButton = document.getElementById("start");
let questionNumber = 0;
let questionEl = document.getElementById("questions");
let answerEl = document.getElementById('answers');
let answer = "";

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
document.getElementById("quiz").classList.add("d-none");
document.getElementById("gameEnd").classList.add("d-none");

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
        }
    }, 1000)
};

function getQuestions(){
    //Save question answer globally
    answer=questions[questionNumber].answer;

    questionEl.textContent = questions[questionNumber].question;
    answerEl.innerHTML="";
    //Iterate through choices array in the given question
    let choices = questions[questionNumber].choices;
    for (var i=0; i<choices.length; i++) {
        //Create clickability for each choice, as well as adding them to the page
        var selection = document.createElement('button');
        selection.textContent = choices[i];
        answerButton = answerEl.appendChild(selection);
    }
}

startButton.addEventListener("click", start);