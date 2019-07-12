function largest(a, b) {
  return a > b ? a : b;
}

function isNumber(value) {
  return !isNaN(Number(value));
}

function isInputValid(input) {
  return input !== '' && isNumber(input);
}

function init() {
  const dom = {
    firstNumber: document.getElementById('first-number'),
    secondNumber: document.getElementById('second-number')
  }

  function displayLargestNumber() {
    const firstInput = dom.firstNumber.value;
    const secondInput = dom.secondNumber.value;


    if (isInputValid(firstInput) && isInputValid(secondInput)) {
      const firstNumber = Number(firstInput);
      const secondNumber = Number(secondInput);

      if (firstNumber > secondNumber) {
        dom.firstNumber.className = 'largest';
        dom.secondNumber.className = '';
      } else if (secondNumber > firstNumber) {
        dom.secondNumber.className = 'largest';
        dom.firstNumber.className = '';
      } else {
        dom.firstNumber.className = 'equal';
        dom.secondNumber.className = 'equal';
      }
    } else {
      dom.firstNumber.className = 'invalid'
      dom.secondNumber.className = 'invalid';
    }
  }

  dom.firstNumber.addEventListener('input', displayLargestNumber);
  dom.secondNumber.addEventListener('input', displayLargestNumber);
}

document.addEventListener('DOMContentLoaded', init);