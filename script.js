const inputFrame = document.querySelector("#input-frame");
const outputFrame = document.querySelector("#output-frame");
const inputHistory = document.querySelector("#input-history");
let clickCount = 0;

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
    outputFrame.innerText = calc.toFixed(2);
};

const resetCalculator = () => {
    outputFrame.innerText = "";
    inputHistory.innerText = "";
};

const executeCalculation = () => {
    const operationsArray = outputFrame.innerText.split("");
    const indexOfOperator = operationsArray.findIndex((element, index) => {
        if(index > 0){
        return operators.includes(element);
        }
    });

    const numberOne = operationsArray.splice(0, indexOfOperator).join("");
    const operator = operationsArray.splice(0, 1);
    const numberTwo = operationsArray.splice(0).join("");

    operate(numberOne, operator, numberTwo);
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
    let output;
    if(numbers.includes(event.target.id)){
        output = event.target.textContent;
    }
    else if(operators.includes(event.target.id)){
        
    }
    outputFrame.textContent = output;
});

