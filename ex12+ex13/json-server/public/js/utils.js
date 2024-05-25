document.querySelector('.close-overlay').addEventListener('click',(event)=>{
    event.target.parentElement.style.display="none";
    document.querySelector("main").style.opacity = 1;
})

const closeFormBtns = document.querySelectorAll('.close-form')
closeFormBtns.forEach(btn=>{
    btn.addEventListener("click", (event)=>{
        event.target.parentElement.style.display="none";
    })
})
