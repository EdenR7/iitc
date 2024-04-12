let myBoard = [];
let gameStatistics = [];
let roundResult = ''; 
const markers = ["X", "O"];

function createBoard(){ // intialize the board, gets the user input inside and make sure that the size will be greater than 2
    myBoard = [];
    while(true){
        boradSize = getNumber("Please select the table size for the next round:");
        if (boradSize > 2){
            for(let i = 0; i < boradSize; i++){
                let newRow = [];
                for(let j = 0; j < boradSize; j++){
                    newRow.push("-");
                }
                myBoard.push(newRow);
            }
        return;
        } else{
            alert("Table size must be greater than 2 !");
        } 
    }
}
function generateRandomIndex(){ // return 0 or 1 randomly , used for pick index from names and markers list 
    return Math.round(Math.random());
}


function isWinRow(rowIndex){
    let rowToCheck = myBoard[rowIndex];
    let firstElement = rowToCheck[0];
    if(firstElement === "-"){
        return false
    }
    for(let i = 1; i < rowToCheck.length; i ++){
        if(rowToCheck[i] != firstElement){
            return false;
        }
    }
    return true;
}
function isWinCol(colIndex){
    let firstElement = myBoard[0][colIndex];
    if(firstElement === "-"){
        return false
    }
    for(let i = 1; i < myBoard.length; i ++){
        if(myBoard[i][colIndex] != firstElement){
            return false;
        }
    }
    return true
}
function diagonalLTR(){
    let firstElement = myBoard[0][0]; 
    if(firstElement === "-"){
        return false
    }
    for(let i = 0; i< myBoard.length; i++){
        if(myBoard[i][i] != firstElement){
            return false;
        }
    }
    return true;
}
function diagonalRTL(){
    let firstElement = myBoard[0][myBoard.length-1];
    if(firstElement === "-"){
        return false;
    }
    for(let i = 0; i < myBoard.length; i++){
        if(myBoard[i][myBoard.length-i-1] != firstElement){
            return false;
        }
    }
    return true;
}
function isTie(){
    for(let i = 0; i < myBoard.length; i++){
        for(let j = 0; j< myBoard.length; j++){
            if(myBoard[i][j] != "X" && myBoard[i][j] != "O"){
                return false;
            }
        }
    }
    return true;
}
function isGameOver(name){ // executing all the table validations, print the game result and also update the global roundResult variable
    // row check :
    for(let rowIndex = 0; rowIndex < myBoard.length ; rowIndex++){
        if(isWinRow(rowIndex) == true){
            alert(`${name} is the winner!`);
            roundResult = name;
            return true;
        }
    }
    // col check
    for(let colIndex = 0; colIndex < myBoard.length ; colIndex++){
        if(isWinCol(colIndex) == true){
            alert(`${name} is the winner!`);
            roundResult = name;
            return true;
        }
    }
    // diagonals
    if(diagonalLTR() == true){
        alert(`${name} is the winner!`);
        roundResult = name;
        return true;
    }
    if(diagonalRTL() == true){
        alert(`${name} is the winner!`);
        roundResult = name;
        return true;
    }
    // tie
    if (isTie() == true){
        alert("Its a TIE !");
        roundResult = "Tie";
        return true;
    }
    return false;
}


function isEmptySlot(rowIndex, colIndex){
    if(myBoard[rowIndex][colIndex] == "-"){
        return true;
    }
    return false;
}
function placeMarker(markerType, rowIndex, colIndex){ // gets the row and col indexes, if its an empy index it will mark it
    if(isEmptySlot(rowIndex, colIndex) == true){
        myBoard[rowIndex][colIndex] = markerType;
        alert(`Index ${rowIndex},${colIndex} has been marked!`);
    }else {
        alert("Error! pick an empty slot");
    }
}


function getUserName(strToDisplay){ // input func, make sure that the user insert value to the name prompt
    while(true){
        let name = prompt(strToDisplay);
        if (name == ""){
            alert("Enter your name!");
        }else{
            return name
        }
    }
}
function getNumber(strToDisplay){ // input func, make sure that the user insert number and return it as a number
    while(true){
        let number = prompt(strToDisplay);
        if(!isNaN(number)){
            return Number(number);
        } else{
            alert("Enter a number!");
        }
    }
}
function getRowIndex(strToDisplay){ // input func, gets the row index from the user, make sure that the row index is within the borders
    while(true){
        let rowIndex = getNumber(strToDisplay);
        if (rowIndex >= 0 && rowIndex < myBoard.length){
            return rowIndex
        } else{
            alert("Your number isnt in the range options !");
        }
    }
}
function getColIndex(strToDisplay){ // input func, gets the column index from the user, make sure that the col index is within the borders
    let colIndex = prompt(strToDisplay);
    return colIndex;
}
function gameOn(){ // input func, using for get yes or no from the user wether he wants to continue or not 
    let decision;
    while(true){
        decision = prompt("Insert 'yes' for one more round, 'no' for stop :");
        decision = decision.toLowerCase();
        switch(decision){
            case "yes":
                return true;
            case "no":
                return false;
            default:
                alert("Please select only yes or no!");
        }
    }
}


function displayBoard(){ // translate the game border to a string, color the X and O and display the board
    console.clear();
    let boradAsStr = "";
    for(let row = 0; row < myBoard.length; row++){
        let rowToDisplay = "";
        for(let index = 0; index < myBoard.length; index++){
            if (index != myBoard.length-1){
                rowToDisplay += (` ${myBoard[row][index]} |`);
            }else {
                rowToDisplay += (` ${myBoard[row][index]} \n`);
            }
        }
        if (row != myBoard.length-1){
            rowToDisplay += (`${"_".repeat(myBoard.length*4)}\n`);
        }
        boradAsStr += rowToDisplay;
    }
    printColoredString(boradAsStr);
}
function printColoredString(inputString) {
    let outputString = "";
    let styles = [];
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (char === 'X') {
            outputString += "%cX";
            styles.push("color: blue;");
        } else if (char === 'O') {
            outputString += "%cO";
            styles.push("color: yellow;");
        } else {
            outputString += "%c" + char;
            styles.push("");
        }
    }
    console.log(outputString, ...styles);
}
function displayStatistics(){ // display the game statistics in a more convinient way
    console.log("Statistics :");
    let statisticsString = '';
    for(let index = 0; index < gameStatistics.length; index++){
        statisticsString += (`Round ${gameStatistics[index][0]}:\nRound result: ${gameStatistics[index][1]}, round took ${gameStatistics[index][2]} seconds\n`);
    }
    console.log(statisticsString);
}


function main(){ // main function includes all the flow of the game
    //First general intializations :
    const playersNames = [getUserName("Hello Player1 Please enter your name"), getUserName("Hello Player2 Please enter your name")];
    let numOfRounds = 1;

    let runGame = true;
    //Loop of all the game, stops at the end of a round that the user insert no 
    while(runGame == true){
        createBoard();
        //Choose the first player randomly
        let firstPlayerIndex = generateRandomIndex();
        let pl1Name = playersNames[firstPlayerIndex], pl2Name = playersNames[1-firstPlayerIndex];
        alert(`${pl1Name} you will go first this round !`);
        //Choose the markers of the players randomly
        let pl1Marker = markers[firstPlayerIndex], pl2Marker = markers[1-firstPlayerIndex];
        alert(`${pl1Name} you will play ${pl1Marker}!`);
        alert(`${pl2Name} you will play ${pl2Marker}!`);

        let endGame = false;
        let startTime = performance.now();
        while(endGame == false){
            //Player 1 turn
            displayBoard();
            console.log(`${pl1Name} its your turn !`);
            let correctPick = false;
            while(correctPick == false){
                let rowIndex = getRowIndex(`${pl1Name}, select the row index(0-${myBoard.length-1})`);
                let colIndex = getColIndex(`${pl1Name}, select the col index(0-${myBoard.length-1})`);
                correctPick = isEmptySlot(rowIndex, colIndex);
                placeMarker(pl1Marker, rowIndex, colIndex);
            }
            displayBoard();
            endGame = isGameOver(pl1Name);
            if (endGame == true){
                //Stops the round at the middle of the loop if the round ended at the first player turn
                break;
            }
            //Player 2 turn
            console.log(`${pl2Name} its your turn !`);
            correctPick = false;
            while(correctPick == false){
                let rowIndex = getRowIndex(`${pl2Name}, select the row index(0-${myBoard.length-1})`);
                let colIndex = getColIndex(`${pl2Name}, select the row index(0-${myBoard.length-1})`);
                correctPick = isEmptySlot(rowIndex, colIndex);
                placeMarker(pl2Marker, rowIndex, colIndex);
            }
            displayBoard();
            endGame = isGameOver(pl2Name);
        }

        let endTime = performance.now();
        let roundStatistics = [numOfRounds, roundResult, Math.round((endTime - startTime) / 1000)];
        gameStatistics.push(roundStatistics);
        numOfRounds ++;
        runGame = gameOn();

    }
    displayStatistics();
}
main();

