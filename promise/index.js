const promiseResponse = (delay) =>
    {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            delay <= 2000 ? resolve("Success") : reject("Failure")
        }, delay)
    })
}

document.getElementById("s").addEventListener('click', ()=>{
    promiseResponse(2000)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
})
document.getElementById("f").addEventListener('click', ()=>{
    promiseResponse(3000)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
})



