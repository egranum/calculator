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
    const numberContainer = document.querySelector('.added-content');
    let numberToAdd = document.createTextNode(toBeAdded);
    numberContainer.appendChild(numberToAdd);
}

function removeFromDisplay() {
    //remove last added item from display
    const numberContainer = document.querySelector('.added-content');
    let numbersOnDisplay = numberContainer.textContent;
    numberContainer.textContent = numbersOnDisplay.slice(0, -1);
}

function removeDisplayContent() {
    //empty display
    const numberContainer = document.querySelector('.added-content')
    numberContainer.textContent = ''
}

const isOverflown = ({ clientHeight, scrollHeight }) => {scrollHeight > clientHeight}

const resizeText = ({ element, elements, minSize = 10, maxSize = 512, step = 1, unit = 'px' }) => {
  (elements || [element]).forEach(el => {
    let i = minSize;
    let overflow = false;

        const parent = el.parentNode;

    while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`;
        overflow = isOverflown(parent);

      if (!overflow) i += step;
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`;
  })
}

resizeText({
    element: document.querySelector('.added-content')
});

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
    let theCodeId;
    let currentNumber;
    let chaosUnleashed = false;
    let decimalPressed = false;

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
        
        theCodeId = theCode.id;
 
        theCodeValue = theCode.value;

        const doButtonStuff = () => {

            const findCurrentNumber = () => {
                //define number based on chaos status
                currentNumber = (chaosUnleashed) ? theCodeId : theCodeValue;
            }
            findCurrentNumber();
     
            if (theCode.classList.contains("number") && x !== undefined && operator === undefined) {
                removeDisplayContent();
                x = undefined;
            }
            
            if (!theCode.classList.contains("chaos")) {addToDisplay(currentNumber)}

            if (theCode.classList.contains("reset")) {
                removeDisplayContent();
                const resetEverything = () => {
                    showingNumber = "";
                    x = undefined;
                    y = undefined;
                    operator = "";
                    numButton = undefined;
                    chaosUnleashed = false;
                    decimalPressed = false;
                }
                resetEverything();

            } else if (theCode.classList.contains("number")) {
                numButton = currentNumber;
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
                        //put second operator somewhere temporary if first is occupied
                        if (operator === undefined) {
                            operator = theCode.value
                        } else {
                            let tempOperator = theCode.value;
                            //store second number in y
                            y = Number(showingNumber);
                            showingNumber = "";
                            //do math
                            let result = operate(x, operator, y);
                            if (result !== `Heat death of the universe`) {
                                result = +result.toFixed(2);
                            }
                            x = result;
                            y = undefined;
                            operator = tempOperator;
                            removeDisplayContent();
                            addToDisplay(result);
                            addToDisplay(operator);
                        }
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
                        if (result !== `Heat death of the universe`) {
                            result = +result.toFixed(2);
                        }
                        x = result;
                        y = undefined;
                        operator = undefined;
                        removeDisplayContent();
                        addToDisplay(result);
                    }
                }

                doTheMath();

            } else if (theCode.classList.contains("chaos")) {
                //remove last input
                removeFromDisplay();
                showingNumber = showingNumber.slice(0, -1);
                
                //toggle chaos between true and false
                chaosUnleashed = !chaosUnleashed;
                
                if (x !== undefined && showingNumber === "") {
                    //when removing an operator, revert x and showingNumber
                    showingNumber = String(x);
                    x = undefined;
                }
            }

            //check and set decimal status
            decimalPressed = (showingNumber.includes(".")) ? true : false;
        }
        
        //prevent button stuff if the stuff is a second decimal
        if (decimalPressed === false || decimalPressed === true && !theCode.classList.contains("decimal")){
            doButtonStuff();
        }
    }
    
    window.addEventListener('keydown', connectButtons);
    allButtons.forEach(btn => btn.addEventListener('click', connectButtons));
}

calculate()