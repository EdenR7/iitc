const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
let totalToDo = 0;
let currentOpenField = false;
let todoArray = [];

let longestTitleElement={
    title : '',
    id : 0
};
let shortestTitleElement={
    title : '',
    length: Infinity,
    id : 0
};


async function ajax_6b(url) {
    const response = await axios.get(url);
    const postsArray = response.data
    postsArray.forEach(post => {
        console.log(post.userId, post.title);
    });
}

async function ajax_7_b() {
    //posts
    try {
        const listElement = document.querySelector(".stylish-list");
        listElement.innerHTML="";
        document.querySelector(".loading").style.display = "block";

        const response = await axios.get(postsUrl);
        await new Promise(resolve => setTimeout(resolve, 500)); //display the loading message for at least 0.5 second

        document.querySelector(".loading").style.display = "none";
        const postsArray = response.data;
        postsArray.forEach(post => {
            listElement.innerHTML += `<li><span class="li-title">${post.userId}: </span>${post.title}</li>`;
        });
    } catch (error) {
        document.querySelector(".loading").innerHTML = `Error - ${error}`;
    }
}

async function ajax_9_b(){ // todos
    try {
        const listElement = document.querySelector(".stylish-list");
        listElement.innerHTML="";
        document.querySelector(".loading").style.display = "block";
        const response = await axios.get(todosUrl);
        await new Promise(resolve => setTimeout(resolve, 500))
        document.querySelector(".loading").style.display = "none";

        todoArray = response.data;
        await todoArray.forEach((post, index) => {
            addTodo(post, listElement, index)
        });
        dispalyTitles();
        addDynamicTitle();
        document.querySelector(".search-button").style.display = "inline";
    } catch (error) {
        document.querySelector(".loading").innerHTML = `Error - ${error}`;
    }
}
function dispalyTitles() {
    totalToDo = todoArray.length;
    document.querySelector(".total-elements").style.display = "inline"  
    document.querySelector(".total-span").innerHTML = todoArray.length;

    document.getElementById("longest-span").innerText = longestTitleElement.title;
    document.getElementById("longest-title").style.display = "inline";

    document.getElementById("shortest-span").innerText = shortestTitleElement.title;
    document.getElementById("shortest-title").style.display = "inline";
}
function trackLongestTitle(title, id) {
    if (longestTitleElement.title.length < title.length) {
        longestTitleElement.title = title;
        longestTitleElement.id = id;
    }
}
function trackShortestTitle(title, id) {
    if (shortestTitleElement.length > title.length) {
        shortestTitleElement.title = title;
        shortestTitleElement.length = title.length;
        shortestTitleElement.id = id
    }
}
function addTodo(post, listElement, index) {
    trackLongestTitle(post.title, post.userId);
    trackShortestTitle(post.title, post.userId);
    if (post.completed) {
        listElement.innerHTML +=
         `<li onclick="removeElement(this.id)" id="${index+1}"><p class="todo-main"><span class="li-id">${post.userId}: </span><span class = "li-title">${post.title}</span></p> 
            <p class="status completed-todo">Completed</p>
        </li>`;
    } else{
        listElement.innerHTML +=
        `<li onclick="removeElement(this.id)" id="${index+1}"><p class="todo-main"><span class="li-id">${post.userId}: </span><span class = "li-title">${post.title}</span></p> 
           <p class="status uncompleted-todo">Not Completed</p>
       </li>`;
    }
}
function removeElement(id) {
    if (!currentOpenField) {
        document.getElementById(id).style.display = "none"; 
        todoArray.splice(id-1, 1);
        totalToDo --;
        document.querySelector(".total-span").innerHTML = totalToDo;   
    }
}
function addDynamicTitle() {
    const allTitles = Array.from(document.querySelectorAll(".li-title"));
    allTitles.forEach((todoElement)=>{
        todoElement.addEventListener("click", (event)=>{
            event.stopPropagation();
            changeTitle(event.target, event.target.parentElement.parentElement.id)
        })
    })

}

function changeTitle(element, parentIndex){
    if (!currentOpenField) {
        currentOpenField = true;
        element.innerHTML =`<input id="change-title" type="text" placeholder ="New task title..."/>` 
        const inputField = document.getElementById("change-title");
        inputField.addEventListener('keydown', function(event) {
            changeTitleOnDom(event)
        });
    }
}
function changeTitleOnDom(event) {
    if (event.key === 'Enter') {
        if (event.target.value) {
            changeTitleArray(event.target.parentElement.parentElement.parentElement.id, event.target.value)
            const parentElement = event.target.parentElement;
            parentElement.innerHTML = event.target.value;
            currentOpenField = false;
        }
    }
}
function changeTitleArray(id, newTitle) {
    todoArray.forEach((titleElement)=>{
        if(titleElement.id == id){
            titleElement.title = newTitle;
        }
    })
}

function displayOverlay(){
    document.querySelector(".overlay-message").style.display = "flex";
    document.querySelector(".main-container").style.opacity = 0.5;
}
function closeOverlay() {
    document.querySelector(".overlay-message").style.display = "none";
    document.querySelector(".main-container").style.opacity = 1;
}
function searchTitle() {
    const inputElement = document.querySelector(".title-input")
    let matchTitle; 
    if(inputElement.value){
        for (const titleElement of todoArray) {
            if (inputElement.value === titleElement.title) {
                matchTitle = titleElement;
                let elem = document.getElementById(matchTitle.id);
                elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeOverlay();
                return;
            }
        }
        document.getElementById("search-status").style.display = "inline";
    }
}
document.getElementById("close-search").addEventListener("click", ()=>{
    closeOverlay();
})
