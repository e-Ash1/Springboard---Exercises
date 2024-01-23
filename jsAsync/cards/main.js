//Part 1:
// A:)DOM Manipulation:
$(document).ready(function() {
    var deckId = null;
    var drawCardButton = document.getElementById('draw-card');
    var cardContainer = document.getElementById('card-container');

    // Function to create a new deck using jQuery for the AJAX call
    function createNewDeck() {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                deckId = data.deck_id;
            }
        });
    }

    function drawCard() {
        $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.cards && data.cards.length > 0) {
                    const card = data.cards[0];
                    // Create a new img element for the card
                    const cardElement = document.createElement('img');
                    cardElement.src = card.image;
                    cardElement.alt = `${card.value} of ${card.suit}`;
                    // Add the 'card' class for styling and stacking
                    cardElement.classList.add('card');
                    // Offset the card by the number of cards already in the container
                    const offset = cardContainer.childNodes.length * 20; // Change the multiplier to increase/decrease the stacking offset
    
                    // Random rotation between -15 and 15 degrees
                    const rotation = (Math.random() * 30) - 15; // This gives a random angle between -15 and 15
                    cardElement.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
    
                    cardElement.style.top = `${offset}px`;
                    // Append the new card to the card container
                    cardContainer.appendChild(cardElement);
                    console.log(`${card.value} of ${card.suit}`);
                } else {
                    // Disable the button and change its text when no cards are left
                    drawCardButton.disabled = true;
                    drawCardButton.innerText = 'No cards left!';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error fetching card:', textStatus, errorThrown);
            }
        });
    }
    
    

    // Event listener for the draw card button:
    drawCardButton.addEventListener('click', drawCard);

    // Initialize the deck when the page loads:
    createNewDeck();
});



// Part 2:
// A:) Request Call for a Single Card:
const templateURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

$.getJSON(templateURL)
  .then(data => {
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`);
  })
  .then(cardData => {
    const cards = cardData.cards;
    const cardList = cards.map(card => `${card.value} of ${card.suit}`);
  })
  .catch(error => {
    console.log(`Server Status Error: ${error}`);
  });