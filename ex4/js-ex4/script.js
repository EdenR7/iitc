let myBooks = [
    {
        name: "5Am club",
        pages: 320
    }, 
    {
        name: "Lazy Investors",
        pages: 120
    }, 
    {
        name: "detoxification",
        pages: 125
    }, 
    {
        name: "The monk who sold his ferrari",
        pages: 140
    }, 
    {
        name: "Surrounded by psychopaths",
        pages: 170
    }
]
function displayBooks(){
    myBooks.forEach((book) => {
        console.log(`${book.name}, ${book.pages} pages`);
    });
}
// displayBooks()

function addBook(booksArray, bookName, bookPages){
    booksArray.push({
        name: bookName,
        pages: bookPages
    });
}
addBook(myBooks, "White Feng", 250);
// displayBooks()

function getBook(booksArray, bookName){
    for (let book of booksArray) {
        if (book.name === bookName) {
            return book;
        }
    }
    return null;
}
function getBook2(booksArray, bookName){
    const foundBook = booksArray.find((book) => book.name == bookName);
    if (foundBook == undefined){
        return null;
    } else {
        return foundBook;
    }
}
console.log(getBook(myBooks, "White Feng"));
// console.log(getBook(myBooks, "White Feng"));

function updateBookPages (booksArray, bookName, bookPages){
    for (let book of booksArray) {
        if (book.name === bookName) {
            book.pages = bookPages;
            return book;
        }
    }
    return null;
}
// console.log(updateBookPages(myBooks, "The monk who sold his ferrari", 140));

function deleteBook (booksArray, bookName){
    for (let bookIndex = 0; bookIndex < booksArray.length; bookIndex++){
        if (booksArray[bookIndex].name === bookName) {
            booksArray = booksArray.splice(bookIndex, 1);
            return true;
        }
    }
    return null;
}
// deleteBook(myBooks, "detoxification");
// displayBooks();

// let numbersArr = [1,3,3,19];
// let targetNumber = Number(prompt("Please insert number to update:"));
// let found = false;
// numbersArr.forEach((number, index) => {
//     if(number == targetNumber){
//         numbersArr[index]++;
//         found = true;
//     }
// });
// if(found){
//     console.log(numbersArr);
// }else{
//     console.log("Number didnt found!");
// }