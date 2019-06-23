function convertTemperature(value, unit) {
  if (unit === 'f') {
    return (value * (9/5)) + 32;
  } else if (unit === 'c') {
    return (value * (5/9)) - 32;
  }
}

function init() {
  const temperatureInput = document.getElementById('temperature');
  const resultEl = document.getElementById('result');
  const unitFromEl = document.getElementById('unitFrom');
  const unitToEl = document.getElementById('unitTo');
  const switchUnitsButton = document.getElementById('switchUnits');

  let currentUnit = 'c';
  let result = 0;

  function switchUnit() {
    currentUnit === 'c' ? currentUnit = 'f' : currentUnit = 'c';
  }

  switchUnitsButton.addEventListener('click', function () {
    switchUnit();
    if (currentUnit === 'c') {
      unitFromEl.textContent = 'Fahrenheit';
      unitToEl.textContent = 'Celsius';
    } else if (currentUnit === 'f') {
      unitFromEl.textContent = 'Celsius';
      unitToEl.textContent = 'Fahrenheit';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);