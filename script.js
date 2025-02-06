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
        `<button class ="buttons" id="button${i}" type="button"></button>`;
    }

    return buttons = document.querySelectorAll(".buttons");
};

const nameInputButtons = () => {
    for(let i = 0; i < 20; i++){
        buttons[i].innerText = buttonText[i];
        buttons[i].id = buttonText[i];
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

createInputButtons(20);
nameInputButtons();
//operate(3, "+", 5);

// adds function to buttons 0-9
buttons.forEach((button) => {
    if(button.id === "AC") {
        button.addEventListener("click", () => {
            resetCalculator();
        });
    } else if(button.id === "="){
        button.addEventListener("click", () => {
            executeCalculation();
        });
    } else {
        button.addEventListener("click", () => outputFrame.innerText += button.value);
    } 
});

