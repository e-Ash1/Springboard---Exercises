const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let score = 0;
let COLORS = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(color) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", color);
    newDiv.dataset.color = color;
    newDiv.addEventListener("click", handleCardClick);
    return newDiv;
}

function createDivsForColors(colorArray) {
    gameContainer.innerHTML = '';
    const cardElements = colorArray.map(color => createCard(color));
    cardElements.forEach(card => gameContainer.appendChild(card));
}

function flipCard(card) {
    card.style.backgroundColor = card.dataset.color;
    card.classList.add("flipped");
}

function unflipCards() {
    setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        resetCardSelection();
    }, 1000);
}

function disableCards() {
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    resetCardSelection();
}

function resetCardSelection() {
    [card1, card2, noClicking] = [null, null, false];
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function handleCardClick(e) {
    if (noClicking || e.target === card1 || e.target.classList.contains("flipped")) return;

    const currentCard = e.target;
    flipCard(currentCard);

    if (!card1 || !card2) {
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;
        if (card1.dataset.color === card2.dataset.color) {
            cardsFlipped += 2;
            disableCards();
            updateScore();
        } else {
            unflipCards();
        }
    }

    if (cardsFlipped === COLORS.length) {
        noClicking = false;
        alert("Game Over! Your Score: " + score);
        restartGame();
        
    }
}

function restartGame() {
    gameContainer.innerHTML = "";
    card1 = null;
    card2 = null;
    cardsFlipped = 0;
    noClicking = false;
    score = 0;
    scoreDisplay.textContent = score;
    startBtn.style.display = "block";
    restartBtn.style.display = "none";
}

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    restartBtn.style.display = "block";
    COLORS = [
        "red", "blue", "green", "orange", "purple",
        "red", "blue", "green", "orange", "purple"
    ];
    const shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
});

restartBtn.addEventListener("click", () => {
    restartGame();
});