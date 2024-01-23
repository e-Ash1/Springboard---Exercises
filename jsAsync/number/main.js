// Part 1:
// A:) Number Facts through JSON:
function randomNumber(){
  return Math.floor(Math.random()*100);
}

const baseURL = 'http://numbersapi.com';

$.getJSON(`${baseURL}/${randomNumber()}?json`)
  .then(data => { 
    $('#fact-container').append($('<li></li>').text(data.text));
  })
  .catch(error => {
    console.log(`Server error status: ${error}`);
  });

// B:) Batch Request:

async function fetchRandomNumberData() {
  const array = [];
  const numRequests = 4; 
  const baseURL = 'http://numbersapi.com';

  for (let i = 0; i < numRequests; i++) {
    try {
      const response = await $.getJSON(`${baseURL}/${randomNumber()}?json`);
      array.push(response);
    } catch (error) {
      console.log(`Server Status Error: ${error}`);
    }
  }

  return array;
}

// C:) Template onto HTML Page:
async function displayDataOnPage() {
  const data = await fetchRandomNumberData();
  const container = $('#fact-container');

  await Promise.all(data.map(async (item) => {
    const fact = item.text;
    const factElement = $('<li></li>').text(fact);
    container.append(factElement);
  }));
}

displayDataOnPage();


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
    $('#card-container').append($('<li></li>').text(`Drawn Cards: ${cardList.join(', ')}`));
  })
  .catch(error => {
    console.log(`Server Status Error: ${error}`);
  });
