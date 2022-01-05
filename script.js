//basic math functions
const add = (x, y) => {
    return x + y;
}

const subtract = (x, y) => {
    return x - y;
}

const multiply = (x, y) => {
    if (x === 0 && y === 0) {
        return `Heat death of the universe`;
    } else return x * y;
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
                }
                resetEverything();

            } else if (theCode.classList.contains("number")) {
                numButton = theCode.value;
                const createShowing = () => {
                    showingNumber += numButton;
                }
                createShowing();

            } else if (theCode.classList.contains("operator")) {
                
                const operatorPressed = () => {
                    
                    if (x === undefined && y === undefined) {
                        operator = theCode.value;
                        //store first number in x
                        x = Number(showingNumber);
                        showingNumber = "";
                    } else if (x !== undefined && y === undefined) {
                        //put second operator somewhere temporary
                        let tempOperator = theCode.value;
                        //store second number in y
                        y = Number(showingNumber);
                        showingNumber = "";
                        //do math
                        let result = operate(x, operator, y);
                        x = result;
                        y = undefined;
                        operator = tempOperator;
                        removeDisplayContent();
                        addToDisplay(result);
                        addToDisplay(operator);
                    } 
                }

                operatorPressed();

            } else if (theCode.classList.contains("equals-btn")) {
                const doTheMath = () => {
                    let result;

                    if (x === undefined && y === undefined) {
                        x = Number(showingNumber);
                    } else if (x !== undefined && y === undefined) {
                        y = Number(showingNumber);
                        showingNumber = "";
                        result = operate(x, operator, y);
                        x = result;
                        y = undefined;
                        removeDisplayContent();
                        addToDisplay(result);
                    }
                }

                doTheMath();
            }
        }
        
        doButtonStuff();
    }
    
    window.addEventListener('keydown', connectButtons);
    allButtons.forEach(btn => btn.addEventListener('click', connectButtons));
}

calculate()