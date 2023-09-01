const digitButtons = document.querySelectorAll('.digitButtons');  
const operatorButtons = document.querySelectorAll('.operatorButtons');  
const equalButton = document.getElementById("equalButton");
const floatButton = document.getElementById("floatButton");
const deleteButton = document.getElementById("deleteButton");
const clearButton = document.getElementById("clearButton");
const screenCurrent = document.getElementById("currentOperation");
const screenResult = document.getElementById("result");


let currentFirstNumber = "";
let currentSecondNumber = "";
let currentOperator = "";
let currentResult = "";

/*
Activate digit buttons
*/
digitButtons.forEach(button => {button.addEventListener('click', selectDigit)});
operatorButtons.forEach(button => {button.addEventListener('click', selectOperator)});

console.log(currentFirstNumber)

/*
Clear the screen*/
clearButton.addEventListener('click', clear);


function clear() {
    screenCurrent.textContent = "";
    screenResult.textContent = "";
    currentFirstNumber = currentSecondNumber = currentOperator = currentResult = ""
}

/*
Delete the last displayed character on screen
*/
deleteButton.addEventListener('click', backspace);

function backspace() {
    
    if (currentSecondNumber === "") {
        if (currentOperator === "") {
            if (currentFirstNumber === "") {
                clear()
            }
            else {
                currentFirstNumber = currentFirstNumber.slice(0, -1);
                screenCurrent.textContent = screenCurrent.textContent.slice(0, -1); 
            }            
        }
        else {
            currentOperator = "";
            screenCurrent.textContent = screenCurrent.textContent.slice(0, -1); 
        }
    }
    else {
        currentSecondNumber = currentSecondNumber.slice(0, -1);
        screenCurrent.textContent = screenCurrent.textContent.slice(0, -1);
    }
}


equalButton.addEventListener('click', selectEqual);

function selectEqual(e) {
    console.log("equal "+currentFirstNumber+" "+currentSecondNumber+" "+currentOperator)
    let result;
    if (currentSecondNumber === "") {
        screenResult.textContent = currentFirstNumber;
        result = currentFirstNumber
    }
    else {
        result = operate(currentOperator, currentFirstNumber, currentSecondNumber);
        screenResult.textContent = result;
    }
    currentResult = result;
    currentFirstNumber = currentSecondNumber = currentOperator = "";
}

function selectDigit(e) {
    if (currentOperator === "") {
        currentFirstNumber += e.target.textContent;
        screenCurrent.textContent = currentFirstNumber;
    }
    else {
        currentSecondNumber += e.target.textContent;
        screenCurrent.textContent += currentSecondNumber;
    }   
}

function selectOperator(e) {
    screenCurrent.textContent += e.target.textContent;
    if (currentResult === "") {
        if (currentSecondNumber === "") {
            currentOperator = e.target.textContent;
        }
        else {
            let result = operate(currentOperator, currentFirstNumber, currentSecondNumber);
            currentFirstNumber = result;
            currentSecondNumber = "";
            currentOperator = e.target.textContent;
            screenCurrent.textContent = currentFirstNumber+currentOperator;
        }
    }
    else {
        currentFirstNumber = currentResult;
        currentResult = "";
        currentOperator = e.target.textContent;
    }

}

function add(firstNumb, secondNumb) {
    console.log("ADD ")
    let result = +firstNumb + +secondNumb;
    console.log(result)
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
            break;
        case '-':
            return subtract(firstNumb,secondNumb);
            break;
        case 'x':
            return multiply(firstNumb, secondNumb);
            break;
        case '÷':
            return divide(firstNumb, secondNumb);
            break;
        default:
            return None
    }
}
