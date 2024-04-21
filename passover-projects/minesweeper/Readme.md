
Data structure 
- 2D array, represent the board
- each index in the array is an object that has its positions(row number, col number) and its value(bomb/adjacent mines cells).

Operations 
- initialize the game board, insert the bombs and count the adjacent bomb cells of each index in the board
- select specific cell, and check its value 
- recursion to open all the adjacent cells until reach cell with: greater than 0 value/ bomb.


flow 
- user select board size
- generate board
- every time the user select cell it checks its value:
 1. 0 value: open all the adjcent cells of the area
 2. 1-8 value: open only that cell
 3. game over 
  