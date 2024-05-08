const quizObject = localStorage.getItem("current-quiz")?JSON.parse(localStorage.getItem("current-quiz")):{};
for (const key in quizObject) { // mark the prev user answers according to local storage
    const ansIndex = quizObject[key];
    document.getElementById(key).lastElementChild.children[ansIndex-1].firstElementChild.style.borderColor = "black"; // its long because I navigate inside the html element
}
const answers = {
    "q-1": 1,
    "q-2": 3,
    "q-3": 2,
    "q-4": 1,
    "q-5": 1,
    "q-6": 2,
    "q-7": 1,
    "q-8": 2,
    "q-9": 1,
    "q-10": 2
}
answersOptions = document.querySelectorAll(".answer-option"); // add the onclick method to each answer option
for (const element of answersOptions){
    element.addEventListener("click", ()=>{
        const questionID = element.parentElement.parentElement.parentElement.id;
        const answerIndex =  getAnsIndex(element)
        updateAnswer(questionID, answerIndex);
        markAnswer(element);
    })
}

function getAnsIndex(element) {
    const childrenArray = Array.from(element.parentElement.parentElement.children);
    for (let index = 0; index < childrenArray.length; index++) {
        if(childrenArray[index].innerText === element.innerText){
            return index+1;
        }
    }
}
function updateAnswer(questionID, answerIndex) {
    quizObject[questionID] = answerIndex;
    localStorage.setItem("current-quiz", JSON.stringify(quizObject));
}
function markAnswer(element) {
    const childrenArray = Array.from(element.parentElement.parentElement.children);
    for (let index = 0; index < childrenArray.length; index++) {
        const childText = childrenArray[index].innerText;
        if(childText === element.innerText){
            childrenArray[index].firstElementChild.style.borderColor = "black";
        } else{
            childrenArray[index].firstElementChild.style.borderColor = "hsl(0, 0%, 93%)";
        }
    }
}

function submitQuiz() {
    if (isQuizFull()) {
        fullQuiz__display(countCorrectAnswers());
        colorAnswers();
        // clear local Storage
        localStorage.removeItem("current-quiz")
    }else{
        quizNotFull__display();
    }
    document.querySelector(".overlay-message").style.display = "flex";
    document.querySelector(".main-container").style.opacity = ".25";
}
function isQuizFull() {
    for (let index = 1; index <= 10; index++) {
        if (!quizObject.hasOwnProperty(`q-${index}`)) {
            return false;
        }
    }
    return true;
}
function closeMessage(){
    document.querySelector(".overlay-message").style.display = "none";
    document.querySelector(".main-container").style.opacity = "1";
}
function quizNotFull__display() {
    document.querySelector(".overlay-message").innerHTML = `
    <h2>You must answer all the questions first !</h2>
    <button id="close-message" class="btn" onclick="closeMessage()">
      got it
    </button>`
}
function fullQuiz__display(correctAns) {
    document.querySelector(".overlay-message").innerHTML = `
    <h2>Your score is: <span id="quiz-score"> ${correctAns} </span>/10 </h2>
      <button id="close-message" class="btn" onclick="closeMessage()">
        got it
      </button>`
}
function countCorrectAnswers() {
    let correctAns = 0;
    for (const key in quizObject) { 
        quizObject[key] == answers[key] ? correctAns ++ : correctAns += 0;
    }
    return correctAns;
}
function colorAnswers() {
    for (const key in quizObject) { 
        document.getElementById(key).lastElementChild.children[(answers[key])-1].firstElementChild.style.borderColor = "hsl(0, 0%, 93%)";
        document.getElementById(key).lastElementChild.children[(answers[key])-1].firstElementChild.style.color = "hsl(120, 100%, 40%)";
        const ans = quizObject[key];
        if (!checkAnswer(key, ans)) { // incorrect
            document.getElementById(key).lastElementChild.children[ans-1].firstElementChild.style.borderColor = "hsl(0, 0%, 93%)";
            document.getElementById(key).lastElementChild.children[ans-1].firstElementChild.style.color = "hsl(359, 93%, 61%)";
        }
    }
} 
// colorAnswers();
function checkAnswer(q, ans) {
    // ans == answers[q] ? console.log(true): console.log(false);
    return ans == answers[q] ? true: false;
}
