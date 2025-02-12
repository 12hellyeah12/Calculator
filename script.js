const inputFrame = document.querySelector("#input-frame");
const outputFrame = document.querySelector("#output-frame");
const inputHistory = document.querySelector("#input-history");
let output;
let inputNumbers = [];
let operator;

const buttonIdentification = [
    "empty", "pos-neg", "modulo", "division",
     "seven", "eight", "nine", "multiplication", 
     "four", "five", "six", "substraction",
     "one", "two", "three", "addition",
     "clear", "zero", "decimal", "equal"
];

const operators = [
    "btn-modulo", "btn-division", "btn-multiplication", "btn-substraction", "btn-addition"
];
const numbers = [
    "btn-0", "btn-1", "btn-2", "btn-3", "btn-4", "btn-5", "btn-6", "btn-7", "btn-8", "btn-9"
];

const calculatorFunctions = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
    "%": (num1, num2) => num1 % num2,
};

const operate = (num1, operator, num2) => {
    const calc = calculatorFunctions[operator](Number(num1), Number(num2));
    inputNumbers = [];
    inputNumbers[0] = calc;
    return Math.round(calc * 100) / 100;
};

const resetCalculator = () => {
    outputFrame.textContent = "";
    output = "";
    inputNumbers = [];
    operator = "";
};

const saveInput = (event) => {
    if(operators.includes(event.target.id)){
        operator = event.target.textContent;
    }

    if(!inputNumbers[0]){
        inputNumbers[0] = output;
    } else if(inputNumbers[0]){
        inputNumbers[1] = output;
    }
}

const checkForCorrectInput = (button, input) => {
    const doubleOperatorRegex = /^-?\d+[%+-/*]-?\d+$/; 
    const replaceLastOperatorRegex = /^-?\d+[%+-/*]$/; 
    const positiveToNegativeRegex = /^-?\d+$/;

    if(doubleOperatorRegex.test(input.innerText)){
        executeCalculation();
       input.innerText += button.value;
    } else if(replaceLastOperatorRegex.test(input.innerText)){
        const stringToArray = input.innerText.split("");
        stringToArray.pop();
        input.innerText = stringToArray.join("");
        input.innerText += button.value;
    } else if(positiveToNegativeRegex.test(input.innerText) && button.value === "+/-"){
        operate(input.innerText, "*", "-1");
    }
};

const toggleOperatorButtons = () => {
    buttons.forEach(button => {
        if(operators.includes(button.value)){
            if(clickCount > 0){
                button.removeAttribute("disabled", "");
            } else{
            button.setAttribute("disabled", "");
            }
        }
    });
}

inputFrame.addEventListener("click", (event) => {
    if(numbers.includes(event.target.id)){
        output = event.target.textContent;

    } else if(operators.includes(event.target.id)){
        saveInput(event);
        if(inputNumbers[0] && inputNumbers[1]){
            output = operate(inputNumbers[0], operator, inputNumbers[1]);
        }

    } else if(event.target.id === "btn-equal"){
        saveInput(event);
        output = operate(inputNumbers[0], operator, inputNumbers[1]);

    } else if(event.target.id === "btn-clear"){
        resetCalculator();
    }

    outputFrame.textContent = output;
});

