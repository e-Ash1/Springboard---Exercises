document.addEventListener("DOMContentLoaded", function() {
    const wordForm = document.getElementById("word-form");
    const messageDiv = document.getElementById("message");
    const timerDiv = document.getElementById("timer");
    const scoreDiv = document.getElementById("score");
    let score = 0;
    let gameTimer = 60;
    let wordsUsed = new Set();

    // Timer countdown
    const countdown = setInterval(function() {
        if (gameTimer <= 0) {
            clearInterval(countdown);
            wordForm.style.display = "none";
            messageDiv.innerText = "Time's up!";
        } else {
            timerDiv.innerText = `Time left: ${gameTimer} seconds`;
            gameTimer--;
        }
    }, 1000);

    // Handles the submit form
    wordForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        let wordInput = document.getElementById("word-input");
        let word = wordInput.value.trim().toUpperCase(); // Convert to uppercase to match server-side processing

        // Input validation
        if (!word) {
            messageDiv.innerText = "Please enter a word.";
            return;
        }
        if (!/^[a-zA-Z]+$/.test(word)) {
            messageDiv.innerText = "Invalid characters in word.";
            return;
        }
        if (wordsUsed.has(word)) {
            messageDiv.innerText = "You've already used this word!";
            return;
        }

        // Word verification
        try {
            let response = await axios.get('/check-word', { params: { word: word } });
            if (response.data.result === "ok") {
                wordsUsed.add(word);
                score += word.length;
                scoreDiv.innerText = `Score: ${score}`;
                messageDiv.innerText = "Word accepted!";
            } else {
                messageDiv.innerText = response.data.result === "not-on-board" ? "Word not on board." : "Invalid word.";
            }
        } catch (error) {
            console.error("Error verifying word:", error);
            messageDiv.innerText = "Error verifying word. Please try again.";
        }

        wordInput.value = ""; // Clears input after submission
    });
});
