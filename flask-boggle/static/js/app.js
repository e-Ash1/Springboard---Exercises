document.addEventListener("DOMContentLoaded", function() {
    const wordForm = document.getElementById("word-form");
    const messageDiv = document.getElementById("message");
    const timerDiv = document.getElementById("timer");
    const scoreDiv = document.getElementById("score");
    let score = 0;
    let gameTimer = 60;
    let wordsUsed = new Set();


    console.log("wordForm:", wordForm);
    console.log("messageDiv:", messageDiv);
    console.log("timerDiv:", timerDiv);
    console.log("scoreDiv:", scoreDiv);

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

    console.log("wordForm:", wordForm);
    console.log("messageDiv:", messageDiv);
    console.log("timerDiv:", timerDiv);
    console.log("scoreDiv:", scoreDiv);

    //Handles the submit form
    wordForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        //Word fetch from HTML --> Javascript
        let wordInput = document.getElementById("word-input");
        let word = wordInput.value;
            //Conditional to determine if value has already been submitted:
            if (wordsUsed.has(word)) {
                messageDiv.innerText = "You've already used this word!";
                return;
            }

            
        let response = await axios.get('/check-word', { params: { word: word } });
            if (response.data.result === "ok") {
                wordsUsed.add(word);
                score += word.length;
                scoreDiv.innerText = `Score: ${score}`;
            }
        messageDiv.innerText = response.data.result;
        wordInput.value = ""; // Clears input after submission
    });
});
