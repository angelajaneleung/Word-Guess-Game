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

//GAME FUNCTION
function Game() {
    //computer generates random word from words array
    randomWord = secretWord[Math.floor(Math.random() * secretWord.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("wordC").innerHTML = "Current Word: <br>" + blanksAndCorrect.join("  ");
}

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
   remainingGuesses = 10;
    guessedLetters = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(guessletter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == guessletter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == guessletter) {
                blanksAndCorrect[i] = guessletter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        guessedLetters.push(guessletter);
       remainingGuesses--;
    }
    document.getElementById("wordC").innerHTML = "Current Word: <br>" + blanksAndCorrect.join(" ");
    console.log(blanksAndCorrect+"hi");
}


//check to see if player won...
function complete() {
    document.getElementById("remainingGuesses").innerHTML = "  " + remainingGuesses;
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + remainingGuesses)


    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        img()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = "Wins: " + wins;

        //if LOST...then alert and reset new round
    } else if (remainingGuesses === 0) {
        losses++;
        reset()

        document.getElementById("losstracker").innerHTML = "Losses: " + losses;
    }
    //display losses on screen && guesses remaining countdown
    // document.getElementById("wordC").innerHTML = "Current Word: <br>" + blanksAndCorrect.join(" ");
    
}
//img function
//
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





//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {

    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    if (alpha.indexOf(guesses)>0) {
        //check to see if guess entered matches value of random word
        checkLetters(guesses);
        //process wins/loss 
        complete();
    
        //display/store incorrect letters on screen
        document.getElementById("guessedLetters").innerHTML = "  " + guessedLetters.join(" ");
        console.log(guesses);
    }
}
//call start game function
Game()