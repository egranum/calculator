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

function removeFromDisplay() {
    //remove last added item from display
    const numberContainer = document.querySelector('.number-container');
    numberContainer.removeChild(numberContainer.lastElementChild);
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
    let theCode;
    let theCodeValue;

    function connectButtons(e) {
        //prevent default button behaviour
        if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            e.preventDefault();
        }
        //choose the correct button, either by click or keyboard
        
        if (e.type === 'click') {
            theCode = e.currentTarget;
        } else {
            theCode = document.querySelector(`button[data-key="${e.code}"]`);
        }

        const findCodeValue = () => {
            if (theCodeValue !== theCode.id || theCodeValue === undefined) {
                theCodeValue = theCode.value;
            }
        }
        findCodeValue();
        console.log(theCodeValue);
 
        if (!theCode.classList.contains("chaos")) {addToDisplay(theCodeValue)}
        
        const doButtonStuff = () => {
            if (theCode.classList.contains("reset")) {
                removeDisplayContent();
                const resetEverything = () => {
                    showingNumber = "";
                    x = undefined;
                    y = undefined;
                    operator = "";
                    numButton = undefined;
                    theCodeValue = theCode.value;
                }
                resetEverything();

            } else if (theCode.classList.contains("number")) {
                numButton = theCodeValue;
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

            } else if (theCode.classList.contains("chaos")) {
                removeFromDisplay();
                showingNumber = showingNumber.slice(0, -1);
                const toggle = () => {
                    if (theCodeValue == theCode.value) {
                        theCodeValue = theCode.id;
                    } else if (theCodeValue == theCode.id) {
                        theCodeValue = theCode.value;
                    }
                }
                toggle();
            }
        }
        
        doButtonStuff();
    }
    
    window.addEventListener('keydown', connectButtons);
    allButtons.forEach(btn => btn.addEventListener('click', connectButtons));
}

calculate()