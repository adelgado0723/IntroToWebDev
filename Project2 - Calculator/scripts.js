const keys = document.querySelectorAll('.row .key');
const input = document.querySelector('.input');
const cursor = document.querySelector('.cursor');
let cursorBlinkInterval;
const doneBlinking = false;
const operation = {
        operandOne: 0,
        operandTwo: 0,
        operator: '',
};
function blink() {
        if (!cursor.classList.contains('hide')) {
                cursor.classList.add('hide');
        } else {
                cursor.classList.remove('hide');
        }
        console.log('blinking');
        if (doneBlinking) {
                clearInterval(cursorBlinkInterval);
                if (cursor.classList.contains('hide')) {
                        cursor.classList.remove('hide');
                }
        }
}

function blinkCursor() {
        cursorBlinkInterval = setInterval(blink, 800);
}
function executeOperation(operation) {
        ({ operandOne: numOne, operandTwo: numTwo, operator } = operation);
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
                        result = 0;
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

function handleClick(e) {
        console.log('click event !');
}
function handleKeyDown(e) {
        console.log('keydown event');
}
keys.forEach(key => {
        key.addEventListener('click', handleClick);
        key.addEventListener('keydown', handleKeyDown);
});
