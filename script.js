// WHEN I click the start button THEN a timer starts and I am presented with a question
// WHEN I answer a question THEN I am presented with another question
// WHEN I answer a question incorrectly THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0 THEN the game is over
// WHEN the game is over THEN I can save my initials and my score
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false }
        ],
    },

    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "'<head>' section", correct: false },
            { text: "'<body>' section", correct: false },
            { text: "Both '<head>' and '<body>' sections", correct: true },
            { text: "Inside CSS", correct: false }
        ],

    },

    {
        question: "How do you create a function in JavaScript?",
        answers: [{ text: "function function_name()", correct: true },
        { text: "function:function_name()", correct: false },
        { text: "function=function_name()", correct: false },
        { text: "function_function_name()", correct: false }]
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [{ text: "if (i!=5)", correct: true },
        { text: "if i<>5", correct: false },
        { text: "if (i<>5)", correct: false },
        { text: "if (i=!5) then", correct: false }]
    },
    {
        question: "What will be the output for this code : console.log(1 +  '2' + '2')?",
        answers: [{ text: "122", correct: true },
        { text: "5", correct: false },
        { text: "NaN", correct: false },
        { text: "1'2''2'", correct: false }]
    }
];
//DOM elements
var questionElement = document.getElementById("question");
var answerButton = document.getElementById("answerbuttons");
var startbtn = document.getElementById("btn-start");
var nextbtn = document.getElementById("btn-next");
var welcomeheader = document.getElementById("welcome");
var intro = document.getElementById("introguide");
var scoredisplay = document.getElementById("finalscore");
var highscoresbtn = document.getElementById("highscores");
var displayQuiz = document.getElementById("quiz");
var mainquiz = document.getElementById("main");
var gameoverpage = document.getElementById("gameover");
var highScoresList = document.getElementById("highscoreslist");
const initialsform = document.getElementById("initialsform");
const nameinput = initialsform['name'];
var submitbtn = document.getElementById("submitbtn");
var highscoreScreen = document.getElementById("highscores-screen");
var finishedScreen = document.getElementById("finished-screen");
var finalScore = document.getElementById("finalscore");
 
let score = 0;
let questionIndex = 0;
let counter = 60;
var highscores=[];
var highScores;

startbtn.addEventListener('click', startQuiz);
var intervalTracker;

function startTimer() {


    intervalTracker = setInterval(functiontimer, 1000);  

    function functiontimer() {

        // displayTimer();

        if (counter > 0) {
            counter--;
            console.log(counter);
            document.getElementById("timer").innerHTML = "Timer : " + counter;


        }

       else if (counter == 0) {
            gameover();
            

        }
    }
}

function startQuiz() {
    questionIndex = 0;
    score = 0;
    startbtn.style.display = "none";
    welcomeheader.style.display = "none";
    intro.style.display = "none";
    displayQuiz.style.display = "block";
    highscoreScreen.style.display = "none";
    showQuestion();
    startTimer();

};


function showQuestion() {
    resetState();

    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    questionElement.innerHTML = questionNumber + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        console.log(answer.text);
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

function resetState() {
    startbtn.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    }
    else {
        selectedBtn.classList.add("incorrect");
        counter = counter - 10;
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";

}



function showScore() {
    resetState();
    scoredisplay.textContent = score;
    finishedScreen.style.display = "block";
    displayQuiz.style.display = "none";
    finalscore.innerHTML = "Your final score is " + score;
    nextbtn.style.display = "none";
    answerButton.style.display = "none";
    submitbtn.style.display = "block";
    clearInterval(intervalTracker);

    submitbtn.addEventListener('click', formSubmit);
}

function formSubmit() {
    var inputInitials = document.getElementById("initials").value;

   highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highScores.push({name:inputInitials,score:score});
    localStorage.setItem("highscores", JSON.stringify(highScores));
}

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextbtn.addEventListener('click', handleNextButton);


function gameover() {
    nextbtn.style.display = "none";
    answerButton.style.display = "none";
    finishedScreen.style.display = "block";
    questionElement.innerHTML = "GAME OVER! Please refresh your page to start again :)";
    clearInterval(intervalTracker);
}

highscoresbtn.addEventListener('click', displayHighscores);


function displayHighscores() {
    highscoreScreen.style.display = "block";
    
    mainquiz.style.display = "none";
    
    console.log(localStorage);
    highScoresList.innerHTML = JSON.parse(localStorage.getItem("highscores"));

   
}


