let username;
let gameStarted = false;
let board = [];
let domBoard;
const offsets = [ // Make the search for the adjacent cells more efficient and orgnized
    [-1, -1], [-1, 0], [-1, 1], 
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1] 
];
let leftNonMinesCell;
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

function nameInserted(){
    let inputElement = document.querySelector("#username");
    username = inputElement.value;
    if(username != ""){
        document.querySelector("#greet").style.display = "none";
        return true;
    }else{
        inputElement.style.border = '2px solid red';
        inputElement.placeholder = "❌ You must enter your name first!";
        return false;
    }
}

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
            document.querySelector("#timer").innerText = clock.displayTimer();
        }, 1000);
        isTimerRun = true;
    } else{
        window.clearInterval(timeInterval);
        isTimerRun = false;
    }
}

function generateInitialBoard(size){
    for (let row = 0; row < size; row++) {
        let newRow = [];
        for (let i = 0; i < size; i++) {
            newRow.push({cellID: undefined, row:row, col:i, value:"", isOpen: false});
        }
        board.push(newRow);
    }
}
function insertMines(amountOfMines) {
    while (amountOfMines > 0) {
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board.length);
        if (board[row][col].value === "") {
            board[row][col].value = "💣";
            amountOfMines--;
        }
    }
}
function isMinedCell(cell){ 
    if (cell.value ==="💣"){
        return true;       
    }
    return false;
}
function isExistCell(row, col){ // check if the cell is exist in the board indexes
    if((row >= 0 && row < board.length) &&((col >= 0 && col < board.length))){
        return true;
    }
    return false;
}
function checkAdjacentCells(cell){  // Iterate over all the adjacent cells of the cell and count the 💣 cells
    let adjacentMines = 0;
    for(let offset = 0; offset<offsets.length; offset++){
        if(isExistCell(cell.row + offsets[offset][0], cell.col + offsets[offset][1])){
            if(isMinedCell(board[cell.row + offsets[offset][0]][cell.col + offsets[offset][1]])){
                adjacentMines ++;
            }
        }
    }
    cell.value = adjacentMines;
}
function doneBoard(){ // fill the values of all the non mine cells, the value is the number of the mine adjacent cells
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            const cell = board[row][col];
            if(!isMinedCell(cell)){
                checkAdjacentCells(cell);
            }
        }
    }
}
function generateGameBoard(size, amountOfMines){
    generateInitialBoard(size);
    insertMines(amountOfMines);
    doneBoard();
    domBoard = document.querySelector("#board")
    domBoard.innerHTML = "";
    domBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    domBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    board.forEach((row) => {
        for (const cell of row) {
            domBoard.innerHTML += `<div value="${cell.value}" data-row="${cell.row}" data-col="${cell.col}" class="card" id="${cell.row}X${cell.col}" onclick="openCells(this.id)"></div>`;
            
            cell.cellID = `${cell.row}X${cell.col}`;
        }
    });
}
function startGame(size){
    if (nameInserted()) {
        generateGameBoard(size, (size*2));
        startStopTimer();
        leftNonMinesCell = (size**2)-(size*2);
        document.getElementById("left-cells").innerText = leftNonMinesCell;
        gameStarted = true;
    }
}


function shouldOpenCell(cell){
    if(cell.value != "💣" && cell.isOpen == false){
        return true;
    }
    return false;
}
function gameOver(){
    document.getElementById("left-cells").innerText = leftNonMinesCell;
    if (leftNonMinesCell == 0) { // if its a case of win
        window.setTimeout(function(){
            const endMessage = `<div id="end-message" class="flex-group">
            <p class="end-text">
              Well Done <span id="name">${username}</span> you did it !
            </p>
            <p class="end-text">It took <span id="total-time">${clock.displayTimer()}</span></p>
            <p>To start new game please press the 😄 button</p>
          </div>`;
          domBoard.innerHTML += endMessage;
          startStopTimer();
        }, 1000)
    }else{
        domBoard.childNodes.forEach((element) => { // Remove the option to continue the game
            element.removeAttribute('onclick');
        });
        startStopTimer();
        document.querySelector("#restart").innerText = '😭';
    }
}
function elementHandling(cell){ // replace the class of the cell from card to opened-card
    const element = document.getElementById(cell.cellID);
    element.classList.remove("card");
    element.classList.add('opened-card');
    if(cell.value != 0){
        element.innerText = cell.value;
    }
}
function openCells(cellID){ // by clicking a cell check the cell value and start recursion/end the game 
    const parts = cellID.split('X'); // match the ID of the cell to the behind the scene board cells elements
    const cell = board[parts[0]][parts[1]]; 
    elementHandling(cell);
    cell.isOpen = true;
    leftNonMinesCell --;
    if(isMinedCell(cell) || leftNonMinesCell == 0){// Game over
        gameOver();
        return;
    }
    document.getElementById("left-cells").innerText = leftNonMinesCell;
    if(cell.value > 0){ // if its a cell with a value stop the recursion 
        return;
    }
    for(let offset = 0; offset<offsets.length; offset++){ // for loop that iterates over all the adjacent possibilities cells
        if(isExistCell(cell.row + offsets[offset][0], cell.col + offsets[offset][1])){ // Validation to avoid cases of searching indexes that doesnt exists in the board list
            if(shouldOpenCell(board[cell.row + offsets[offset][0]][cell.col + offsets[offset][1]])){ // validation to avoid open 💣 cells and also from repeating and open cells that already opened
                openCells(board[cell.row + offsets[offset][0]][cell.col + offsets[offset][1]].cellID); // recursion
            }
        }
    }
}

function resetClock(){
    if(isTimerRun){
        window.clearInterval(timeInterval);
        isTimerRun = false;
    }
    clock.hours = 0, clock.minutes = 0, clock.seconds = 0;
    document.querySelector("#timer").innerText = clock.displayTimer();
}
function restart(){
    if(gameStarted){
        const size = board.length;
        board = [];
        resetClock();
        window.setTimeout(function(){
            document.querySelector("#restart").innerText = '😄';
            startGame(size);
        }, 1000)
    }
}





