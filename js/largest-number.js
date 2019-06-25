function largest(a, b) {
  return a > b ? a : b;
}

function init() {
  const dom = {
    firstNumber: document.getElementById('first-number'),
    secondNumber: document.getElementById('second-number'),
    result: document.getElementById('result')
  }

  function displayLargestNumber() {
    const firstNumber = dom.firstNumber.value;
    const secondNumber = dom.secondNumber.value;
    const largestNumber = largest(firstNumber, secondNumber);

    dom.result.textContent = largestNumber;
  }

  dom.firstNumber.addEventListener('input', displayLargestNumber);
  dom.secondNumber.addEventListener('input', displayLargestNumber);
}

document.addEventListener('DOMContentLoaded', init);