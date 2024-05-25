function pause(sleepMs) {
    return new Promise(resolve => {
        setTimeout(resolve, sleepMs);
    })
}

async function async_1() {
    console.log(new Date());
    await pause(5000);
    console.log(new Date());
}
// async_1()

const f1 = () => console.log('f1 called');
const f2 = () => console.log('f2 called');
const f3 = () => console.log('f3 called');
async function async_2() {
    await pause(3000);
    f1();
    await pause(5000);
    f2();
    await pause(5000);
    f3();
}
// async_2()

function fetchUrl(url) {
    return axios.get(url).then(res=>res.data)
}
async function promise_7() {
    const posts = await fetchUrl('https://jsonplaceholder.typicode.com/posts')
    document.body.innerHTML+=`<div style="display: flex;"><b>Posts:</b><p>${posts.length}</p></div>`;
    const users = await fetchUrl('https://jsonplaceholder.typicode.com/users')
    document.body.innerHTML+=`<div style="display: flex;"><b>Posts:</b><p>${users.length}</p></div>`;
    const comments = await fetchUrl('https://jsonplaceholder.typicode.com/comments')
    document.body.innerHTML+=`<div style="display: flex;"><b>Posts:</b><p>${comments.length}</p></div>`;
}
// promise_7()

async function promise_8() {
    const posts = await fetchUrl('https://jsonplaceholder.typicode.com/posts')
    const users = await fetchUrl('https://jsonplaceholder.typicode.com/users')
    const comments = await fetchUrl('https://jsonplaceholder.typicode.com/comments')
    document.body.innerHTML+=`<div style="display: flex;"><b>Total:</b><p>${posts.length+users.length+comments.length}</p></div>`;

}
// promise_8()
