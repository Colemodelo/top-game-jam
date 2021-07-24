function askMath() {
  var a = Math.floor(Math.random() * 10) + 1
  var b = Math.floor(Math.random() * 10) + 1
  var op = ["*", "+", "/", "-"][Math.floor(Math.random() * 4)]
  var promptString = "How much is " + a + " " + op + " " + b + "?"
  var answer = eval(a + op + b)
  // randomly generated N = 40 length array 0 <= A[N] <= 39
  var answers = Array(3).fill().map(() => Math.round(Math.random() * 40))
  // Add correct answer to array of wrong answers
  answers.push(answer)
  // Shuffle array
  answers.sort(() => Math.random() - 0.5);
  return [promptString, answers]
}


// document.getElementById("changeAnimBtn").addEventListener("click", function () {
//   document.getElementById("buck").src = "../assets/buck/buck-running.gif"
// })


document.getElementById("promptBtn").addEventListener("click", function () {
 var [promptString, answers] = askMath()
  document.getElementById("box").style.display = "block"
  document.getElementById("prompt").innerHTML = promptString
  document.getElementById("answer1").innerHTML = answers[0]
  document.getElementById("answer2").innerHTML = answers[1]
  document.getElementById("answer3").innerHTML = answers[2]
  document.getElementById("answer4").innerHTML = answers[3]
})
