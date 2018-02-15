// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase)
var wordsList = ['beer','food', 'drinks', 'hospital', 'timeout', 'kingdom', 'deliverance', 'extreme'];
// Solution will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;

var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution is chosen randomly from wordList.
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  // The word is broken into individual letters.
  lettersInChosenWord = chosenWord.split("");
  // We count the number of letters in the word.
  numBlanks = lettersInChosenWord.length;

  // We print the solution in console (for testing).
  console.log(chosenWord);

 //setting the start of the game up for correct and wrong choices. 
  blanksAndSuccesses = [];
 
  wrongGuesses = [];

  // Fill up the blanksAndSuccesses list with appropriate number of blanks.
  // This is based on number of letters in solution.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Print the initial blanks in console. for testing.
  console.log(blanksAndSuccesses);


  // Reprints the guessesLeft to 9
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}


function checkLetters(letter) {

  // Toggle if letter is in word.
  var letterInWord = false;

  // Check if a letter exists inside the array at all.
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).
  if (letterInWord) {

    // Loop through the word.
    for (var j = 0; j < numBlanks; j++) {

      // Populate the blanksAndSuccesses with every instance of the letter.
      if (chosenWord[j] === letter) {
        // Here we set the specific space in blanks and letter equal to the letter when there is a match.
        blanksAndSuccesses[j] = letter;
      }
    }
    // Logging for testing.
    console.log(blanksAndSuccesses);
  }
  // If the letter doesn't exist at all...
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongGuesses.push(letter);
    numGuesses--;
  }
}

function roundComplete() {

  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  // If we have gotten all the letters to match the solution...
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
    // ..add to the win counter & give the user an alert.
    winCounter++;
    alert("You win!");

    // Update the win counter in the HTML & restart the game.
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();
  }

  //runs code if you didn't guess correctly and ran out of guesses
  else if (numGuesses === 0) {
    // Add to the loss counter.
    lossCounter++;
    alert("You lose");

    // Update the loss counter in the HTML.
    document.getElementById("loss-counter").innerHTML = lossCounter;
    // Restart the game.
    startGame();
  }

}


//Actually starting the game
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Converts all key clicks to lowercase letters.
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
};
