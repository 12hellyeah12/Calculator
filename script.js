const inputFrame = document.querySelector("#input-frame");
const outputFrame = document.querySelector("#output-frame");
const inputHistory = document.querySelector("#input-history");

const buttonText = [
    "", "+/-", "%", "/",
     "7", "8", "9", "*", 
     "4", "5", "6", "-",
     "1", "2", "3", "+",
     "AC", "0", ".", "="
];

const buttonIdentification = [
    "empty", "pos-neg", "modulo", "division",
     "seven", "eight", "nine", "multiplication", 
     "four", "five", "six", "substraction",
     "one", "two", "three", "addition",
     "clear", "zero", "decimal", "equal"
];

const operators = ["%", "/", "*", "-", "+"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const calculatorFunctions = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
    "%": (num1, num2) => num1 % num2,
};

const createInputButtons = (numOfButtons) => {
    for(let i = 0; i < numOfButtons; i++){
        inputFrame.innerHTML += 
        `<button class ="buttons" id="btn-" type="button"></button>`;
    }

    return buttons = document.querySelectorAll(".buttons");
};

const nameInputButtons = () => {
    for(let i = 0; i < 20; i++){
        buttons[i].innerText = buttonText[i];
        buttons[i].id += buttonIdentification[i];
        buttons[i].value = buttonText[i];
    }
};

const operate = (num1, operator, num2) => {
    const calc = calculatorFunctions[operator](Number(num1), Number(num2));
    outputFrame.innerText = calc;
};

const resetCalculator = () => {
    outputFrame.innerText = "";
    inputHistory.innerText = "";
};

const executeCalculation = () => {
    const operationsArray = outputFrame.innerText.split("");
    const indexOfOperator = operationsArray
    .map(string => Number(string))
    .findIndex(num => num != num);

    const numberOne = operationsArray.splice(0, indexOfOperator).join("");
    const operator = operationsArray.splice(0, 1);
    const numberTwo = operationsArray.splice(0).join("");

    operate(numberOne, operator, numberTwo);
}

const checkForCorrectInput = (input) => {
    const doubleOperatorRegex = /^\d+[%+-/*]\d+$/; 
    const replaceLastOperatorRegex = /^\d+[%+-/*]$/; 
    if(doubleOperatorRegex.test(input.innerText)){
        return 2;
    } else if(replaceLastOperatorRegex.test(input.innerText)){
        return 3;
    }
};

createInputButtons(20);
nameInputButtons();

buttons.forEach(button => {
    if(numbers.includes(button.value)){
        button.addEventListener("click", () => {
            outputFrame.innerText += button.value;
        });
    } else if(operators.includes(button.value)){
        button.addEventListener("click", () => {
        if(checkForCorrectInput(outputFrame) === 2){
            executeCalculation();
        } else if(checkForCorrectInput(outputFrame) === 3){
            const stringToArray = outputFrame.innerText.split("");
            stringToArray.pop();
            outputFrame.innerText = stringToArray.join("");
        } 
        outputFrame.innerText += button.value;
        });
    } else if(button.value === "="){
        button.addEventListener("click", () => executeCalculation());
    } else if(button.value === "AC"){
        button.addEventListener("click", () => resetCalculator());
    }
})

