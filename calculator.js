const digitButtons = document.querySelectorAll('.digitButtons');  
const operatorButtons = document.querySelectorAll('.operatorButtons');  
const equalButton = document.getElementById("equalButton");
const floatButton = document.getElementById("floatButton");
const deleteButton = document.getElementById("deleteButton");
const clearButton = document.getElementById("clearButton");
const screenCurrent = document.getElementById("currentOperation");
const screenResult = document.getElementById("result");

const POINT = ".";
const PLUS = "+";
const MINUS = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const EMPTY = "";

let currentFirstNumber = EMPTY;
let currentSecondNumber = EMPTY;
let currentOperator = EMPTY;
let currentResult = EMPTY;

/*
Deal with keyboard inputs
*/
window.addEventListener('keydown', dealWithKeyboardInput)

function dealWithKeyboardInput(e) {
    if (0 <= parseInt(e.key) && parseInt(e.key) <= 9) {
        appendDigit(e.key);
    }
    else if ([PLUS,MINUS,MULTIPLY,DIVIDE].includes(e.key)) {
        appendOperator(convertOperator(e.key));
    }
    else if (e.key === "Backspace") {
        backspace() 
    }
    else if (e.key === "Escape") {
        clear()
    }
    else if (["=", "Enter"].includes(e.key)) {
        performOperation()
    }
    else if (e.key === POINT) {
        appendPoint()
    }
}

function convertOperator(operator) {
    if (operator === DIVIDE) {
        return "÷";
    }
    else if (operator === MULTIPLY) {
        return "x"
    }
    else {
        return operator
    }
}

/*
Activate digit buttons
*/
digitButtons.forEach(button => {button.addEventListener('click', () => appendDigit(button.textContent))});
operatorButtons.forEach(button => {button.addEventListener('click', () => appendOperator(button.textContent))});


/*
Clear the screen
*/
clearButton.addEventListener('click', clear);

function clear() {
    screenCurrent.textContent = EMPTY;
    screenResult.textContent = EMPTY;
    currentFirstNumber = currentSecondNumber = currentOperator = currentResult = EMPTY
}

/*
Float button to write float numbers
*/
floatButton.addEventListener('click', appendPoint);

function appendPoint() {
    if (currentOperator === EMPTY) {
        if (!currentFirstNumber.includes(POINT)) {
            currentFirstNumber += POINT;
            screenCurrent.textContent = currentFirstNumber;
        }
    }
    else {
        if (!currentSecondNumber.includes(POINT)) {
            currentSecondNumber += POINT;
            screenCurrent.textContent += POINT;
        }
    }
}



/*
Delete the last displayed character on screen
*/
deleteButton.addEventListener('click', backspace);

function backspace() {
    
    if (currentSecondNumber === EMPTY) {
        if (currentOperator === EMPTY) {
            if (currentFirstNumber === EMPTY) {
                clear()
            }
            else {
                currentFirstNumber = currentFirstNumber.slice(0, -1);
                screenCurrent.textContent = screenCurrent.textContent.slice(0, -1); 
            }            
        }
        else {
            currentOperator = EMPTY;
            screenCurrent.textContent = screenCurrent.textContent.slice(0, -1); 
        }
    }
    else {
        currentSecondNumber = currentSecondNumber.slice(0, -1);
        screenCurrent.textContent = screenCurrent.textContent.slice(0, -1);
    }
}


equalButton.addEventListener('click', performOperation);

function performOperation() {
    let result;
    if (currentSecondNumber === EMPTY) {
        screenResult.textContent = currentFirstNumber;
        result = currentFirstNumber
    }
    else {
        result = operate(currentOperator, currentFirstNumber, currentSecondNumber);
        // division by 0
        if (result === null) {
            screenCurrent.textContent = EMPTY;
            screenResult.textContent = "Error : division by 0";
            currentFirstNumber = currentSecondNumber = currentOperator = EMPTY;
        }
        else { 
            screenResult.textContent = result;
            currentResult = result;
            currentFirstNumber = currentSecondNumber = currentOperator = EMPTY;
        }
    }

}

function appendDigit(digit) {
    screenResult.textContent = EMPTY;
    if (currentOperator === EMPTY) {
        currentFirstNumber += digit;
        currentResult = EMPTY
        screenCurrent.textContent = currentFirstNumber;
    }
    else {
        currentSecondNumber += digit;
        screenCurrent.textContent += digit;
    }   
}

function appendOperator(operator) {
    screenResult.textContent = EMPTY;
    
    if (currentResult === EMPTY) {
        if (currentSecondNumber === EMPTY) {
            screenCurrent.textContent += operator;
            currentOperator = operator;
        }
        else {
            let result = operate(currentOperator, currentFirstNumber, currentSecondNumber);
            // division by 0
            if (result === null) {
                screenCurrent.textContent = EMPTY;
                screenResult.textContent = "Error : division by 0";
                currentFirstNumber = currentSecondNumber = currentOperator = EMPTY;
            }
            else { 
                currentFirstNumber = result;
                currentSecondNumber = EMPTY;
                currentOperator = operator;
                screenCurrent.textContent = currentFirstNumber+currentOperator;
            }
        }
    }
    else {
        screenCurrent.textContent = operator;
        currentFirstNumber = currentResult;
        currentResult = EMPTY;
        currentOperator = operator;
    }

}

function add(firstNumb, secondNumb) {
    let result = +firstNumb + +secondNumb;
    return +firstNumb + +secondNumb;
}

function subtract(firstNumb, secondNumb) {
    return +firstNumb - +secondNumb;
}

function multiply(firstNumb, secondNumb) {
    return +firstNumb * +secondNumb;
}

function divide(firstNumb, secondNumb) {
    return +firstNumb / +secondNumb;
}

function operate(operator, firstNumb, secondNumb) {
    switch (operator) {
        case '+':
            return add(firstNumb,secondNumb);
        case '-':
            return subtract(firstNumb,secondNumb);
        case 'x':
            return multiply(firstNumb, secondNumb);
        case '÷':
            if (secondNumb === "0") {
                return null
            }
            else {
                return divide(firstNumb, secondNumb);
            }
        default:
            return None
    }
}
