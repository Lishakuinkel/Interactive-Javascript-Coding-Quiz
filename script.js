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

/*var answer1 = document.getElementById("Answer1");
var answer2 = document.getElementById("Answer2");
var answer3 = document.getElementById("Answer3");
var answer4 = document.getElementById("Answer4");*/

let score = 0;
let questionIndex = 0;
let counter = 60;


startbtn.addEventListener('click', startQuiz);

function startTimer() {


    var d = setInterval(functiontimer, 1000);

    function functiontimer() {

        // displayTimer();

        if (counter > 0) {
            counter--;
            console.log(counter);
            document.getElementById("timer").innerHTML = "Timer : " + counter;
            
        
        }

        else if (counter == 0){
            gameover();

        } else {
            clearInterval(d);
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
    questionElement.innerHTML = "Your final score is " + score;
    nextbtn.style.display = "none";

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

highscoresbtn.addEventListener('click', displayHighscores);

function displayHighscores() {
    
    var highscorepage = document.createElement("h1");
    highscorepage.textContent = "Highscores: "
}

function gameover(){
    nextbtn.style.display="none";
    answerButton.style.display="none";
    questionElement.innerHTML = "GAME OVER! Please refresh your page to start again :)" ;
    
}