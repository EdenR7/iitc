let username;
let boardsize;
const targetBoard = [];
let userBoard = [];
let guessesContainerElement = document.querySelector(".guesses-container");
let curIndexToReplace = 0;


function startGame(){
    username = document.querySelector("#username").value;
    if(username == ""|| username == "Insert your name first!"){
        document.querySelector("#username").value= "Insert your name first!";
        document.querySelector("#username").style.color= "#DD5746";
    }else{
        document.getElementById("start-page-container").style.display = "none";
        document.getElementById("game-container").style.display = "flex";
        boardsize = Number(document.getElementById("options").value);
        generateRandomBoard(boardsize);
        generateFirstCard();
        generateNewUserTurn();
    }
}
function generateRandomBoard(size){
    let options = [0,1,2,3,4,5,6,7,8,9];
    let randomIndex;
    for(let i = 0; i < size; i ++){
        userBoard.push(`${i}`)
        randomIndex = Math.floor(Math.random() * options.length);
        targetBoard.push(options[randomIndex].toString());
        options.splice(randomIndex, 1);
    }
}

function generateFirstCard(){
    let firstCard = document.querySelector("#title-card");
    targetBoard.forEach((number) => {
        firstCard.innerHTML += `<div class = "number-div"> ${"?"}</div>`;
    });
    firstCard.innerHTML += `<div class = "bulls">Bulls</div>`;
    firstCard.innerHTML += `<div class = "cows">Cows</div>`;
}
function generateNewUserTurn(){
    let innerHtmlToAdd = `<div class="guess-card flex-group">`;
    userBoard.forEach((number, index) => {
        innerHtmlToAdd += `<button class = "number-btn" type="button" id="btn${index}" value="${index}" onclick="changeIndexTarget(this.value)"> ${number}</button>`;
    });
    innerHtmlToAdd += `</div>`;
    guessesContainerElement.innerHTML += innerHtmlToAdd;
}
function changeIndexTarget(newIndex){
    curIndexToReplace = newIndex;
}
function changeDigit(event){
    let newValue =  event.target.innerText;
    //Change the button text
    let curButton = document.querySelector(`#btn${curIndexToReplace}`);
    curButton.innerText = newValue;
    //change the user array
    userBoard[curIndexToReplace] = newValue;
}

function checkTurn(){
    if(!isValidTurn()){
        alert("You have duplicates in your try !")
    }else{
        const bulls = checkCowsAndBulls().bulls, cows = checkCowsAndBulls().cows; 
        // delete last guess card and transfer to div card instead of buttons
        removeLastChild()
        // transfer the last row to div rows instead of buttons
        let innerHtmlToAdd = `<div class="guess-card flex-group">`;
        userBoard.forEach((number) => {
            innerHtmlToAdd += `<div class = "number-div"> ${number}</div>`;
        });
        innerHtmlToAdd += `<div class = "bulls">${bulls}</div>`;
        innerHtmlToAdd += `<div class = "cows">${cows}</div>`;
        innerHtmlToAdd += `</div>`;
        guessesContainerElement.innerHTML += innerHtmlToAdd;
        // check game over 
        if(bulls == targetBoard.length){
            alert("Done!")
        } else{
            generateNewUserTurn()
        }}
}
function isValidTurn(){
    let setToCheck = new Set(userBoard);
    return setToCheck.size == userBoard.length;
}
function removeLastChild() {
    const parent = guessesContainerElement
    if (parent && parent.lastElementChild) {
        parent.removeChild(parent.lastElementChild);
    }
}
function checkCowsAndBulls() {
    let cows = 0;
    let bulls = 0;
    for(let index = 0; index<targetBoard.length;index++){
        if(userBoard[index] == targetBoard[index]){
            bulls ++;
        } else if(targetBoard.includes(userBoard[index])){
            cows ++ ;
        }
    }
    return { bulls, cows };
}


