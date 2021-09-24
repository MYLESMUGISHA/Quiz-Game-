// empty array that hold question from the APi( question.Json)
let questionArray = [];
let questionNumber = 0;
let score = 0
let startButton = document.getElementById("start-btn");
let questionAnswer = document.getElementById("questionAnswer");
let answerInput = document.getElementById("userAnswer");
let submitBtnAnswer = document.getElementById("submit");
let scoreCounter = document.getElementById("scoreCounter");
let answerCheck = document.getElementById("checkAnswer");
let questionText = document.getElementById("question");
let GameContainer = document.querySelector('.container');
let welcomeMessage = document.getElementById("wel-mes");
let startingMinutes = 10;
let time = startingMinutes *60;
let countDowEl= document.getElementById("counterDown")
let started = false;
let interval = null;

startButton.addEventListener("click", startGame)
 
function getData() {
    fetch("https://jservice.io/api/clues?category=90")
        .then(response => {
            return response.json();
        }).then(data => displayQuestion(data));
}

function displayQuestion(data) {
    let randomQuestion = data[Math.floor(Math.random() * data.length)];
    questionText.innerHTML = "Question : " + randomQuestion.question;
    answer = randomQuestion.answer;
}

submitBtnAnswer.addEventListener("click", function(e) {

    e.preventDefault();
    let userAnswer = answerInput.value;
    GameContainer.style.background = "Grey";
    if (userAnswer === "") {
        answerCheck.innerHTML = "Hey provide the answer";
          setTimeout(function removeMessage() {
        answerCheck.innerHTML = " ";
    }, 4000) 

    } else if (userAnswer === answer) {
        score += 1;
        scoreCounter.innerHTML = "Score : " + score;
        answerInput.value = "";
        GameContainer.style.background = "Yellow";
        answerCheck.innerHTML = "you nail it! you got one point";
    } 

    else {

        endGame()
        
    }
    console.log(answer);

    if (score === 5) {
        console.log("Game Over !")
        scoreCounter.innerHTML = "";
        questionText.innerHTML = "";
        GameContainer.style.background = "Teal";
        startButton.innerText = "Play Again";
        submitBtnAnswer.style.display = "none";
        answerInput.style.display = "none"
        answerCheck.innerHTML = "Congratulations for finishing the Game 🎉, Your final score is " + score;
        score = 0;
    }

})

function updateCountdown(){

    let minutes = Math.floor(time/60);
    let seconds = time% 60;
    seconds = seconds< 10? "0" + seconds: seconds;
    countDowEl.innerHTML = "Time Left For your Game" + " " +  `${minutes}: ${seconds}`;
   time--;
    if (time==0){
        clearInterval (interval)
        started =false;
        countDowEl.innerHTML = "Time is over" 
        time;
   endGame()
   if (score === 5) {
    console.log("Game Over !")
    scoreCounter.innerHTML = "";
    questionText.innerHTML = "";
    GameContainer.style.background = "Teal";
    startButton.innerText = "Play Again";
    submitBtnAnswer.style.display = "none";
    answerInput.style.display = "none"
    answerCheck.innerHTML = "Congratulations for finishing the Game 🎉, Your final score is " + score;
    score = 0;
}

    }
 }

function startGame() {

if(!started){

    if(time >= 0){

  interval= setInterval(updateCountdown, 1000); 
        started = true;
        time;
    }
    else{
        clearInterval (interval)
         started =false;
        countDowEl.innerHTML = "Time is over" 
   endGame()
    console.log("Game Over !")
    scoreCounter.innerHTML = "";
    questionText.innerHTML = "";
    GameContainer.style.background = "Teal";
    startButton.innerText = "Play Again";
    submitBtnAnswer.style.display = "none";
    answerInput.style.display = "none"
    answerCheck.innerHTML = "Congratulations for finishing the Game 🎉, Your final score is " + score;
    score = 0;

    }
}
getData();
    startButton.innerText = "Display Question";
    answerCheck.innerHTML = "";
    submitBtnAnswer.style.display = "block";
    answerInput.style.display = "block";
    welcomeMessage.style.display = "none";
}
function displayBtn() {
    submitBtnAnswer.style.display = "none";
    answerInput.style.display = "none";
    welcomeMessage.innerHTML = "Hey, Welcome to Trivia Game!";
}
displayBtn();
function endGame(){

        score = 0;
        startButton.innerText = "Restart";
        answerInput.value = "";
        questionText.innerHTML = "";
        GameContainer.style.background ="white";
        scoreCounter.innerHTML = "Score : " + score;
        answerCheck.innerHTML = "oops, wrong answer ! try again with correct answer";
        setTimeout(function removeMessage() {
            answerCheck.innerHTML = " ";
        }, 2000)

}
