 
async function initializeBooks() {
    for (let id = 1; id <= 500; id++) {
        const newBook = {
            "name":`Book-${id}`,
            "author":`Book-${id}`,
            "numPages":Math.floor(Math.random() * 250) + 100
        }
        await fetch('http://localhost:8001/books', {
            method: "POST",
            body:JSON.stringify(newBook),
            headers: {'Content-Type':'application/json'}
        });
    }
}
async function initializeUsers() {
    for (let id = 1; id <= 500; id++) {
        const newUser = {
            "firstName": `Fname-${id}`,
            "lastName": `Lname-${id}`,
        }
        await fetch('http://localhost:8001/users', {
            method: "POST",
            body:JSON.stringify(newUser),
            headers: {'Content-Type':'application/json'}
        });
    }
}
document.getElementById('users-btn').addEventListener('click', ()=>{
    initializeUsers();
})
document.getElementById('books-btn').addEventListener('click', ()=>{
    initializeBooks();
})


async function getSpecificBook(id) {
    try {
        const response = await axios.get(`http://localhost:8001/books?id=${id}`);
        const allBooks = response.data;
        console.log(allBooks);
    } catch (error) {
        
    }
}
