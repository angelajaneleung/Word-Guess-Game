//guessing words//
var secretWord = ["fritos", "sunchips", "doritos", "smartfood"]
var alpha =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
//empty variables//
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var guessedLetters = [];
//counters//
var wins = 0;
var losses = 0;
var remainingGuesses = 10;

//GAME FUNCTION//
function Game() {
    randomWord = secretWord[Math.floor(Math.random() * secretWord.length)];
    lettersOfWord = randomWord.split("");
    blanks = lettersOfWord.length;
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }
    document.getElementById("wordC").innerHTML = "Current Word: <br>" + blanksAndCorrect.join("  ");
}
//RESET FUNCTION//
function reset() {
   remainingGuesses = 10;
    guessedLetters = [];
    blanksAndCorrect = [];
    Game()
}
//CHECK LETTERS/COMPARE FUNCTION//
function checkLetters(guessletter) {
    var letterInWord = false;
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == guessletter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == guessletter) {
                blanksAndCorrect[i] = guessletter;
            }
        }
    }
    else {
        guessedLetters.push(guessletter);
       remainingGuesses--;
    }
    document.getElementById("wordC").innerHTML = "Current Word: <br>" + blanksAndCorrect.join(" ");
}
//check to see if player wins or losses//
function complete() {
    document.getElementById("remainingGuesses").innerHTML = "  " + remainingGuesses;
    //if won display new image and reset to new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        img()
        reset()
        document.getElementById("winstracker").innerHTML = "Wins: " + wins;
        //if lost then reset to new round
    } else if (remainingGuesses === 0) {
        losses++;
        reset()
        document.getElementById("losstracker").innerHTML = "Losses: " + losses;
    }
}
//img function//
function img() {
   //fritos
    if (randomWord === secretWord[0]) { 
        document.getElementById("start").src = "assets/images/fritos.png";
    }
     //sunchips
     else if (randomWord === secretWord[1]) {
        document.getElementById("start").src = "assets/images/sunchips.png";
    }
      //doritos
      else if (randomWord === secretWord[2]) {

        document.getElementById("start").src = "assets/images/doritos.png";
    }
      //smartfood
      else if (randomWord === secretWord[3]) {

        document.getElementById("start").src = "assets/images/smartfood.png";
    }
}
//check for keyup, and convert to lowercase, also checks agains the alpha array then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    if (alpha.indexOf(guesses)>-1) {
        checkLetters(guesses);
        complete();
    
//display/store incorrect letters on screen
        document.getElementById("guessedLetters").innerHTML = "  " + guessedLetters.join(" ");
        console.log(guesses);
    }
}
//call start game function
Game()