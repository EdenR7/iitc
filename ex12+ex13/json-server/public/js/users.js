const formCreate = document.getElementById('create-user');
const formDelete = document.getElementById('delete-user');
const formUpdate = document.getElementById('update-user');
const usersUrl = 'http://localhost:8001/users';
let currentPage = 1; 


function createUserForm() {
    document.getElementById('create-user-wrapper').style.display="flex";
}
function deleteUserForm() {
    document.getElementById('delete-user-wrapper').style.display="flex";
}
function updateUserForm() {
    document.getElementById('update-user-wrapper').style.display="flex";
}

formCreate.addEventListener("submit", async (event)=>{
    event.preventDefault(); 
    try {
        const formData = new FormData(formCreate);
        axios.post(usersUrl, getFormData(formData));
    } catch (error) {
        displayOverlay()
    }
})
formDelete.addEventListener("submit", async (event)=>{
    event.preventDefault();
    try {
        const idField = formDelete.querySelector('input').value
        if (idField) {
            await axios.delete(`${usersUrl}/${idField}`)
        }
    } catch (error) {
        displayOverlay()
    }
})
formUpdate.addEventListener("submit", async(event)=>{
    event.preventDefault();
    const formData = new FormData(formUpdate);
    const inputValues = getFormData(formData);
    try {
        if (inputValues.firstName && inputValues.lastName) {
            // put
            await axios.put(`${usersUrl}/${inputValues.id}`,inputValues)
        } else{
            //patch
            for (const key in inputValues) {
                if (inputValues[key] && key != "id"){
                    await axios.patch(`${usersUrl}/${inputValues.id}`,{
                        [key]: inputValues[key]
                    })
                }
            }
        }
    } catch (error) {
        displayOverlay()
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

async function getAllUsers() {
    currentPage === 1 ? document.querySelector(".prev").style.visibility = "hidden" : document.querySelector(".prev").style.visibility = "visible";
    try {
        const response = await getPage(currentPage);
        document.getElementById('users-table-wrapper').style.display='block';
        const allUsers = response.data.data;
        const tableElement = document.getElementById('users-body');
        tableElement.innerHTML ="";
        allUsers.forEach(user => {
            tableElement.innerHTML+= `
                <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
            </tr>`
        });      
    } catch (error) {
        
    }
}
const nextPage = ()=>{
    currentPage ++;
    getAllUsers();
}
const prevPage = ()=>{
    currentPage --;
    getAllUsers();
}
function getPage(page) {
    const response = axios.get(`${usersUrl}?_page=${page}&_per_page=20`);
    return response;
}
function closeAllUsers(){
    currentPage = 1; 
    setTimeout(() => {
        document.getElementById('users-table-wrapper').style.display='none'
    }, 200);
}


    
