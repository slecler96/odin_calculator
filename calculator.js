// On peut faire des choses illégales et ça marche ! Genre écrire 7xxxxxxx9 et ça renvoie 63. Est-ce vraiment ce qu'on veut ?

// C'est cool de tout déclarer ici, ça rend le code plus clair !
const digitButtons = document.querySelectorAll('.digitButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');  
const equalButton = document.getElementById("equalButton");
const floatButton = document.getElementById("floatButton");
const deleteButton = document.getElementById("deleteButton");
const clearButton = document.getElementById("clearButton");
// Tu pourrais faire un .textContent ici pour évitter de le faire partout
const screenCurrent = document.getElementById("currentOperation");
// Pareil
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
Activate digit and operators buttons
*/
digitButtons.forEach(button => {button.addEventListener('click', () => appendDigit(button.textContent))});
operatorButtons.forEach(button => {button.addEventListener('click', () => appendOperator(button.textContent))});
equalButton.addEventListener('click', performOperation);

/*
Clear the screen
*/
clearButton.addEventListener('click', clear);

/*
Backspace button
*/
deleteButton.addEventListener('click', backspace);

/*
Deal with keyboard inputs
*/
window.addEventListener('keydown', dealWithKeyboardInput)

/*
Point button to write float numbers
*/
floatButton.addEventListener('click', appendPoint);


/*
Clear the screen
*/
function clear() {
    screenCurrent.textContent = EMPTY;
    screenResult.textContent = EMPTY;
    // Je trouve ça vraiment pas clair comme manière d'écrire, même si ça économise des lignes
    currentFirstNumber = currentSecondNumber = currentOperator = currentResult = EMPTY
}


/*
Append a point to the current number to deal with floating point numbers
*/
function appendPoint() {
    /*
    Faire des if imbriqués comme cela ça rend le code difficile à lire ! Il vaut mieux se servir de l'opérateur booléen && (ET)

    Tu peux alors écrire :
    if (currentOperator === EMPTY && !currentFirstNumber.includes(POINT)) {}
    else if (currentOperator !== EMPTY && !currentSecondNumber.includes(POINT)) {}

    Mais d'ailleurs, c'est normal que tout les cas soient pas gérés ? Hésite pas à laisser des commentaires !
     */
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
When the user presses the "delete" button or the backspace key, delete the last character displayed on screen 
and update the corresponding number or operator variable
*/
function backspace() {

    /*
    Pareil, c'est dur à lire avec des if imbriqué alors que tu peux écrire:

    if (currentSecondNumber === EMPTY && currentOperator === EMPTY && currentFirstNumber === EMPTY) {}
    else if (currentSecondNumber === EMPTY && currentOperator === EMPTY) {}
    else if (currentSecondNumber === EMPTY) {}
    else {}
     */
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



/*
When the user presses = : performs the given operation and displays the result on screen
*/
function performOperation() {
    let result;
    // C'est bof ça ! Il se passe quoi si on écrit 5 / par exemple ?
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

/*
Add digit to the corresponding number and update the screen
*/
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

/*
Record operator selected by the user, perform previous operation if 2 numbers have already been given (the result 
    becomes the new first number in the current operation) and displays the corresponding operator on screen
*/
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

/*
Perform operation defined by operator between firstNumb and secondNumb
Returns null when trying to divide by 0
*/
function operate(operator, firstNumb, secondNumb) {
    switch (operator) {
        // Utilise bien tes constantes partout
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
    }
}



function dealWithKeyboardInput(e) {
    if (0 <= parseInt(e.key) && parseInt(e.key) <= 9) {
        appendDigit(e.key);
    }
    else if ([PLUS,MINUS,MULTIPLY,DIVIDE].includes(e.key)) {
        appendOperator(convertOperator(e.key));
    }
    // Noooon des string magiques
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

// Pourquoi + et - ne sont pas là ?
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

// C'est marrant que Odin fasse écrire le projet comme cela car le plus simple serait encore de te laisser tout taper et à la fin quand tu cliques sur Entrée ça te fait le compute !
// Ce serait probablement beaucoup plus simple à écrire et à tester !
// Si tu l'écris comme ça l'avantage c'est que tu peux donner du feedback en live à ton utilisateur, par exemple s'il essaie de taper 7xx9, tu peux l'arrêter dès qu'il tape le deuxième x


// Après on pourrait imaginer ce que donne le projet si on combine les opérations / on rajoute des parenthèses...

