//basic math functions
const add = (x, y) => {
    return x + y;
}

const subtract = (x, y) => {
    return x - y;
}

const multiply = (x, y) => {
    return x * y;
}

const divide = (x, y) => {
    return x / y;
}

const operate = (x, operator, y) => {
    //call function based on operator
    const equations = {
        '+': add(x, y),
        '-': subtract(x, y),
        '*': multiply(x, y),
        '/': divide(x, y)
    }
    return equations[operator];
}

const addToDisplay = (toBeAdded) => {
    //Add numbers and operators to display
    const numberContainer = document.querySelector('.number-container');
    let numberToAdd = document.createElement('span');
    numberToAdd.textContent = toBeAdded;
    numberContainer.appendChild(numberToAdd);
}


function removeDisplayContent() {
    //empty display
    const numberContainer = document.querySelector('.number-container')
    numberContainer.textContent = ''
}

//buttons are needed for the event listener. Don't remove again you dumbfuck.
const allButtons = Array.from(document.querySelectorAll('.button'));


function connectButtons(e) {
    //choose the correct button, either by click or keyboard
    let theCode;
    if (e.type === 'click') {
        theCode = e.currentTarget;
    } else {
        theCode = document.querySelector(`button[data-key="${e.code}"]`);
    }
    
    
    if (theCode.value == "C") {
        removeDisplayContent();
    } else {
        addToDisplay(theCode.value)
    }
}

function createVariable(connectButtons) {
    let showingNumber;
    showingNumber = connectButtons(e);

    console.log(showingNumber)
}

window.addEventListener('keydown', connectButtons, createVariable);
allButtons.forEach(btn => btn.addEventListener('click', connectButtons, createVariable));
