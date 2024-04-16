let displayedNumber = document.querySelector("#screen");
displayedNumber.innerText = "0";
let clearScreen = false;
let nextOperation;
let numbers = []


function clearDisplayedScreen(){
    document.querySelector("#clear-button").innerText = "CE";
    displayedNumber.innerText = "0";
    numbers = []
    clearScreen = false;
}
function addToScreen(event){
    document.querySelector("#clear-button").innerText = "C";
    if ((displayedNumber.innerText === "0" && event.target.textContent != '.')|| clearScreen){
        displayedNumber.innerText = event.target.textContent;
        clearScreen = false;
    } else {
        displayedNumber.innerText += event.target.textContent;
    }
}

function calculate(){
    switch(nextOperation) {
        case 1:
          return numbers[numbers.length-2] + numbers[numbers.length-1];
        case 2:
          return numbers[numbers.length-2] - numbers[numbers.length-1];
        case 3:
          return numbers[numbers.length-2] * numbers[numbers.length-1];
        case 4:
            if(numbers[numbers.length-1] == 0){
                return
            }
          return numbers[numbers.length-2] / numbers[numbers.length-1];
        case 5:
          return numbers[numbers.length-1];
        default:
          console.log("no value");
      }
    return
}
function addNumbers(){
    numbers.push(Number(displayedNumber.innerText));
    if(numbers.length > 1){
        let result = calculate();
        numbers[numbers.length-1] = result;
        displayedNumber.innerText = result;
    }
    nextOperation = 1;
    clearScreen = true;
}
function reduceNumbers(){
    numbers.push(Number(displayedNumber.innerText));
    if(numbers.length > 1){
        let result = calculate();
        numbers[numbers.length-1] = result;
        displayedNumber.innerText = result;
    }
    nextOperation = 2;
    clearScreen = true;
}
function multiplyNumbers(){
    numbers.push(Number(displayedNumber.innerText));
    if(numbers.length > 1){
        let result = calculate();
        numbers[numbers.length-1] = result;
        displayedNumber.innerText = result;
    }
    nextOperation = 3;
    clearScreen = true;
}
function divideNumbers(){
    numbers.push(Number(displayedNumber.innerText));
    if(numbers.length > 1){
        let result = calculate();
        numbers[numbers.length-1] = result;
        displayedNumber.innerText = result;
    }
    nextOperation = 4; 
    clearScreen = true;
}
function equalFunc(){
    numbers.push(Number(displayedNumber.innerText));
    if(numbers.length > 1){
        let result = calculate();
        numbers[numbers.length-1] = result;
        displayedNumber.innerText = result;
    }
    nextOperation = 5; 
    clearScreen = true;
}