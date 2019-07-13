function convertToCelsius(value) {
  return (value - 32) * (5/9);
}

function convertToFahrenheit(value) {
  return (value * (9/5)) + 32;
}

function init() {
  const dom = {
    temperatureInput: document.getElementById('temperature'),
    result: document.getElementById('result'),
    unitFrom: document.getElementById('unitFrom'),
    unitTo: document.getElementById('unitTo'),
    switchUnitsButton: document.getElementById('switchUnits')
  }

  let toCelsius = false;
  let result = '...';
  dom.temperatureInput.value = '';

  function switchUnit() {
    let temp;
    temp = dom.temperatureInput.value;
    dom.temperatureInput.value = result;
    result = temp;

    toCelsius = !toCelsius;
  }

  function displayUnits() {
    dom.unitTo.textContent = toCelsius ? '°C' : '°F';
    dom.unitFrom.textContent = !toCelsius ? '°C' : '°F';
  }

  function convertTemperature() {
    const input = dom.temperatureInput.value;

    if (input !== '' && isNumber(input)) {
      dom.result.classList.remove('invalid');
      dom.unitTo.classList.remove('invalid');

      if (toCelsius) {
        result = Math.floor(convertToCelsius(input));
      } else {
        result = Math.floor(convertToFahrenheit(input));
      }
    } else {
      result = '...';
      dom.result.classList.add('invalid');
      dom.unitTo.classList.add('invalid');
    }
  }

  function displayTemperature() {
    dom.result.textContent = result;
  }

  dom.switchUnitsButton.addEventListener('click', function () {
    switchUnit();
    displayUnits();
    displayTemperature();
  });

  dom.temperatureInput.addEventListener('input', function () {
    convertTemperature();
    displayTemperature();
  });

  displayUnits();
  displayTemperature();
}

document.addEventListener('DOMContentLoaded', init);