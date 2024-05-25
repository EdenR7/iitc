
const getUser = ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id:1, name:'John Due'});    
        }, 1000);
    })
}
const fetchPosts = (i)=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (i>10) {
                reject("NONE")
            }else{
                resolve(['Post1', 'Post2']);
            }    
        }, 200);
    })
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(['Post1', 'Post2']);    
    //     }, 2000);
    // })
}

// getUser()
//     .then((element)=>{
//         return element.name;
//     }).
//     then(name=> console.log(name))
//     .catch((error)=>console.log(error))

// const promises = [fetchPosts(), getUser()];
// Promise.all(promises)
//     .then(responses => console.log(responses))
//     .catch(err => console.log(err))



// //Promise.all- function_7
// const promises = [
    //     fetchUrl('https://jsonplaceholder.typicode.com/posts'),
    //     fetchUrl('https://jsonplaceholder.typicode.com/users'),
    //     fetchUrl('https://jsonplaceholder.typicode.com/comments')
    // ]
    // Promise.all(promises)
    //     .then(res=>res)
    //     .then(arr=>{
        //         arr.forEach(response => {
            //             console.log(response.length);
            //         });
            //     })
            //     .catch(err=>console.log(err))
            
            //promise chain- function_7
function fetchUrl(url) {
    return fetch(url).then(res=> (res.json())) 
}
function promise_7() {
    fetchUrl('https://jsonplaceholder.typicode.com/posts')
        .then(res=>{
            document.body.innerHTML+=`<div style="display: flex;"><b>Posts:</b><p>${res.length}</p></div>`;
            console.log(`Posts: ${res.length}`);
            return fetchUrl('https://jsonplaceholder.typicode.com/users')
        })
        .then(res=>{
            document.body.innerHTML+=`<div style="display: flex;"><b>Users:</b><p>${res.length}</p></div>`;
            console.log(`Users: ${res.length}`);
            return fetchUrl('https://jsonplaceholder.typicode.com/comments')
        })
        .then(res=>{
            document.body.innerHTML+=`<div style="display: flex;"><b>Comments:</b><p>${res.length}</p></div>`;
            console.log(`Comments: ${res.length}`);
        })
        .catch(err=>console.log(err));
}
// promise_7()

// function_8
const promises = [
        fetchUrl('https://jsonplaceholder.typicode.com/posts'),
        fetchUrl('https://jsonplaceholder.typicode.com/users'),
        fetchUrl('https://jsonplaceholder.typicode.com/comments')
    ]
function promise_8() {
    Promise.all(promises)
    .then(res=>res)
    .then(arr=>{
        let totalResponses=0;
        arr.forEach(response => {
            totalResponses += response.length;
        });
        document.body.innerHTML+=`<div><b>Total:</b><p>${totalResponses}</p></div>`;
    })
    .catch(err=>console.log(err))
}
// promise_8()

const users = {};
const posts = {};
function axios_0_25() {
    document.getElementById("request-status").style.display = "block";
    fetchUrl('https://jsonplaceholder.typicode.com/users')
        .then(usersArr=>{
            usersArr.forEach(user => {
                users[user.id] = user.name;
            });
            return fetchUrl('https://jsonplaceholder.typicode.com/posts');
        })
        .then(postsArr=> {
            setTimeout(()=>{
                document.getElementById("request-status").style.display = "none";
                document.getElementById("table-element").style.display = 'block'
                postsArr.forEach(post => {
                    document.getElementById("table-body").innerHTML+=
                    `<tr>
                    <td>${users[post.userId]}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                    </tr>`
                });
            },200)
        })
        .catch(e=>{
            console.log(e);
            document.getElementById("request-status").innerText = `Error: ${e}`;
        })  
}
