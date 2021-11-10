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

//Loop for finding button values
// let data = document.querySelector('div.buttons').childNodes;

// for (let i = 0; i < data.length; i++) {
//     if (data[i].nodeType == 1) {
//         console.log(data[i].childNodes[0].nodeValue);
//     }
// }

// const numberButtons = Array.from(document.querySelectorAll('.number'))
// numberButtons.forEach(numButton => numButton.addEventListener('click', function(e) {
//     console.log(numButton.childNodes[0].nodeValue);
// }))

const allButtons = Array.from(document.querySelectorAll('.button'));

function connectButtons(e) {
    //choose the correct button, either by click or keyboard
    let theCode;
    if (e.type === 'click') {
        theCode = e.currentTarget;
    } else {
        theCode = document.querySelector(`button[data-key="${e.code}"]`);
    }

    //theCode.childNodes[0].nodeValue  <- the actual number on the button
}

window.addEventListener('keydown', connectButtons);
allButtons.forEach(btn => btn.addEventListener('click', connectButtons));