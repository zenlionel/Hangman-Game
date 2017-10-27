//Game Logic
var words = ["beers", "vanilla", "mandarin", "superman"];
//word choosing
var wordSelector = words[Math.floor(Math.random() * words.length)];
//letters pressed wrong
var answer = [];
var theWord;
var life = 10;
var wasteLett = []
var theW;
$(document).ready(function () {
    console.log("ready!");

    document.getElementById("start").onclick = startGame;

    function startGame() {
        for (var i = 0; i < wordSelector.length; i++) {
            answer[i] = "_";

        }
        theWord = answer.join(" ");
        console.log(theWord)
        document.getElementById("word").innerHTML = theWord;
    };
    document.onkeyup = function (event) {
        takeLetter(event.key);
        document.getElementById("word").innerHTML = answer;

    }
    //this shit doesn't work how i want it too >:(
    //this was supposed to put everything into an array
   /* document.onkeyup = function wrongLetter(userGuess) {
        if (wasteLett.includes(userGuess)) {
            alert('you pressed that button already');
        } else {
            wasteLett.push(userGuess);
          if (answer.includes(userGuess)) {
              wasteLett.push(userGuess);
          }
        }
        
    }
    */
    document.getElementById("lettGuess").innerHTML = wasteLett;


function takeLetter(userGuess) {
    var loss = true;

    for (var i = 0; i < answer.length; i++) {
        if (userGuess === wordSelector[i]) {
            answer[i] = userGuess;
            loss = false;
        }
    }
    if (loss === true) {
       
        life--;
        document.getElementById("guessRem").innerHTML = "You have " + life + " life left.";
    }

    if (life === 0) {
        alert("You lost the game, click OK to start over!");
        window.location.reload(true);
    }
    return loss;

}
});