const fiveLetterWords = [
  "APPLE",
  "GRAPE",
  "MUSIC",
  "OCEAN",
  "DREAM",
  "HAPPY",
  "CLOUD",
  "SMILE",
  "TOAST",
  "SHINE",
];

function mainGameLogic() {
  var popup = document.querySelector(".popup");
  var restartButton = document.querySelector(".restart");
  var remainingAttempts = 10;
  document.querySelector(
    ".remaining-message"
  ).innerHTML = `You have ${remainingAttempts} attempts remaining`;

  function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
  var wordToGuess = fiveLetterWords[getRandomIndex(fiveLetterWords)];
  // Now we have the word to guess

  //Randomly selecting the words
  const myArray = [0, 1, 2, 3, 4];

  // Function to get random elements from the array and then sort them
  function getRandomSortedElements(array, numElements) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const randomElements = shuffled.slice(0, numElements);
    return randomElements.sort((a, b) => a - b); // Adjust the sorting logic as needed
  }
  
  // Get three random elements sorted
  const randomElements = getRandomSortedElements(myArray, 3);

  
  //Now we have to put the place holder in the index that are in the randomElements array
  for (let i = 0; i < 5; i++) {
    if (randomElements.includes(i)) {
      document.querySelector(`.letter-${i}`).innerHTML =
        '<div class="placeholder"></div>';
    }
  }

  //Now we have to display the word inside the container
  for (let i = 0; i < 5; i++) {
    if (!randomElements.includes(i)) {
      document.querySelector(`.letter-${i}`).innerHTML = `${wordToGuess[i]}`;
    }
  }
  // Now we need to make the function to check the submitted Letter
  var pointer = 0;

  function checkSubmission(submittedLetter) {
    if (submittedLetter == "") {
      alert("Please enter a letter!");
    } else if (pointer < randomElements.length && submittedLetter == wordToGuess[randomElements[pointer]]) {
      let letterBox = document.querySelector(`.letter-${randomElements[pointer]}`);
      letterBox.innerHTML = `${submittedLetter}`;
      console.log(submittedLetter);
  
      document.querySelector(".message").innerHTML = `Good guess! The word has letter ${submittedLetter.toUpperCase()}`;
  
      pointer++;
  
      if (pointer == randomElements.length) {
        return true;
      }
    } else {
      remainingAttempts--;
      document.querySelector(".remaining-message").innerHTML = `You have ${remainingAttempts} attempts remaining`;
      document.querySelector(".message").innerHTML = `Wrong Guess! This word does not have letter ${submittedLetter.toUpperCase()}`;
      document.querySelector(".wrong-letters-collection").innerHTML += `${submittedLetter}`;
  
      if (remainingAttempts == 0) {
        popup.style.display = "flex";
        document.querySelector(".popup-message").textContent = "Oops! Out of Attempts";
      }
    }
    return false;
  }

  //Now we have to take inputs for the remaining letters and check if it is correct

  function handleGuessButton() {
    var letterInputBox = document.querySelector(".letter-input");
    var submittedLetter = letterInputBox.value.toUpperCase();
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
  document
    .querySelector(".guess-btn")
    .addEventListener("click", handleGuessButton);
  document
    .querySelector(".letter-input")
    .addEventListener("keydown", handleKeyPress);

  // working of the restart button
  restartButton.onclick = function () {
    // Reload the current page
    location.reload();
  };
}
mainGameLogic();
