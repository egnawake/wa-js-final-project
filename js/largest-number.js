function largest(a, b) {
  return a > b ? a : b;
}

function init() {
  const dom = {
    firstNumber: document.getElementById('first-number'),
    secondNumber: document.getElementById('second-number'),
    result: document.getElementById('result')
  }

  dom.firstNumber.value = 0;
  dom.secondNumber.value = 0;

  function displayLargestNumber() {
    const firstNumberInput = dom.firstNumber.value;
    const secondNumberInput = dom.secondNumber.value;

    let result;
    if (firstNumberInput === '' || secondNumberInput === '') {
      result = 'Please insert two numbers.';
    } else {
      result = largest(Number(firstNumberInput), Number(secondNumberInput));
    }

    dom.result.textContent = result;
  }

  dom.firstNumber.addEventListener('input', displayLargestNumber);
  dom.secondNumber.addEventListener('input', displayLargestNumber);
}

document.addEventListener('DOMContentLoaded', init);