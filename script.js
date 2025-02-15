const inputFrame = document.querySelector("#input-frame");
const outputFrame = document.querySelector("#output-frame");
const inputHistory = document.querySelector("#input-history");
const backspaceButton = document.querySelector("#btn-backspace");
const clearButton = document.querySelector("#btn-clear");

const input = {
    number1: "",
    number2: "", 
    operator: ""
};
const isClicked = [];

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
    input.number1 = Math.round(calc * 100) / 100;
    input.number2 = "";
    input.operator = "";
    outputFrame.textContent = input.number1;
};

const resetCalculator = () => {
    outputFrame.textContent = "";
    input.number1 = "";
    input.number2 = "";
    input.operator = "";
    if(isClicked[0]){
    isClicked[0].classList.remove("clicked");
    isClicked.shift();
    }
};

const saveOperator = (event) => {
    input.operator = event.target.textContent;
    isClicked.push(event.target);
    event.target.classList.add("clicked");

    if(isClicked.length > 1 && isClicked[0] != isClicked[1]){
        isClicked[0].classList.remove("clicked");
        isClicked.shift();
    } else if(isClicked[0] === isClicked[1]){
            isClicked.shift();
    }
}

const saveNumber = (event) => {
    if(numbers.includes(event.target.id)){
        if(!input.operator){
            input.number1 += event.target.textContent;
            outputFrame.textContent = input.number1;
        } else if(input.operator){
            input.number2 += event.target.textContent;
            outputFrame.textContent = input.number2;
        }
    }

    if(event.target.id === "btn-backspace" || event.target.id === "backspace-icon"){
        outputFrame.textContent = outputFrame.textContent.slice(0, -1);
            if (!input.operator){
                input.number1 = outputFrame.textContent;
            } else {
                input.number2 = outputFrame.textContent;
            }
    }
};

const changeAllClear = () => {
        backspaceButton.classList.remove("invisible");
        clearButton.classList.add("invisible"); 
};

const changeBackspace = () => {
    backspaceButton.classList.add("invisible");
    clearButton.classList.remove("invisible");  
};

inputFrame.addEventListener("click", (event) => {
    if(numbers.includes(event.target.id)){
        saveNumber(event);
        changeAllClear();

    } else if(operators.includes(event.target.id) && input.number1){
        if(input.number1 && input.number2){
            operate(input.number1, input.operator, input.number2);
            saveOperator(event);
        } else{
            saveOperator(event);
        }
        
    } else if(event.target.id === "btn-equal" && input.number1 && input.number2){
            operate(input.number1, input.operator, input.number2);
            isClicked[0].classList.remove("clicked");
            isClicked.shift();

    } else if(event.target.id === "btn-clear"){
        resetCalculator();

    } else if(event.target.id === "btn-decimal" && !outputFrame.textContent.includes(".")){
        saveNumber(event);

    } else if(event.target.id === "btn-pos-neg" && !input.operator && !input.number2){
        operate(input.number1, "*", "-1");

    } else if(event.target.id === "btn-backspace" || event.target.id === "backspace-icon"){
        saveNumber(event);
        if(!input.number1 || !input.number2 && input.operator){
            changeBackspace();
        }
    }
});
