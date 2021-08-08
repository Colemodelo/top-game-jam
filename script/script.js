/* -------------------------------------------------------------------------- */
/*                              Global variables                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Settings -------------------------------- */

const maxPlayerHearts = 5
const maxEnemyHearts = 5
const maxRound = 4
const maxDifficultyTime = 10
const difficultyTimeOffset = 2

/* --------------------------- Game Data Variables -------------------------- */

var enemies = ['blob', 'skeleton', 'mushroom', 'wizard']

/* ------------------------------- Initialize ------------------------------- */

var mathObj = {
  promptString: "",
  answers: [],
  correctAnswer: 0,
}

var enemyHearts
var playerHearts
var round
var difficultyTime
var timerObj = ""
var paragraph = ""


/* ------------------------------ Reset Globals ----------------------------- */

function resetGlobals() {
  playerHearts = maxPlayerHearts
  enemyHearts = maxEnemyHearts
  difficultyTime = maxDifficultyTime
  round = maxRound - maxRound + 1

  mathObj = {
    promptString: "",
    answers: [],
    correctAnswer: 0,
  }
  // Initializes empty timer object
  timerObj = ""
}


/* ----------------------------- Event Listeners ---------------------------- */

document.getElementById("startBtn").addEventListener("click", game);

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
  var prompt = document.getElementById("prompt")
  displayBox(true)
  prompt.innerHTML = mathObj.promptString

  let answer0 = document.getElementById("answer0")
  answer0.innerHTML = mathObj.answers[0]

  let answer1 = document.getElementById("answer1")
  answer1.innerHTML = mathObj.answers[1]

  let answer2 = document.getElementById("answer2")
  answer2.innerHTML = mathObj.answers[2]

  let answer3 = document.getElementById("answer3")
  answer3.innerHTML = mathObj.answers[3]

  moveTime(difficultyTime)
} // Generates random math question using askMath() and inserts into DOM


function moveTime(time) {
  let timerBar = document.getElementById("timerBar")
  let timerText = document.getElementById("timerText")
  let iter = time - 1
  timerBar.max = time
  timerBar.value = 0
  timerText.innerHTML = time + " seconds remaining"

  // Clears timer if function runs while timer is still going
  clearInterval(timerObj)

  timerObj = setInterval(function () {
    timerElement.value = time
    if (iter <= 0) {
      // If time runs out, round lose
      turnLose()
    } else {
      timerText.innerHTML = iter + " seconds remaining"
    }
    timerBar.value = time - iter
    iter -= 1
  }, 1000)
} // Starts timer for value of time variable, inserts timer elements into DOM, calls turnLose() if timer runs out


function gameOver(winLose) {
  clearInterval(timerObj)
  displayBox(false)
  let startBtn = document.getElementById("startBtn")

  startBtn.style.display = "block"

  switch (winLose) {
    case "win":
      document.getElementById("enemyChar").setAttribute('class', '')
      setMessage('You Win The Game!')
      break
    case "lose":
      document.getElementById("playerChar").setAttribute("src", "")
      setMessage('You Have Been Defeated')
      break
  }

}

/* ------------------------------- Animations ------------------------------- */

function enemyAnimate(animation) {
  let character = document.getElementById("enemyChar")
  switch (animation) {
    case "attack":
      character.setAttribute("class", `${enemies[round-1]}-attack`)
      break
    case "move":
      character.setAttribute("class", `${enemies[round-1]}-move`)
      break
    case "death":
      character.setAttribute("class", `${enemies[round-1]}-death`)
      break
    case "damaged":
      character.setAttribute("class", `${enemies[round-1]}-damaged`)
      break
    case "fullAttackAnimation":
      enemyAnimate("move")
      setTimeout(function () {
        enemyAnimate("attack");
        playerAnimate("damage")
      }, 800);
      setTimeout(function () {
        enemyAnimate("move");
        playerAnimate()
      }, 2000);
      setTimeout(function () {
        enemyAnimate();
      }, 2800);
      break
    default:
      character.setAttribute("class", `${enemies[round-1]}-idle`)
  }
} // Enemy Animate


function playerAnimate(animation) {
  let character = document.getElementById("playerChar")
  switch (animation) {
    case "attack":
      character.setAttribute("src", "assets/buck/buck-attacks.gif")
      character.setAttribute("class", "buck-attacks")
      break
    case "damage":
      character.setAttribute("src", "assets/buck/buck-damaged.gif")
      character.setAttribute("class", "buck-damaged")
      break
    case "move":
      character.setAttribute("src", "assets/buck/buck-running.gif")
      character.setAttribute("class", "buck-running")
      break
    case "death":
      character.setAttribute("src", "assets/buck/buck-damaged.gif")
      character.setAttribute("class", "buck-damaged")
      break
    case "fullAttackAnimation":
      playerAnimate("move")
      setTimeout(function () {
        playerAnimate("attack");
        enemyAnimate("damaged")
      }, 800);
      setTimeout(function () {
        enemyAnimate()
        playerAnimate("move")
        playerAnimate()
      }, 2000);
      setTimeout(function () {
        playerAnimate();
      }, 2800);
      break

    default:
      character.setAttribute("src", "assets/buck/buck-idle.gif")
      character.setAttribute("class", "buck-idle")
  }
} // Player Animate


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


/* --------------------- Checkers (Not a technical term) -------------------- */

function checkAnswer(chosenAnswerDivId) {
  let chosenAnswer = document.getElementById(chosenAnswerDivId).innerHTML
  if (chosenAnswer == mathObj.correctAnswer) {
    turnWin()
  } else {
    turnLose()
  }
} // Returns true or false depending on if math question is answered correctly


/* --------------------------------- Setters -------------------------------- */

function setMessage(message) {
  let messageBox = document.getElementById("messageBox")

  while (messageBox.firstChild) {
    messageBox.removeChild(messageBox.firstChild);
}
  paragraph = document.createElement("p")
  paragraph.textContent = message
  paragraph.className = 'roundMessage'
  messageBox.appendChild(paragraph)
}


function displayBox(bool) {
  var blockNone = bool ? 'block' : 'none'
  document.getElementById("timerElement").style.display = blockNone
  document.getElementById("box").style.display = blockNone
  document.getElementById("prompt").style.display = blockNone
  document.getElementById("answer0").style.display = blockNone
  document.getElementById("answer1").style.display = blockNone
  document.getElementById("answer2").style.display = blockNone
  document.getElementById("answer3").style.display = blockNone
}


/* --------------------------------- Rounds --------------------------------- */

function turnLose() {
  displayBox(false)

  clearInterval(timerObj)
  enemyAnimate("fullAttackAnimation")
  playerHearts = playerHearts - 1
  renderHealth()

  // Check if playerHearts depleted, and if not start new round

  if (playerHearts <= 0) {
    playerAnimate('damaged')
    setTimeout(function () {
      newRound();
    }, 2000);
  } else {
    newTurn()
  }

} // Clears timer, animate enemy, decrement playerHearts


function turnWin() {
  displayBox(false)
  clearInterval(timerObj)
  playerAnimate("fullAttackAnimation")
  enemyHearts = enemyHearts - 1
  renderHealth()

  if (enemyHearts <= 0) {
    displayBox(false)
    setMessage(`${enemies[round-1]} has been defeated!`)
    enemyAnimate('death')
    setTimeout(function () {
      newRound();
    }, 2000);
  } else {
    newTurn()
  }

} // Clears timer, animate player


/* -------------------------------------------------------------------------- */
/*                            Countdown                                       */
/* -------------------------------------------------------------------------- */
function countDown(parent, callback) {
  // These are all the text we want to display
  var texts = ['3', '2', '1', 'Fight!'];
  // This will store the paragraph we are currently displaying
  // Initiate an interval, but store it in a variable so we can remove it later.
  var interval = setInterval(count, 1000);

  // This is the function we will call every 1000 ms using setInterval
  function count() {
    if (paragraph) {
      // Remove the paragraph if there is one
      paragraph.remove();
    }
    if (texts.length === 0) {
      // If we ran out of text, use the callback to get started
      // Also, remove the interval
      // Also, return since we dont want this function to run anymore.
      clearInterval(interval);
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

    parent.appendChild(paragraph);
  }
}


/* -------------------------------------------------------------------------- */
/*                                  Game Loops                                */
/* -------------------------------------------------------------------------- */


function newRound() {
  round = round + 1
  enemyHearts = maxEnemyHearts
  difficultyTime = difficultyTime - difficultyTimeOffset
  renderHealth()
  enemyAnimate()

  if (round >= maxRound+1) {
    gameOver('win')
  } else if (round == maxRound && enemyHearts <= 0) {
    displayBox(false)
    gameOver('win')
  } else if (playerHearts <= 0) {
    displayBox(false)
    gameOver('lose')
  } else {
    setMessage(`Round ${round}`)
    setTimeout(function () {
      countDown(messageBox, newTurn);
    }, 2000);
  }
}


function newTurn() {
  // Every turn, check health
  if (playerHearts <= 0) {
    displayBox(false)
    gameOver('lose')
  } else if (enemyHearts <= 0) {
    setMessage(`${enemies[round-1]} has been defeated!`)

    setTimeout(function () {
      newRound();
    }, 2000);
    
  } else {
    displayBox(true)
    renderQuestion()
  }
}


function game() {
  // Resets global variables on new game
  resetGlobals()

  // Setup initial game state
  renderHealth()

  // Hide start btn, show characters
  document.getElementById("messageBox").innerHTML=""
  document.getElementById("startBtn").style.display = "none"
  document.getElementById("playerChar").style.display = "block"
  document.getElementById("enemyChar").style.display = "block"

  playerAnimate()
  enemyAnimate()


  // Game loop
  setMessage(`Round ${round}`)
  setTimeout(function () {
    countDown(messageBox, newTurn);
  }, 2000);

}

// Clicking Start Game button starts game loop