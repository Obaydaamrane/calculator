document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  let currentInput = '0';
  let previousInput = '';
  let operation = null;
  let resetInput = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetInput = false;
    updateDisplay();
  }

  function inputNumber(number) {
    if (currentInput === '0' || resetInput) {
      currentInput = number;
      resetInput = false;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (resetInput) {
      currentInput = '0.';
      resetInput = false;
    } else if (!currentInput.includes('.')) {
      currentInput += '.';
    }
    updateDisplay();
  }

  function inputOperator(op) {
    const inputValue = parseFloat(currentInput);

    if (operation && !resetInput) {
      calculate();
    }

    previousInput = currentInput;
    operation = op;
    resetInput = true;
  }

  function calculate() {
    let result;
    const prevValue = parseFloat(previousInput);
    const currentValue = parseFloat(currentInput);

    if (isNaN(prevValue) || isNaN(currentValue)) return;

    switch (operation) {
      case '+':
        result = prevValue + currentValue;
        break;
      case '-':
        result = prevValue - currentValue;
        break;
      case '*':
        result = prevValue * currentValue;
        break;
      case '/':
        result = prevValue / currentValue;
        break;
      default:
        return;
    }

    result = parseFloat(result.toFixed(10));
    currentInput = result.toString();
    operation = null;
    updateDisplay();
  }

  function backspace() {
    if (resetInput) return;

    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = '0';
    }
    updateDisplay();
  }

  // Button events
  document.getElementById('clear').addEventListener('click', clearCalculator);
  document.getElementById('backspace').addEventListener('click', backspace);

  document.getElementById('zero').addEventListener('click', () => {
    if (currentInput !== '0') {
      inputNumber('0');
    }
  });

  document.getElementById('one').addEventListener('click', () => inputNumber('1'));
  document.getElementById('two').addEventListener('click', () => inputNumber('2'));
  document.getElementById('three').addEventListener('click', () => inputNumber('3'));
  document.getElementById('four').addEventListener('click', () => inputNumber('4'));
  document.getElementById('five').addEventListener('click', () => inputNumber('5'));
  document.getElementById('six').addEventListener('click', () => inputNumber('6'));
  document.getElementById('seven').addEventListener('click', () => inputNumber('7'));
  document.getElementById('eight').addEventListener('click', () => inputNumber('8'));
  document.getElementById('nine').addEventListener('click', () => inputNumber('9'));

  document.getElementById('decimal').addEventListener('click', inputDecimal);

  document.getElementById('add').addEventListener('click', () => inputOperator('+'));
  document.getElementById('subtract').addEventListener('click', () => inputOperator('-'));
  document.getElementById('multiply').addEventListener('click', () => inputOperator('*'));
  document.getElementById('divide').addEventListener('click', () => inputOperator('/'));

  document.getElementById('equals').addEventListener('click', calculate);

  // Keyboard support
  document.addEventListener('keydown', function (e) {
    const key = e.key;

    if (key >= '0' && key <= '9') {
      const buttonId = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parseInt(key)];
      document.getElementById(buttonId).click();
    } else if (key === '.') {
      document.getElementById('decimal').click();
    } else if (['+', '-', '*', '/'].includes(key)) {
      const operatorId = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' }[key];
      document.getElementById(operatorId).click();
    } else if (key === 'Enter' || key === '=') {
      document.getElementById('equals').click();
    } else if (key === 'Escape') {
      document.getElementById('clear').click();
    } else if (key === 'Backspace') {
      backspace();
    }
  });
});
