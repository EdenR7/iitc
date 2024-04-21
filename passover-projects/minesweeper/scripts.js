let username;
const board = [];
let domBoard;
const offsets = [ // Make the search for the adjacent cells more efficient and orgnized
    [-1, -1], [-1, 0], [-1, 1], 
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1] 
];
let leftNonMinesCell;

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

function generateInitialBoard(size){
    for (let row = 0; row < size; row++) {
        let newRow = [];
        for (let i = 0; i < size; i++) {
            newRow.push({cellElement:undefined, cellID: undefined, row:row, col:i, value:"", isOpen: false});
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
        leftNonMinesCell = size*2;
    }
}


function shouldOpenCell(cell){
    if(cell.value != "💣" && cell.isOpen == false){
        return true;
    }
    return false;
}
function gameOver(){
}
function elementHandling(cell){
    console.log(cell);
    const element = document.getElementById(cell.cellID);
    element.classList.remove("card");
    element.classList.add('opened-card');
    if(cell.value != 0){
        element.innerText = cell.value;
    }
}
function openCells(cellID){
    const parts = cellID.split('X');
    const cell = board[parts[0]][parts[1]], element = document.getElementById(cell.cellID);
    elementHandling(cell)
    cell.isOpen = true;
    if(isMinedCell(cell)){
        elementHandling(cell);// Game over
        gameOver();
        return;
    }
    if(cell.value > 0){
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
// Add the restart button 😭
// Add the timer and the leftNonMines tracker
// improve the design





