function add(firstNumb, secondNumb) {
    return firstNumb + secondNumb;
}

function subtract(firstNumb, secondNumb) {
    return firstNumb - secondNumb;
}

function multiply(firstNumb, secondNumb) {
    return firstNumb * secondNumb;
}

function divide(firstNumb, secondNumb) {
    return firstNumb / secondNumb;
}

function operate(operator, firstNumb, secondNumb) {
    switch (operator) {
        case '+':
            return add(firstNumb,secondNumb);
            break;
        case '-':
            return subtract(firstNumb,secondNumb);
            break;
        case '*':
            return multiply(firstNumb, secondNumb);
            break;
        case '/':
            return divide(firstNumb, secondNumb);
            break;
        default:
            return None
    }
}