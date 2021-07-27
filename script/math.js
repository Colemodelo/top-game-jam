export function askMath() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    var op = ["*", "+", "/", "-"][Math.floor(Math.random()*4)];
    var promptString = "How much is " + a + " " + op + " " + b + "?"
    var answer = eval( a + op + b)
    return [promptString, answer]
}


