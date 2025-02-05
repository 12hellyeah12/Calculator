const inputFrame = document.querySelector("#input-frame");
const outputFrame = document.querySelector("#output-frame");


const buttonText = [
    "", "+/-", "%", "/",
     "7", "8", "9", "*", 
     "4", "5", "6", "-",
     "1", "2", "3", "+",
     "AC", "0", ",", "="
];

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
    }
    
};

createInputButtons(20);
nameInputButtons();

