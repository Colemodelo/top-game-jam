/* -------------------------------------------------------------------------- */
/*                              Global variables                              */
/* -------------------------------------------------------------------------- */
var playerHearts = 5
var enemyHearts = 5
var turnCounter = 0
var difficultyTime = 10
var round = 0

var mathObj = {
  promptString: "",
  answers: [],
  correctAnswer: 0,
}

// Initializes empty timer object
var timerObj = ""


playerAnimations = ["idle"]
enemyAnimations = ["blob-idle", "blob-move", "blob-attack", "blob-death"]


function resetGlobals(){
playerHearts = 5
enemyHearts = 5
turnCounter = 0
difficultyTime = 10
round = 0

mathObj = {
  promptString: "",
  answers: [],
  correctAnswer: 0,
}

// Initializes empty timer object
timerObj = ""
}


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

// Add event listener for buttons
// document.addEventListener("DOMContentLoaded", game)



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

  let answer0 = document.getElementById("answer0")
  answer0.innerHTML = mathObj.answers[0]
  answer0.style.display = "block"
  // answer0.addEventListener("click", checkAnswer('answer0'))
  
  let answer1 = document.getElementById("answer1")
  answer1.innerHTML = mathObj.answers[1]
  answer1.style.display = "block"
  // answer1.addEventListener("click", checkAnswer('answer1'))

  let answer2 = document.getElementById("answer2")
  answer2.innerHTML = mathObj.answers[2]
  answer2.style.display = "block"
  // answer2.addEventListener("click", checkAnswer('answer2'))

  let answer3 = document.getElementById("answer3")
  answer3.innerHTML = mathObj.answers[3]
  answer3.style.display = "block"
  // answer3.addEventListener("click", checkAnswer('answer3'))

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

function enemyAnimate(animation) {
  let character = document.getElementById("enemyChar")
  switch (animation) {
    case "attack":
      character.setAttribute("class", "blob-attack")
      break
    case "move":
      character.setAttribute("class", "blob-move")
      break
    case "fullAttackAnimation":
      enemyAnimate("move")
      setTimeout(function(){ enemyAnimate("attack"); playerAnimate("damage") }, 800);
      setTimeout(function(){ enemyAnimate("move"); playerAnimate()}, 2000);
      setTimeout(function(){ enemyAnimate(); }, 2800);
      break
    default:
      // idle
      character.setAttribute("class", "blob-idle")
  }
} // Generates a random enemy animation


function playerAnimate(animation) {
  let character = document.getElementById("playerChar")
  switch (animation) {
    case "attack":
      character.setAttribute("class", "attack")
      break
    case "damage":
      // character.setAttribute("class", "attack")
      character.setAttribute("src", "assets/buck/buck-damaged.gif")
      break
    case "running":
      character.setAttribute("class", "attack")
      break
    case "death":
      character.setAttribute("class", "attack")
      break
    default:
      // idle
      character.setAttribute("src", "assets/buck/buck-idle.gif")
      character.setAttribute("class", "buck-idle")
  }
} // Generates a random player animation


/* ---------------------------------- Setup --------------------------------- */

function renderHealth() {
  let playerHealth = document.getElementById("playerHealth")
  let enemyHealth = document.getElementById("enemyHealth")
  let buckName = document.getElementById("buckName")
  let enemyName = document.getElementById("enemyName")
  // Remove all playerHearts
  while (playerHealth.firstChild) {
    playerHealth.removeChild(playerHealth.lastChild);
  }
  // Render PlayerHearts
  for (let i = 0; i < playerHearts; i++) {
    let img = document.createElement("img")
    img.src = "assets/heart.png"
    playerHealth.appendChild(img)
    
    // Render "Buck's Health:" text
    buckName.innerHTML = "Buck's Health:"
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

    // Render "Enemies Health:" text
    enemyName.innerHTML = "Enemies"
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
  enemyAnimate("fullAttackAnimation")
  playerHearts = playerHearts - 1
  renderHealth()

  // Check if playerHearts depleted, and if not start new round
  if (playerHearts <= 0) {
    gameOver("lose")
  } else {
    newTurn()
  }
} // Clears timer, animate enemy, decrement playerHearts
 

function roundWin(){
  clearInterval(timerObj)
  playerAnimate()
  enemyHearts = enemyHearts - 1
  renderHealth()

  if (enemyHearts <= 0) {
    gameOver("win")
  } else {
    newTurn()
  }
} // Clears timer, animate player

/* -------------------------------------------------------------------------- */
/*                            Countdown                                       */
/* -------------------------------------------------------------------------- */
function countDown( parent, callback ){
    // These are all the text we want to display
    var texts = ['3', '2', '1', 'Fight!'];
    // This will store the paragraph we are currently displaying
    var paragraph = null;
    // Initiate an interval, but store it in a variable so we can remove it later.
    var interval = setInterval( count, 1000 );

  // This is the function we will call every 1000 ms using setInterval
  
  function count(){
    if( paragraph ){
      // Remove the paragraph if there is one
      paragraph.remove();
    }
    if( texts.length === 0 ){ 
      // If we ran out of text, use the callback to get started
      // Also, remove the interval
      // Also, return since we dont want this function to run anymore.
      clearInterval( interval );
      callback();
      return;
    }
    // Get the first item of the array out of the array.
    // Your array is now one item shorter.
    var text = texts.shift();

    // Create a paragraph to add to the DOM
    // This new paragraph will trigger an animation
    paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.className = text + " nums";

    parent.appendChild( paragraph );
  }

}


/* -------------------------------------------------------------------------- */
/*                                  Game Loops                                */
/* -------------------------------------------------------------------------- */

function newRound(){
  var messageBox = document.getElementById("messageBox")
  messageBox.style.display="block"
  countDown(document.getElementById("messageBox"), newTurn)
  }

function newTurn(){
  renderQuestion();
}

function game() {
  // Resets global variables on new game
  resetGlobals()

  // Setup initial game state
  renderHealth()

  // Hide start btn, show characters
  // document.getElementById("startBtn").style.display = "none"
  document.getElementById("playerChar").style.display = "block"
  document.getElementById("enemyChar").style.display = "block"

  playerAnimate()
  enemyAnimate()


  // Game loop
  newRound()
  
}

// Clicking Start Game button starts game loop
