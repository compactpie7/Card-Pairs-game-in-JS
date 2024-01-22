(function () {
  const gameBoard = document.getElementById('game-board');
  const resetButton = document.getElementById('reset-btn');
  const startGameBtn = document.getElementById('startGameBtn');
  const cardCountInput = document.getElementById('cardCountInput');
  const timerDisplay = document.getElementById('timer-display');
  let openedCards = [];
  let matchedPairs = 0;
  let isDelayActive = false;
  let cardCount = 4;
  let timer;

  function generatePairsArray(count) {
    const pairsArray = [];
    for (let i = 1; i <= count; i++) {
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

          if (matchedPairs === cardCount * cardCount / 2) {
            setTimeout(() => {
              alert('Поздравляем! Вы выиграли!');
              setTimeout(resetGame, 500);
            }, 500);

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
    clearInterval(timer);
    matchedPairs = 0;
    openedCards = [];

    const userCardCount = parseInt(cardCountInput.value, 10);
    if (userCardCount >= 2 && userCardCount <= 10 && userCardCount % 2 === 0) {
      cardCount = userCardCount;
    } else {
      alert('Некорректное значение. Установлено значение по умолчанию (4).');
    }

    gameBoard.style.gridTemplateColumns = `repeat(${cardCount}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${cardCount}, 1fr)`;

    const shuffledPairsArray = shuffleArray(generatePairsArray(cardCount));
    gameBoard.innerHTML = ''; // Очистка содержимого доски

    for (const number of shuffledPairsArray) {
      const card = createCard(number);
      gameBoard.appendChild(card);
    }

    applyThemeToCards(); // Применить тему к новым карточкам

    startTimer();
}


function applyThemeToCards() {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.toggle('dark-theme', isDarkTheme));
}

  function startTimer() {
    let secondsLeft = 60;

    function updateTimer() {
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timerDisplay.textContent = formattedTime;

      if (secondsLeft <= 0) {
        alert('Время вышло! Игра завершена.');
        resetGame();
      }
      secondsLeft--;
    }

    timer = setInterval(updateTimer, 1000);
  }

  document.addEventListener('DOMContentLoaded', function () {
    startGameBtn.addEventListener('click', resetGame);
    resetButton.addEventListener('click', resetGame);

    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-theme');

      const isDarkTheme = document.body.classList.contains('dark-theme');

      gameBoard.classList.toggle('dark-theme', isDarkTheme);

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => card.classList.toggle('dark-theme', isDarkTheme));

      const timerDisplay = document.getElementById('timer-display');
      timerDisplay.classList.toggle('dark-theme', isDarkTheme);
    });
  });
})();
