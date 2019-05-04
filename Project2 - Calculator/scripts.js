const keys = document.querySelectorAll('.row .key');
const input = document.querySelector('.input');
const cursor = document.querySelector('.cursor');
const calc = document.querySelector('.calc');

let isDisplayingResult = true;
let cursorBlinkInterval;
let doneBlinking = true;

const operation = {
  operandOne: undefined,
  operator: ''
};

function blink() {
  if (!cursor.classList.contains('hide')) {
    cursor.classList.add('hide');
  } else {
    cursor.classList.remove('hide');
  }
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
  let result = input.innerHTML;
  let parsed = parseInt(result);
  const hasNoOperand = isNaN(operation.operandOne);

  switch (operator) {
    case '+':
      if (hasNoOperand) {
        operation.operandOne = parsed;
      } else {
        operation.operandOne += parsed;
        input.innerHTML = operation.operandOne.toString();
      }
      isDisplayingResult = true;

      break;

    case '-':
      if (hasNoOperand) {
        operation.operandOne = parsed;
      } else {
        operation.operandOne -= parsed;
        input.innerHTML = operation.operandOne.toString();
      }
      isDisplayingResult = true;
      break;

    case '←':
      // Remove the last digit of the number in the display.
      // If the last digit is deleted, set result to zero.
      input.innerHTML = result.length > 1 ? result.substr(0, result.length - 1) : '0';
      break;

    case 'C':
      // Clear values in operand and sets result to
      input.innerHTML = 0;
      clearOperation();
      isDisplayingResult = true;
      break;

    case '÷':
      if (hasNoOperand) {
        operation.operandOne = parsed;
      } else {
        operation.operandOne /= parsed;
        input.innerHTML = operation.operandOne.toString();
      }
      isDisplayingResult = true;
      break;
    // TODO: Might want to handle '/' operator for keyboard input

    case '×':
      if (hasNoOperand) {
        operation.operandOne = parsed;
      } else {
        operation.operandOne *= parsed;
        input.innerHTML = operation.operandOne.toString();
      }
      isDisplayingResult = true;
      break;

    case '=':
      if (hasNoOperand) {
        operation.operandOne = parsed;
      } else {
        executeOperation(operation.operator);
        clearOperation();
      }

      break;

    default:
      console.log(`WARNING: Attempting to run invalid operation: ${operation}`);
      break;
  }
  return result;
}
function clearOperation() {
  operation.operandOne = undefined;
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
    if (isDisplayingResult || input.innerHTML === '0') {
      input.innerHTML = key;
      isDisplayingResult = false;
    } else {
      input.innerHTML += key;
    }
  } else {
    // key is not a number
    if (key !== '←' && key !== 'C' && key !== '=') {
      operation.operator = key;
    }
    executeOperation(key);
    console.log('OperandOne = ' + operation.operandOne);
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
  if (calc.contains(e.target)) {
    if (doneBlinking) {
      blinkCursor();
      doneBlinking = false;
    }
  } else {
    // Clicked outside the box
    doneBlinking = true;
  }
});
