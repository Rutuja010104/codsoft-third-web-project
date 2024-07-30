const display = document.getElementById('display');
const buttons = document.querySelectorAll('.grid-item');

let currentNumber = '';
let previousNumber = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;

        if (id === 'clear') {
            currentNumber = '';
            previousNumber = '';
            operator = '';
            display.value = '';
        } else if (id === 'backspace') {
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
        } else if (id === 'equals') {
            calculateResult();
        } else if (id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide') {
            operator = id;
            previousNumber = currentNumber;
            currentNumber = '';
            display.value = previousNumber + ' ' + getOperatorSymbol(operator) + ' ';
        } else if (id === 'sqrt' || id === 'pow' || id === 'log' || id === 'sin' || id === 'cos' || id === 'tan' || id === 'pi' || id === 'e' || id === 'factorial' || id === 'exp' || id === 'ln' || id === 'abs') {
            calculateSpecialFunction(id);
        } else if (id === 'dot') {
            if (!currentNumber.includes('.')) {
                currentNumber += '.';
                display.value = currentNumber;
            }
        } else if (id === 'percent') {
            currentNumber = (parseFloat(currentNumber) / 100).toString();
            display.value = currentNumber;
        } else {
            currentNumber += id;
            display.value = currentNumber;
        }
    });
});

function calculateResult() {
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    let result;

    switch (operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                display.value = 'Error: Division by zero';
                return;
            }
            break;
        default:
            display.value = 'Error: Invalid operator';
            return;
    }

    display.value = result.toString();
    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
}

function calculateSpecialFunction(id) {
    let result;

    switch (id) {
        case 'sqrt':
            result = Math.sqrt(parseFloat(currentNumber));
            break;
        case 'pow':
            result = Math.pow(parseFloat(currentNumber), 2);
            break;
        case 'log':
            result = Math.log10(parseFloat(currentNumber));
            break;
        case 'sin':
            result = Math.sin(parseFloat(currentNumber));
            break;
        case 'cos':
            result = Math.cos(parseFloat(currentNumber));
            break;
        case 'tan':
            result = Math.tan(parseFloat(currentNumber));
            break;
        case 'pi':
            result = Math.PI;
            break;
        case 'e':
            result = Math.E;
            break;
        case 'factorial':
            result = factorial(parseFloat(currentNumber));
            break;
        case 'exp':
            result = Math.exp(parseFloat(currentNumber));
            break;
        case 'ln':
            result = Math.log(parseFloat(currentNumber));
            break;
        case 'abs':
            result = Math.abs(parseFloat(currentNumber));
            break;
        default:
            display.value = 'Error: Invalid function';
            return;
    }

    display.value = result.toString();
    currentNumber = result.toString();
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '*';
        case 'divide':
            return '/';
        default:
            return '';
    }
}

function factorial(num) {
    if (num === 0) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
