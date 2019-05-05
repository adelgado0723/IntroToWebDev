const keys = document.querySelectorAll('.row .key');
const input = document.querySelector('.input');
const cursor = document.querySelector('.cursor');
const calc = document.querySelector('.calc');

let isDisplayingResult = true;
let cursorBlinkInterval;
let doneBlinking = true;
let operand = null;
let binaryOperator = '';

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
function render(output) {
    console.log(output);
    input.innerHTML = output;
}
function blinkCursor() {
    cursorBlinkInterval = setInterval(blink, 540);
}

function clearOperation() {
    operand = NaN;
    binaryOperator = '';
}
function executeOperation(operator) {
    const result = input.innerHTML;
    const parsed = parseInt(result);
    const hasNoOperand = isNaN(operand);
    let calculation = '';
    isDisplayingResult = true;

    switch (operator) {
        case '+':
            if (hasNoOperand) {
                operand = parsed;
            } else {
                operand += parsed;
                calculation = operand.toString();
            }
            break;

        case '-':
            if (hasNoOperand) {
                operand = parsed;
            } else {
                operand -= parsed;
                calculation = operand.toString();
            }

            break;

        case '←':
            // Remove the last digit of the number in the display.
            // If the last digit is deleted, set result to zero.
            calculation = result.length > 1 ? result.substr(0, result.length - 1) : '0';
            break;

        case 'C':
            // Clear values in operand and sets result to
            calculation = '0';
            clearOperation();
            break;

        case '÷':
            if (hasNoOperand) {
                operand = parsed;
            } else {
                operand /= parsed;
                calculation = operand.toString();
            }
            break;
        // TODO: Might want to handle '/' operator for keyboard input

        case '×':
            if (hasNoOperand) {
                operand = parsed;
            } else {
                operand *= parsed;
                calculation = operand.toString();
            }
            break;

        case '=':
            if (hasNoOperand) {
                operand = parsed;
            } else {
                calculation = executeOperation(binaryOperator);
                console.log(`operator in recursion => ${binaryOperator}`);
                clearOperation();
            }
            break;

        default:
            console.error(`WARNING: Attempting to run invalid operation: ${operator}`);
            isDisplayingResult = false;
            break;
    }
    if (isDisplayingResult && calculation) {
        render(calculation);
    }
    return calculation;
}

function isOperator(char) {
    if (char === '+' || char === '-' || char === '÷' || char === '×' || char === '←' || char === 'C' || char === '=') {
        return true;
    }
    return false;
}

function getOperatorType(char) {
    if (char === '+' || char === '-' || char === '÷' || char === '×') {
        return 'Binary';
    }
    if (char === '←' || char === 'C') {
        return 'Unary';
    }
    return 'Not An Operator';
}

function evaluateOperation(key) {
    const parsedInput = parseInt(key);
    if (!isNaN(parsedInput)) {
        // key is a number
        if (isDisplayingResult || input.innerHTML === '0') {
            render(key);
            isDisplayingResult = false;
        } else {
            render(input.innerHTML + key);
        }
    } else {
        // key is not a number
        if (key !== '←' && key !== 'C' && key !== '=') {
            binaryOperator = key;
        }
        console.log(`Executing ${key}`);
        executeOperation(key);
    }
}

function handleClick(e) {
    // console.log(this.innerHTML);
    const keyClicked = this.innerHTML;
    evaluateOperation(keyClicked);
}

function handleKeyDown(e) {
    const keyPressed = String.fromCharCode(e.keyCode);
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
