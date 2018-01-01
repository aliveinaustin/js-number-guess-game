/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

guessInput.focus();

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameWrapper.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})


// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);

    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please Enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum){
        // Game Over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
        // Disable input
        
    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
        // Game Over - Lost
        gameOver(false, `Game Over! YOU LOST! The correct number was ${winningNum}`)        
        } else {
            // Game continues - answer wrong
            gameOver(false, `${guess} is incorrect. You have ${guessesLeft} guesses left. Try again.`)                    
            
            //Clear Input field
            guessInput.value = '';

            // Send focus to guessInput field
            guessInput.focus();
            
        }

    }
})

// Game Over function
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    if(won || guessesLeft === 0) {
        guessInput.disabled = true

        // Play again
        guessBtn.value = "Play Again";
        guessBtn.className += 'play-again'
    
    };

    // Change border color
    guessInput.style.borderColor = color;
    
    // Set message
    setMessage(msg, color)

    
}

// Get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message function
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}