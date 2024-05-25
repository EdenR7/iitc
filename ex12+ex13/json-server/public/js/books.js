const formCreate = document.getElementById('create-book');
const formDelete = document.getElementById('delete-book');
const formUpdate = document.getElementById('update-book');
const booksUrl = 'http://localhost:8001/books';
let currentPage = 1; 

function pause(time) {
    setTimeout(()=>{
        return
    }, time)
}
function createBooksForm() {
    document.getElementById('create-book-wrapper').style.display="flex";
}
function deleteBooksForm() {
    document.getElementById('delete-book-wrapper').style.display="flex";
}
function updateBooksForm() {
    document.getElementById('update-book-wrapper').style.display="flex";
}

formCreate.addEventListener("submit", async (event)=>{
    event.preventDefault(); 
    try {
        const formData = new FormData(formCreate);
        console.log(getFormData(formData));
        axios.post(booksUrl, getFormData(formData));
    } catch (error) {
        displayOverlay()
    }
})

formDelete.addEventListener("submit", async (event)=>{
    event.preventDefault();
    try {
        const idField = formDelete.querySelector('input').value;
        if (idField) {
            await axios.delete(`${booksUrl}/${idField}`);
        }
    } catch (error) {
        displayOverlay();
    }
})

formUpdate.addEventListener("submit", async(event)=>{
    event.preventDefault();
    const formData = new FormData(formUpdate);
    const inputValues = getFormData(formData);
    try {
        if (inputValues.name && inputValues.author && inputValues.numPages) {
            // put
            axios.put(`${booksUrl}/${inputValues.id}`,inputValues)
        } else{
            //patch
            for (const key in inputValues) {
                if (inputValues[key] && key != "id"){
                    axios.patch(`${booksUrl}/${inputValues.id}`,{
                        [key]: inputValues[key]
                    });
                }
            }
        }
    } catch (error) {
        displayOverlay();
    }
})

function displayOverlay() {
    document.querySelector('.overlay-message').style.display="flex";
    document.querySelector("main").style.opacity = .5;
}
function getFormData(formDataElement) {
    const data ={};
    for (let pair of formDataElement.entries()) {
      data[pair[0]] = pair[1];
    }
    return data;
}

async function getAllBooks() {
    currentPage === 1 ? document.querySelector(".prev").style.visibility = "hidden" : document.querySelector(".prev").style.visibility = "visible";
    try {
        const response = await getPage(currentPage);
        document.getElementById('books-table-wrapper').style.display='block';
        const allBooks = response.data.data;
        const tableElement = document.getElementById('books-body');
        tableElement.innerHTML ="";
        allBooks.forEach(book => {
            tableElement.innerHTML+= `
                <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.numPages}</td>
            </tr>`
        });      
    } catch (error) {
        displayOverlay();
    }
}
const nextPage = ()=>{
    currentPage ++;
    getAllBooks();
}
const prevPage = ()=>{
    currentPage --;
    getAllBooks();
}

function getPage(page) {
    const response = axios.get(`${booksUrl}?_page=${page}&_per_page=12`);
    return response;
}
function closeAllBooks(){
    currentPage = 1; 
    setTimeout(() => {
        document.getElementById('books-table-wrapper').style.display='none'
    }, 200);
}


    
