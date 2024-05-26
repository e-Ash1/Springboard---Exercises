function guessingGame() {
    const secretNumber = Math.floor(Math.random() * 100);
    let guesses = 0;
    let gameOver = false;

    return function(guess) {
        if (gameOver) {
            return "The game is over, you already won!";
        }

        guesses++;
        if (guess < secretNumber) {
            return `${guess} is too low!`;
        } else if (guess > secretNumber) {
            return `${guess} is too high!`;
        } else {
            gameOver = true;
            return `You win! You found ${guess} in ${guesses} guesses.`;
        }
    }
}

module.exports = { guessingGame };
