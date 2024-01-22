(function () {

  const gameBoard = document.getElementById('game-board');
  const resetButton = document.getElementById('reset-btn');
  let openedCards = [];
  let matchedPairs = 0;

  function generatePairsArray() {
    const pairsArray = [];
    for (let i = 1; i <= 8; i++) {
      pairsArray.push(i, i);
    }
    return pairsArray;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  let isDelayActive = false;

  function handleCardClick(card, number) {
    if (!isDelayActive && openedCards.length < 2 && !openedCards.includes(card) && !card.classList.contains('matched')) {
      openedCards.push(card);
      card.textContent = number;

      if (openedCards.length === 2) {
        const [firstCard, secondCard] = openedCards;
        if (firstCard.textContent === secondCard.textContent) {
          matchedPairs++;
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');

          if (matchedPairs === 8) {
            alert('Поздравляем! Вы выиграли!');
          }
        } else {
          isDelayActive = true;
          setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            isDelayActive = false;
          }, 1000);
        }

        openedCards = [];
      }
    }
  }

  function createCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = '';
    card.addEventListener('click', () => handleCardClick(card, number));
    return card;
  }


  function resetGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    openedCards = [];

    const shuffledPairsArray = shuffleArray(generatePairsArray());

    for (const number of shuffledPairsArray) {
      const card = createCard(number);
      gameBoard.appendChild(card);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

    resetGame();
    resetButton.addEventListener('click', resetGame);

  });


}());
