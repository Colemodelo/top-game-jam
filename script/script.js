/* -------------------------------------------------------------------------- */
/*                              Global variables                              */
/* -------------------------------------------------------------------------- */

var turnCounter = 0
var mathObj = {
  promptString : '',
  answers : [],
  correctAnswer : 0
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

// Add event listener for buttons
document.getElementById("promptBtn").addEventListener("click", renderQuestion)

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function askMath(mathObj) {
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

// function enemyAnimate(character, animation) {
//   let character = document.getElementById(character)
//   switch (animation) {
//     case attack1:
//       character.setAttribute("class", "attack")
//       break
//     default:
//       // idle
//       character.setAttribute("class", "idle")
//   }
// }
// function playerAnimate(character, animation) {
//   let character = document.getElementById(character)
//   switch (animation) {
//     case attack1:
//       character.setAttribute("class", "attack")
//       break
//     default:
//       // idle
//       character.setAttribute("class", "idle")
//   }
// }

function renderQuestion() {
  askMath(mathObj)
  document.getElementById("box").style.display = "block"
  document.getElementById("prompt").innerHTML = mathObj.promptString
  let answer1 = document.getElementById("answer0")
  answer1.innerHTML = mathObj.answers[0]
  let answer2 = document.getElementById("answer1")
  answer2.innerHTML = mathObj.answers[1]
  let answer3 = document.getElementById("answer2")
  answer3.innerHTML = mathObj.answers[2]
  let answer4 = document.getElementById("answer3")
  answer4.innerHTML = mathObj.answers[3]
}

// function timer(level, difficulty) {
//   // countdown every second
//   setInterval(function () {}, 1000)
//   clearInterval(x)

//   // After 5 seconds, check answer
//   setTimeout(function () {
//     if (checkAnswer) {
//       playerAnimate()
//     } else {
//       enemyAnimate()
//     }
//   }, 5000)
// }

// function chooseDifficulty() {
//   // ask difficulty
//   document.getElementById("box").style.display = "block"
//   document.getElementById("prompt").innerHTML = "Choose your difficulty level"
//   // pause execution
//   // start execution again
// }

// Check answer
function checkAnswer(chosenAnswerId) {
  let chosenAnswer = document.getElementById(chosenAnswerId).innerHTML
  if (chosenAnswer == mathObj.correctAnswer) {
    console.log("Correct!")
    return true
  } else {
    console.log("Wrong!")
    return false
  }
}

// function gameOver() {}

/* -------------------------------------------------------------------------- */
/*                                  Game Loop                                 */
/* -------------------------------------------------------------------------- */
// function startGame() {
//   while (true) {
//     renderQuestion()
//     if (checkAnswer(answer)) {
//       playerAnimate()
//     } else {
//       enemyAnimate()
//     }
//     if (hearts == 0){
//       gameover()
//     }
//   }
// }
