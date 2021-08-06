/* -------------------------------------------------------------------------- */
/*                              Global variables                              */
/* -------------------------------------------------------------------------- */
var playerHearts = 5
var enemyHearts = 5
var turnCounter = 0
var difficultyTime = 10

var mathObj = {
  promptString: "",
  answers: [],
  correctAnswer: 0,
}

// Initializes empty timer object
var timerObj = ""
var playerChar = "buck"
var enemyChar = "blob"


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

// Add event listener for buttons
document.getElementById("startBtn").addEventListener("click", game)


/* -------------------------------------------------------------------------- */
/*                              Grab DOM Elements                             */
/* -------------------------------------------------------------------------- */

// DOM element variables not global? Will select within functions...

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// Sorted by types

/* ---------------------------------- Core ---------------------------------- */

function askMath() {
  var a = Math.floor(Math.random() * 10) + 1
  var b = Math.floor(Math.random() * 10) + 1
  var op = ["*", "+", "/", "-"][Math.floor(Math.random() * 4)]
  var promptString = "How much is " + a + " " + op + " " + b + "?"
  var answer = Math.round(eval(a + op + b) * 100) / 100
  // randomly generated N = 40 length array 0 <= A[N] <= 39
  var answers = Array(3)
    .fill()
    .map(() => Math.round(Math.random() * 40))
  // Add correct answer to array of wrong answers
  answers.push(answer)
  // Shuffle array
  answers.sort(() => Math.random() - 0.5)

  // Fill math object, which is passed by reference
  mathObj.promptString = promptString
  mathObj.answers = answers
  mathObj.correctAnswer = answer
} // Returns nothing, math object is passed by reference and manipulated


function renderQuestion() {
  askMath()
  var box = document.getElementById("box")
  var prompt = document.getElementById("prompt")
  box.style.display = "block"
  prompt.style.display = "block"

  prompt.innerHTML = mathObj.promptString

  let answer1 = document.getElementById("answer0")
  answer1.innerHTML = mathObj.answers[0]
  answer1.style.display = "block"
  
  let answer2 = document.getElementById("answer1")
  answer2.innerHTML = mathObj.answers[1]
  answer2.style.display = "block"

  let answer3 = document.getElementById("answer2")
  answer3.innerHTML = mathObj.answers[2]
  answer3.style.display = "block"

  let answer4 = document.getElementById("answer3")
  answer4.innerHTML = mathObj.answers[3]
  answer4.style.display = "block"

  moveTime(difficultyTime)
} // Generates random math question using askMath() and inserts into DOM


function moveTime(time) {
  let timerElement = document.getElementById("timerElement")
  let timerBar = document.getElementById("timerBar")
  let timerText = document.getElementById("timerText")
  let iter = time - 1
  timerBar.max = time
  timerBar.value = 0
  timerText.innerHTML = time + " seconds remaining"
  timerElement.style.display = "block"

  // Clears timer if function runs while timer is still going
  clearInterval(timerObj)

  timerObj = setInterval(function () {
    timerElement.value = time
    if (iter <= 0) {
      // If time runs out, round lose
      roundLose()
    } else {
      timerText.innerHTML = iter + " seconds remaining"
    }
    timerBar.value = time - iter
    iter -= 1
  }, 1000)
} // Starts timer for value of time variable, inserts timer elements into DOM, calls roundLose() if timer runs out

function gameOver(winLose) {
  clearInterval(timerObj)

  let box = document.getElementById("box")
  let startBtn = document.getElementById("startBtn")
  let prompt = document.getElementById("prompt")
  let answer0 = document.getElementById("answer0")
  let answer1 = document.getElementById("answer1")
  let answer2 = document.getElementById("answer2")
  let answer3 = document.getElementById("answer3")
  
  prompt.style.display = "none"
  answer0.style.display = "none"
  answer1.style.display = "none"
  answer2.style.display = "none"
  answer3.style.display = "none"
  box.style.display = "block"
  startBtn.style.display = "block"
  box.innerHTML = "Game Over \n Play Again?"
  
  
  switch (winLose) {
    case "win":
      box.innerHTML = "You Win the game!!"
      break
    case "lose":
      box.innerHTML = "You have been defeated!"
      break
  }


  // Terminate script
  // throw new Error();  
}

/* ------------------------------- Animations ------------------------------- */

function enemyAnimate() {
  let character = document.getElementById(enemyChar)
  let animationNum = Math.floor(Math.random() * 4)
  switch (animationNum) {
    case 1:
      character.setAttribute("class", "attack")
      break
    default:
      // idle
      character.setAttribute("class", "idle")
  }
} // Generates a random enemy animation


function playerAnimate() {
  let character = document.getElementById(playerChar)
  let animationNum = Math.floor(Math.random() * 4)
  switch (animationNum) {
    case 1:
      character.setAttribute("class", "attack")
      break
    default:
      // idle
      character.setAttribute("class", "idle")
  }
} // Generates a random player animation


/* ---------------------------------- Setup --------------------------------- */

function renderHealth() {
  let playerHealth = document.getElementById("playerHealth")
  let enemyHealth = document.getElementById("enemyHealth")
  // Remove all playerHearts
  while (playerHealth.firstChild) {
    playerHealth.removeChild(playerHealth.lastChild);
  }
  // Render PlayerHearts
  for (let i = 0; i < playerHearts; i++) {
    let img = document.createElement("img")
    img.src = "assets/heart.png"
    playerHealth.appendChild(img)
  }
  // Remove all enemyHearts
  while (enemyHealth.firstChild) {
    enemyHealth.removeChild(enemyHealth.lastChild);
  }
  // Render enemyHearts
  for (let i = 0; i < enemyHearts; i++) {
    let img = document.createElement("img")
    img.src = "assets/heart.png"
    enemyHealth.appendChild(img)
  }
} // Clears playerHearts and inserts amount of elements to the value of playerHearts variable


// function chooseDifficulty() {
//   // ask difficulty
//   document.getElementById("box").style.display = "block"
//   document.getElementById("prompt").innerHTML = "Choose your difficulty level"
//   // pause execution
//   // start execution again
// }  // (NOT FINISHED) Will show difficulty prompt and edit global difficulty variable

// function chooseCharacters(){
// } // Inserts character choice prompt elements into DOM and sets global variables


/* --------------------- Checkers (Not a technical term) -------------------- */

function checkAnswer(chosenAnswerDivId) {
  let chosenAnswer = document.getElementById(chosenAnswerDivId).innerHTML
  if (chosenAnswer == mathObj.correctAnswer) {
    roundWin()
  } else {
    roundLose()
  }
} // Returns true or false depending on if math question is answered correctly


/* --------------------------------- Rounds --------------------------------- */

function roundLose() {
  document.getElementById("timerElement").style.display = "none"
  document.getElementById("box").style.display = "none"

  clearInterval(timerObj)
  enemyAnimate(enemyChar)
  playerHearts = playerHearts - 1
  renderHealth()

  // Check if playerHearts depleted, and if not start new round
  if (playerHearts == 0) {
    gameOver("lose")
  } else {
    newRound()
  }
} // Clears timer, animate enemy, decrement playerHearts
 

function roundWin(){
  clearInterval(timerObj)
  playerAnimate()
  enemyHearts = enemyHearts - 1
  renderHealth()

  if (enemyHearts == 0) {
    gameOver("win")
  } else {
    newRound()
  }
} // Clears timer, animate player


/* -------------------------------------------------------------------------- */
/*                                  Game Loops                                */
/* -------------------------------------------------------------------------- */

function newRound(){

 renderQuestion()

  
}


function game() {
  // Setup initial game state
  hearts = 5
  renderHealth()
  document.getElementById("startBtn").style.display = "none"

  // Intro lore and/or any other creative intro stuff

  // Choose character screen

  // Choose difficulty screen

  // Game loop
  newRound()
  
}

// Clicking Start Game button starts game loop