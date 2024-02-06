function drawCard(deckId) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to draw card. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.remaining === 0) {
        alert('No cards remaining in the deck!');
        return;
      }

      console.log(`Card: ${data.cards[0].value} of ${data.cards[0].suit}`);

      displayCard(data.cards[0]);
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    });
}

function displayCard(card) {
  const cardsContainer = document.getElementById('cardsContainer');
  const cardElement = document.createElement('div');
  cardElement.textContent = `${card.value} of ${card.suit}`;
  cardsContainer.appendChild(cardElement);
}

function createNewDeck() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to create new deck. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const deckId = data.deck_id;

      const drawCardBtn = document.getElementById('drawCardBtn');
      drawCardBtn.addEventListener('click', () => drawCard(deckId));
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    });
}

window.addEventListener('load', createNewDeck);
