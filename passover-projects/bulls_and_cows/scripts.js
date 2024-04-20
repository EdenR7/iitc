let username;
let boardsize;
let targetBoard = [];
let userBoard = [];
let guessesContainerElement = document.querySelector(".guesses-container");
let curIndexToReplace = 0;
let tries = 0;
let clock = {
    seconds : 0,
    minutes : 0,
    hours : 0, 
    displayTimer : function(){
        return(`${this.hours.toString().length == 1 ? `0${this.hours}`:this.hours}:${this.minutes.toString().length == 1 ? `0${this.minutes}`:this.minutes}:${this.seconds.toString().length == 1 ? `0${this.seconds}`:this.seconds}`);
    }
};
let timeInterval;
let isTimerRun = false;


function startGame(){
    username = document.querySelector("#username").value;
    if(username == ""|| username == "Insert your name first!"){
        document.querySelector("#username").placeholder = "❌ You must enter your name first!";
        document.querySelector("#username").style.border = '2px solid red';
    }else{
        document.getElementById("start-page-container").style.display = "none";
        document.getElementById("game-container").style.display = "flex";
        boardsize = Number(document.getElementById("options").value);
        generateRandomBoard(boardsize);
        generateFirstCard();
        generateNewUserTurn();
        document.querySelector(".greet-message").innerText = `Hello ${username} welcome to Bulls&Cows !`;
        document.querySelector("#mistakes").innerText = tries;
        startStopTimer();
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
function startStopTimer(){
    if(! isTimerRun){
        timeInterval = window.setInterval(function(){
            clock.seconds ++;
            if(clock.seconds == 60){
                clock.seconds = 0;
                clock.minutes ++;
            }
            if(clock.minutes == 60){
                clock.minutes = 0;
                clock.hours ++;
            }
            document.querySelector("#stopwatch").innerText = clock.displayTimer();
        }, 1000);
        isTimerRun = true;
    } else{
        window.clearInterval(timeInterval);
        isTimerRun = false;
    }
}

function generateFirstCard(){
    let firstCard = document.querySelector("#title-card");
    for (let index = 0; index < targetBoard.length; index++) {
        firstCard.innerHTML += `<div class = "number-div"> ${"?"}</div>`;
    }
    firstCard.innerHTML += `<div id = "first-bull">Bulls</div>`;
    firstCard.innerHTML += `<div id = "first-cow">Cows</div>`;
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
        const bulls = checkCowsAndBulls().bulls, cows = checkCowsAndBulls().cows; // delete last guess card and transfer to div card instead of buttons
        removeLastChild()
        let innerHtmlToAdd = `<div class="guess-card flex-group">`;// transfer the last row to div rows instead of buttons
        userBoard.forEach((number) => {
            innerHtmlToAdd += `<div class = "number-div"> ${number}</div>`;
        });
        innerHtmlToAdd += `<div class = "bulls">${bulls}</div>`;
        innerHtmlToAdd += `<div class = "cows">${cows}</div>`;
        innerHtmlToAdd += `</div>`;
        guessesContainerElement.innerHTML += innerHtmlToAdd;
        document.querySelector("#mistakes").innerText = tries;
        if(bulls == targetBoard.length){// check game over 
            startStopTimer();
            gameOver();
        } else{
            generateNewUserTurn()
        }
        tries ++;
    }
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

function gameOver (){
    document.querySelector("#overlay-message").style.display = "flex";
    document.querySelector("#title-overlay").innerText = `Well done ${username} the numbers were ${targetBoard}`;
    document.querySelector("#time-overlay").innerText = `Time to solve: ${clock.displayTimer()}`;
    clock.hours = 0, clock.minutes = 0, clock.seconds = 0;
    document.querySelector("#tries-overlay").innerText = `${tries} tries`;
    tries = 0;
}
function closeOverlay(){
    document.querySelector("#overlay-message").style.display = "none";
}

function playAgain(){
    document.querySelector("#overlay-message").style.display = "none";
    guessesContainerElement.innerHTML = '<div class="guess-card flex-group" id="title-card"></div>';
    targetBoard = [];
    userBoard = [];
    curIndexToReplace = 0;
    tries = 0;
    startGame();
}

