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

// function resetEverything(showingNumber, x, y, operator, numButton) {
//     showingNumber = "";
//     x = undefined;
//     y = undefined;
//     operator = "";
//     numButton = undefined;
//     console.log(showingNumber, x, y, operator, numButton);
// }

// function doButtonStuff(theCode, showingNumber, x, y, operator, numButton) {
//     if (theCode.classList.contains("reset")) {
//         removeDisplayContent();
//         resetEverything(showingNumber, x, y, operator, numButton);
//     } else if (theCode.classList.contains("number")) {
//         numButton = theCode.value
//         console.log(`this is numbutton inside ${numButton}`)
//         const createShowing = () => {
//             console.log(showingNumber += theCode.value);
//         }
//         createShowing();
//         console.log(`this is showing inside ${showingNumber}`)
//         return createShowing;
//     } else if (theCode.classList.contains("operator")) {
//         operator = theCode.value;
//         console.log(operator);
//     } 
// }
// function doButtonStuff(theCode, showingNumber, x, y, operator, numButton) {
//     if (theCode.classList.contains("reset")) {
//         removeDisplayContent();
//         resetEverything(showingNumber, x, y, operator, numButton);
//     } else if (theCode.classList.contains("number")) {
//         numButton = theCode.value;
//         console.log(numButton);
//     } else if (theCode.classList.contains("operator")) {
//         operator = theCode.value;
//         console.log(operator);
//     } 
// }

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


function calculate() {
    let showingNumber = "";
    let x;
    let y;
    let operator = "";
    let numButton;

    function connectButtons(e) {
        //choose the correct button, either by click or keyboard
        let theCode;
        if (e.type === 'click') {
            theCode = e.currentTarget;
        } else {
            theCode = document.querySelector(`button[data-key="${e.code}"]`);
        }
 
        addToDisplay(theCode.value)
        
        const doButtonStuff = () => {
            if (theCode.classList.contains("reset")) {
                removeDisplayContent();
                const resetEverything = () => {
                    showingNumber = "";
                    x = undefined;
                    y = undefined;
                    operator = "";
                    numButton = undefined;
                    console.log(showingNumber, x, y, operator, numButton);
                }
                resetEverything();
            } else if (theCode.classList.contains("number")) {
                numButton = theCode.value;
                const createShowing = () => {
                    showingNumber += numButton;
                }
                createShowing();
            } else if (theCode.classList.contains("operator")) {
                operator = theCode.value;
                console.log(operator);
            } 
        }
        
        doButtonStuff();
        console.log(`showing after ${showingNumber}`)
    }
    
    window.addEventListener('keydown', connectButtons);
    // window.addEventListener('keydown', testLog);
    allButtons.forEach(btn => btn.addEventListener('click', connectButtons));
    // allButtons.forEach(btn => btn.addEventListener('click', testLog));
}

calculate()