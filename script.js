const fiveLetterWords = [
    'apple'
  ];



function mainGameLogic(){
    var popup = document.querySelector(".popup");
    var restartButton = document.querySelector(".restart");
    var remainingAttempts = 10;
    document.querySelector(".remaining-message").innerHTML= `You have ${remainingAttempts} attempts remaining`;

    function getRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
    var wordToGuess = fiveLetterWords[getRandomIndex(fiveLetterWords)];
    // Now we have the word to guess

    //Now we have to display the word inside the container 
    const firstLetterBox = document.querySelector(".letter-0");
    firstLetterBox.textContent = wordToGuess[0];
    const lastLetterBox = document.querySelector(".letter-4");
    lastLetterBox.textContent = wordToGuess[4];
    // Now we need to make the function to check the submitted Letter 
    var pointer = 1 ;
    function checkSubmission(submittedLetter){
            if(pointer < wordToGuess.length-1 && submittedLetter == wordToGuess[pointer]){
                let letterBox = document.querySelector(`.letter-${pointer}`)
                letterBox.innerHTML = `${submittedLetter}`;
                document.querySelector(".message").innerHTML =`Good guess ! The word has letter ${submittedLetter.toUpperCase()}`;

                pointer++;
                if(pointer ==wordToGuess.length -1  ){
                    return true;
                }
            }
            else{
                remainingAttempts--;
                document.querySelector(".remaining-message").innerHTML= `You have ${remainingAttempts} attempts remaining`;
                document.querySelector(".message").innerHTML = `Wrong Guess ! This word does not have letter ${submittedLetter.toUpperCase()}`;
                document.querySelector(".wrong-letters-collection").innerHTML += `${submittedLetter}`;
                if(remainingAttempts ==0){
                    popup.style.display ='flex';
                   document.querySelector(".popup-message").textContent ="Oops! Out of Attempts"
                
                }
            }
            return false;
    }

    //Now we have to take inputs for the remaining letters and check if it is correct
    
    function handleGuessButton() {
        var letterInputBox = document.querySelector(".letter-input");
        var submittedLetter = letterInputBox.value;
        console.log(submittedLetter);
        letterInputBox.value = ""; // Clearing the input box after every submission
        if (checkSubmission(submittedLetter)) {
            popup.style.display = "flex";
            document.querySelector(".popup-message").textContent = "Right Answer";
        }
    }
    
    function handleKeyPress(event) {
        // Check if the key pressed is Enter (key code 13)
        if (event.keyCode === 13) {
            handleGuessButton();
        }
    }
    
    // Adding event listeners
    document.querySelector('.guess-btn').addEventListener('click', handleGuessButton);
    document.querySelector(".letter-input").addEventListener('keydown', handleKeyPress);
    
    // working of the restart button 
    restartButton.onclick = function() {
        // Reload the current page
        location.reload();
    };

}
mainGameLogic();