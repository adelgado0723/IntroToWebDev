const keys = document.querySelectorAll('.row .key');
const input = document.querySelector('.input');
const cursor = document.querySelector('.cursor');
const display = document.querySelector('.display');
let cursorBlinkInterval;
let doneBlinking = false;
const operation = {
  operandOne: undefined,
  operandTwo: undefined,
  operator: ''
};

// operation.operandOne = 1;

function blink() {
  if (!cursor.classList.contains('hide')) {
    cursor.classList.add('hide');
  } else {
    cursor.classList.remove('hide');
  }
  //   console.log('blinking');
  if (doneBlinking) {
    clearInterval(cursorBlinkInterval);
    if (cursor.classList.contains('hide')) {
      cursor.classList.remove('hide');
    }
  }
}

function blinkCursor() {
  cursorBlinkInterval = setInterval(blink, 540);
}
function executeOperation(operator) {
  ({ operandOne: numOne, operandTwo: numTwo } = operation);
  let result = 0;
  switch (operator) {
    case '+':
      result = numOne + numTwo;
      break;

    case '-':
      result = numOne - numTwo;
      break;

    case '←':
      // Remove the last digit of the number in the display.
      // If the last digit is deleted, set result to zero.

      break;

    case 'C':
      // Clear values in operand and sets result to
      input.innerHTML = 0;
      clearOperation();

      break;

    case '÷':
      result = numOne / numTwo;
      break;
    // TODO: Might want to handle '/' operator for keyboard input

    case '×':
      result = numOne * numTwo;
      break;

    default:
      console.log(`WARNING: Attempting to run invalid operation: ${operation}`);
      break;
  }
  return result;
}
function clearOperation() {
  operation.operandOne = undefined;
  operation.operandTwo = undefined;
  operation.operator = '';
}

function isOperator(char) {
  if (
    char === '+' ||
    char === '-' ||
    char === '÷' ||
    char === '×' ||
    char === '←' ||
    char === 'C' ||
    char === '='
  ) {
    return true;
  } else {
    return false;
  }
}
function getOperatorType(char) {
  if (char === '+' || char === '-' || char === '÷' || char === '×') {
    return 'Binary';
  } else if (char === '←' || char === 'C') {
    return 'Unary';
  } else {
    return 'Not An Operator';
  }
}
function handleClick(e) {
  console.log(this.innerHTML);
  const keyClicked = this.innerHTML;
  evaluateOperation(keyClicked);
}

function evaluateOperation(key) {
  const parsedInput = parseInt(key);
  if (!isNaN(parsedInput)) {
    // key is a number
    if (input.innerHTML === '0') {
      input.innerHTML = key;
    } else {
      input.innerHTML += key;
    }
  } else {
    // key is not a number
    operation.operator = key;
    executeOperation(operation.operator);
  }
}

function handleKeyDown(e) {
  const keyPressed = String.fromCharCode(e.keyCode);
  console.log(keyPressed);
  // Validate input and replace operator symbols with
  // ones we are expecting.
  evaluateOperation(keyPressed);
}
keys.forEach(key => {
  key.addEventListener('click', handleClick);
});
window.addEventListener('keydown', handleKeyDown);

// Blinking cursor when display has focus
window.addEventListener('click', function(e) {
  if (display.contains(e.target)) {
    if (!doneBlinking) {
      clearInterval(cursorBlinkInterval);
      doneBlinking = false;
    }
    blinkCursor();
  } else {
    // Clicked outside the box
    doneBlinking = true;
  }
});
