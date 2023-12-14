function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startGame() {
    const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    shuffleArray(cards);

    const memoryGameElement = document.getElementById('memory-game');
    const timerElement = document.getElementById('time');
    const attemptsElement = document.getElementById('failed-attempts');

    let flippedCards = [];
    let matchedPairs = 0;
    let clicks = 0;
    let failedAttempts = 0;
    let timer;

    function startTimer() {
      let seconds = 0;
      timer = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    function flipCard(event) {
      const selectedCard = event.target;

      if (flippedCards.length < 2 && selectedCard.textContent === '?' && !flippedCards.includes(selectedCard)) {
        // Añadida clase para rotar la carta
        selectedCard.classList.add('flipped');

        selectedCard.textContent = cards[selectedCard.dataset.index];
        flippedCards.push(selectedCard);

        if (flippedCards.length === 2) {
          clicks++;

          if (flippedCards[0].textContent === flippedCards[1].textContent) {
            // Match
            flippedCards = [];
            matchedPairs++;
            if (matchedPairs === cards.length / 2) {
              stopTimer();
              alert(`¡Has ganado en ${clicks} intentos y ${timerElement.textContent} segundos!`);
            }
          } else {
            // No match, flip cards back after a delay
            setTimeout(() => {
              flippedCards.forEach(card => {
                card.textContent = '?';
                card.classList.remove('flipped'); // Quita la clase para rotar la carta
              });
              flippedCards = [];
              failedAttempts++;
              attemptsElement.textContent = failedAttempts;
            }, 1000);
          }
        }
      }
    }

    const reset = document.getElementById('resetGame');
  reset.addEventListener('click' , resetGame = () => {     


    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    clicks = 0;
    failedAttempts = 0;
    timerElement.textContent = 0;
    attemptsElement.textContent = 0;

    const cardsElements = document.querySelectorAll('.memory-card');
    cardsElements.forEach(card => {
      card.textContent = '?';
      card.classList.remove('flipped');
    });

    shuffleArray(cards);
    startTimer();

  
})

    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('memory-card');
      cardElement.dataset.card = card;
      cardElement.dataset.index = index;
      cardElement.textContent = '?';

      cardElement.addEventListener('click', flipCard);

      memoryGameElement.appendChild(cardElement);
    });

    startTimer();
  }

  window.onload = startGame;