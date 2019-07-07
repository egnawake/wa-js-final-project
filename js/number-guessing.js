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
      dom.feedback.textContent = `${guess} é menor do que o número secreto!`;
      attempts++;
    } else if (guess > goal) {
      dom.feedback.textContent = `${guess} é maior do que o número secreto!`;
      attempts++;
    } else {
      dom.feedback.textContent = `Parabéns! O número secreto era o ${guess}!`;
      dom.guessInput.setAttribute('disabled', '');
      dom.guessButton.setAttribute('disabled', '');
    }
  }
}