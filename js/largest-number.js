function largest(a, b) {
  return a > b ? a : b;
}

function getLargest(input1, input2) {
  const firstNumber = Number(input1.value);
  const secondNumber = Number(input2.value);
  return largest(firstNumber, secondNumber);
}

function displayLargest(result, element) {
  element.textContent = result;
}

function init() {
  const firstNumberEl = document.getElementById('first-number');
  const secondNumberEl = document.getElementById('second-number');
  const resultEl = document.getElementById('result');

  firstNumberEl.addEventListener('input', function () {
    const largestNumber = getLargest(firstNumberEl, secondNumberEl);
    displayLargest(largestNumber, resultEl);
  });
  secondNumberEl.addEventListener('input', function () {
    const largestNumber = getLargest(firstNumberEl, secondNumberEl);
    displayLargest(largestNumber, resultEl);
  });
}

document.addEventListener('DOMContentLoaded', init);