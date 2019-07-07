function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const dom = {
    guessInput: document.getElementById('guessInput'),
    guessButton: document.getElementById('guessButton'),
    feedback: document.getElementById('feedback')
  };

  dom.guessButton.addEventListener('click', findResult);

  const goal = randomInt(0, 20);
  let attempts = 0;

  function getGuess() {
    return Number(dom.guessInput.value);
  }

  function findResult() {
    const guess = getGuess();
    if (guess < goal) {
      dom.feedback.textContent = `${guess} is smaller than the secret number.`;
      attempts++;
    } else if (guess > goal) {
      dom.feedback.textContent = `${guess} is larger than the secret number.`;
      attempts++;
    } else {
      dom.feedback.textContent = `Congratulations! The secret number was ${guess}!`;
      dom.guessInput.setAttribute('disabled', '');
      dom.guessButton.setAttribute('disabled', '');
    }
  }
}