function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const dom = {
    game: document.getElementById('game'),
    guessInput: document.getElementById('guessInput'),
    guessButton: document.getElementById('guessButton'),
    feedback: document.getElementById('feedback'),
    attemptsDisplay: document.getElementById('attempts')
  };

  dom.guessButton.addEventListener('click', findResult);
  dom.guessInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      findResult();
    }
  });

  const goal = randomInt(0, 20);
  let attempts = 0;
  dom.feedback.textContent = '';

  function getGuess() {
    const input = dom.guessInput.value;
    if (input !== '' && isNumber(dom.guessInput.value)) {
      return Number(dom.guessInput.value);
    }
    return null;
  }

  function findResult() {
    const guess = getGuess();
    if (guess !== null) {
      attempts++;

      if (guess < goal) {
        dom.feedback.textContent = `${guess} is smaller than the secret number.`;
      } else if (guess > goal) {
        dom.feedback.textContent = `${guess} is larger than the secret number.`;
      } else {
        dom.feedback.textContent = `Congratulations!`;
        dom.attemptsDisplay.textContent = `Number of attempts: ${attempts}`;
        dom.guessInput.setAttribute('disabled', '');
        dom.game.classList.add('victory');
      }
    } else {
      dom.feedback.textContent = 'Invalid input... Try again!';
    }
  }
}