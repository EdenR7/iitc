let username;
let firstGame = true;
let board;
let totalPairs;
let moves = 0;
let mistakes = 0;
let correctMove = 0;
let displayedCards = [];
let openCardNow = false;
let lastCard = {
    cardElement:"!",
    cardID:"!",
    cardValue:"!"
};
const picturesValues = [];
for(let i = 0; i<30; i++){ // Create array of the all photos
    picturesValues.push(`imgs/image${i}.jpg`);
}
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


function startStopTimer(){ // run the timer if its currently close else it will stop the timer
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
function generateRandomValues(totalCards){ // return a list, created randomly, of the values that each of the game card will inherit
    const options = [];
    for(let i = 0; i<(totalCards/2); i++){
        options.push(i);
        options.push(i);
    }
    const randomValues = [];
    let randomIndex ;
    while (options.length>0){
        randomIndex = Math.floor(Math.random() * options.length);
        randomValues.push(options[randomIndex]);
        options.splice(randomIndex, 1);
    }
    return randomValues;
}
function nameInserted(){
    let inputElement = document.querySelector("#username");
    username = inputElement.value;
    if (username != ""){
        return true;
    }else {
        inputElement.style.border = '2px solid red';
       inputElement.placeholder = "❌ You must enter your name first!";
       return false;
    }
}
function decideGridSize(size){
    switch (size) {
        case "1":
            return {gridColumn:4, gridRows:4};
        case "2":
            return {gridColumn:5, gridRows:4};
        case "3":
            return {gridColumn:6, gridRows:5};
        default:
            break;
    }
}
function getGridSize(buttonValue){ // return the desired number of columns and rows that the game board will have
    if (firstGame){
        const selectedSize = document.querySelector("#options").value;
        firstGame = false;
        return decideGridSize(selectedSize);
    } else{
        return decideGridSize(buttonValue);
    }
}
function generateNewBoard(cols, rows){
    board = document.querySelector("#board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    const numOfCards = cols*rows;
    const values = generateRandomValues(numOfCards);
    for(let i = 0; i< numOfCards; i++){
        board.innerHTML += `<div value="${values[i]}" class="card" id="card-${i}" onclick="cardPicked(event)"></div>`
    }
    totalPairs = numOfCards/2;
}
function startGame(buttonValue){
    if(nameInserted()){
        startStopTimer();
        document.querySelector(".greet").style.display = "none";
        document.querySelector(".game").style.display = "flex";
        let obj = getGridSize(buttonValue);
        generateNewBoard(obj.gridColumn,  obj.gridRows);
    }
}


function flopCards(card1, card2){ // I tried to use lastCard but due to the time delay the lastCard object alredy been updated and I lost the reference to it
    setTimeout(function(){
        card1.cardElement.style.backgroundImage = "";
        card2.cardElement.style.backgroundImage = "";
    }, 1000);
}
function validateTurn(curCard){ // Make sure that if the user selected twice the same card it wont count
    if (openCardNow){
        if(lastCard.cardID == curCard.cardID){
            return false
        }
    }
    return true;
}
function modifyElements(cardsElement){ // in case of correct move, it will change the cards style and attributes
    setTimeout(function(){
        cardsElement.forEach((cardElement) => {
            cardElement.style.backgroundImage = "none";
            cardElement.removeAttribute('onclick');
            cardElement.classList.remove('card');
            cardElement.classList.add('opened-card');
        });
    }, 500);
}
function checkGameOver(){
    if (totalPairs == correctMove){
        startStopTimer();
        document.querySelector("#endGameMessage").style.display = "flex";
        document.querySelector("#total-time").innerText = clock.displayTimer();
        document.querySelector("#total-moves").innerText = moves;
        document.querySelector("#total-mistakes").innerText = mistakes;        
        resetVariables();
    }
}
function movestracker(curCardID, lastCardID, correctMove){
    moves ++;
    if(!correctMove){
        if(displayedCards.includes(curCardID) || displayedCards.includes(lastCardID)){
            mistakes ++;
        }
    }
    document.querySelector("#mistakes").innerText = `Mistakes: ${mistakes}`;
    document.querySelector("#Moves").innerText = `Moves: ${moves}`;
}
function checkTurn(curCard){
    if(openCardNow && validateTurn(curCard)){
        if (lastCard.cardValue == curCard.cardValue){
            correctMove++;
            movestracker(curCard.cardID, lastCard.cardID, true);
            modifyElements([curCard.cardElement, lastCard.cardElement]);
            openCardNow = false;
        } else {
            movestracker(curCard.cardID, lastCard.cardID, false);
            flopCards(lastCard, curCard);
            openCardNow = false;
        }
        displayedCards.push(curCard.cardID);
        displayedCards.push(lastCard.cardID);
    }else { // Its the pick of the move, update that there is open card and move on
        openCardNow = true;
    }
    lastCard = curCard;
}
function cardPicked(event){
    const cardID = event.target.id;
    const card = {
        cardID: cardID,
        cardElement: document.getElementById(cardID),
        cardValue: document.getElementById(cardID).attributes.value.nodeValue
    };
    card.cardElement.style.backgroundImage = `url(${picturesValues[card.cardValue]})`;
    checkTurn(card);
    checkGameOver();
}
function resetVariables(){
    moves = 0;
    mistakes = 0;
    correctMove = 0;
    displayedCards = [];
    openCardNow = false;
    lastCard = {
        cardElement:"!",
        cardID:"!",
        cardValue:"!"
    };
    clock = {
        seconds : 0,
        minutes : 0,
        hours : 0, 
        displayTimer : function(){
            return(`${this.hours.toString().length == 1 ? `0${this.hours}`:this.hours}:${this.minutes.toString().length == 1 ? `0${this.minutes}`:this.minutes}:${this.seconds.toString().length == 1 ? `0${this.seconds}`:this.seconds}`);
        }
    };
    timeInterval = undefined;
    isTimerRun = false;
}

function newGame(buttonValue){
    document.querySelector("#endGameMessage").style.display = "none";
    startGame(buttonValue);
    document.querySelector("#mistakes").innerText = `Mistakes: ${0}`;
    document.querySelector("#Moves").innerText = `Moves: ${0}`;
}


