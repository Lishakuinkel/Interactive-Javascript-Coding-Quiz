// Creating questions array with all the questions and answers for the quiz //
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
var intervalTracker;
let questionIndex = 0;
let counter = 60;
var highscores = [];
var highScores;

// startQuiz() is called when startbtn is clicked //
startbtn.addEventListener('click', startQuiz);

function startQuiz() {

    startbtn.style.display = "none";
    welcomeheader.style.display = "none";
    intro.style.display = "none";
    displayQuiz.style.display = "block";
    highscoreScreen.style.display = "none";
    
    startTimer();
    showQuestion(); 

};


function startTimer() { 
    // starts timer as the quiz starts //
    intervalTracker = setInterval(functiontimer, 1000);

    function functiontimer() {

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
    // removes previous answer options for each new displayed question //
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    //checks from questions array if the selected answer has correct = true or false //
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // when correct = true//

    }
    else {
        selectedBtn.classList.add("incorrect");
        counter = counter - 10; // reduces timer by 10 secs for each incorrect answers//
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

  
    finishedScreen.style.display = "block";
    displayQuiz.style.display = "none";
    nextbtn.style.display = "none";
    answerButton.style.display = "none";
    submitbtn.style.display = "block";

    finalscore.innerHTML = "Your final score is " + score;
  
    clearInterval(intervalTracker); // stopping timer once score is displayed //

    submitbtn.addEventListener('click', formSubmit); // when initials are submitted //
}

function formSubmit() {
    var inputInitials = document.getElementById("initials").value;

    // Retrieving data from Local Storage, null if empty //
    highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highScores.push({ name: inputInitials, score: score });

    // Storing values to Local Storage //
    localStorage.setItem("highscores", JSON.stringify(highScores));
    
}

function handleNextButton() {
    questionIndex++;
    // checks if there are more questions left //
    if (questionIndex < questions.length) {
        showQuestion();
    }
    // no questions are left //
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
    clearInterval(intervalTracker); // stops timer as game is over //
}

highscoresbtn.addEventListener('click', displayHighscores);


function displayHighscores() {
    highscoreScreen.style.display = "block";

    mainquiz.style.display = "none";


    highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    

    highScores = highScores.sort((a, b) => b.score - a.score); 
    // sorting the highscores list in descending order by score value //

    for (i = 0; i < highScores.length; i++) {
        // creating div element for each name initials and their respective scores for styling purpose //
        var div = document.createElement('div');

        var li = document.createElement('li');
        var li2 = document.createElement('li2');

        li2 = highScores[i].score;

        li.textContent = highScores[i].name + " scored " + li2;
       
        // displaying initials with corresponding score values //

        console.log(li);


        div.appendChild(li);
        div.classList.add('row');
        highScoresList.appendChild(div);

    }


}



