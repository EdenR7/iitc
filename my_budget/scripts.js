// initializations :
const totalBudget = { // Main data structure
    incomes: {
        total:0,
        descriptions:[]
    },
    expenses: {
        total:0,
        descriptions:[]
    },
    getTotalCalculation: function() {
        return Number(this.incomes.total - this.expenses.total);
    }
};
// initialize the date
const date = getDate();
document.getElementById("date").innerText = date;
function getDate(){
    const curDate = new Date();
    return `${curDate.toLocaleString('en-US', { month: 'long' })} ${curDate.getFullYear()}`;
}
// initialize the totalBudget, if there is history in the local storage it will start from there(akso the web page) 
initializeTotalBudget();
function initializeTotalBudget() {
    if ('budget' in localStorage) {
        let existBudget = JSON.parse(localStorage.getItem("budget"));
        // incomes :
        totalBudget.incomes.total = existBudget.incomes.total;
        totalBudget.incomes.descriptions = existBudget.incomes.descriptions;

        totalBudget.incomes.descriptions.forEach((incomeElement) => { // display the income cards
            addNewActionToScreen("income", incomeElement.description, incomeElement.amount);
        });
        // expenses : 
        totalBudget.expenses.total = existBudget.expenses.total;
        totalBudget.expenses.descriptions = existBudget.expenses.descriptions;
        totalBudget.expenses.descriptions.forEach((expenseElement) => { // display the expense cards
            addNewActionToScreen("expense", expenseElement.description, expenseElement.amount);
        });
        dispalyTotalBudgetUpdate(); // update the title section
        precentageUpdate(); // update all the precentage of every history expense
        matchIdToIndex(); // make sure that the id's correct and add some features
    }
}
document.getElementById("add-description").focus();


//validations
function validateDescription(){
    const element = document.getElementById("add-description");
    if (element.value == ""){
        element.style.borderColor = "red";
        element.placeholder = "Add a description first";
        return false;
    } else{
        element.style.borderColor = "";
        return true;
    }
}
function validateValueInput(){
    const element = document.getElementById("value");
    const elementValue = element.value;
    if (elementValue == "" || isNaN(elementValue) || elementValue < 0) {
        element.style.borderColor = "red";
        return false;
    } else{
        element.style.borderColor = "";
        return true;
    }
}

// adding new elements functions
function updateLocalStorage() {//update the local storage
    let totalBudgetString = JSON.stringify(totalBudget);
    localStorage.setItem('budget', totalBudgetString);
}
function addMouseEvents(elementID, isIncome) {
    let toAddFlag, toRemoveFlag;
    // in case of expenses the value wrapper conatin also the precentage so it has one more child
    isIncome ? (toAddFlag = 1, toRemoveFlag = 2) : (toAddFlag = 2, toRemoveFlag = 3); 
    const element = document.getElementById(elementID);
    const elementTargetDiv = element.children[element.children.length-1]; // The div wrapper of the new element 
    element.addEventListener('mouseover', function() {
        if (elementTargetDiv.children.length === toAddFlag) {
            elementTargetDiv.innerHTML += `<button id="cancel-btn" onclick = "removeElement(event)"></button>`;
        }
    });
    element.addEventListener('mouseleave', function() { // remove the btn when the mouse left the container
        if (elementTargetDiv.children.length === toRemoveFlag) {
            elementTargetDiv.removeChild(elementTargetDiv.lastChild);
        }
    });
}
function addNewActionToScreen(typeOfAction, description, amount){ // display the new action on the screen seperate between income to expense
    if (typeOfAction === "income"){
        let newElementHtml = `
        <div id="income-${totalBudget.incomes.descriptions.length}" class="flex-group data-card">
            <div class="description-text">${description}</div>
            <div class="value-text flex-group"><p>+ ${amount.toFixed(2)}</p></div>
        </div>`;
        document.getElementById("income").innerHTML += newElementHtml;
    } else if(typeOfAction === "expense"){
        let newElementHtml = `
        <div id="expense-${totalBudget.expenses.descriptions.length}}" class="flex-group data-card">
            <div class="description-text">${description}</div>
            <div class="value-wrapper flex-group">
              <p class="new-expense-amount">${amount.toFixed(2)}</p>
              <p class="new-expense-precentage">-%</p>
            </div>
          </div>`
        document.getElementById("expenses").innerHTML += newElementHtml;
    }
}
function updateChanges(){ // update the main object and also call the addNewActionToScreen to display the new action on the screen
    const actionDescription = document.getElementById("add-description").value;
    const actionValue = Number(document.getElementById("value").value);
    if (document.getElementById('symbol-type').value === "+") { // income
        totalBudget.incomes.total += actionValue;
        totalBudget.incomes.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
        addNewActionToScreen("income", actionDescription, actionValue);
    }else if (document.getElementById('symbol-type').value === "-") { // expense
        totalBudget.expenses.total += actionValue;
        totalBudget.expenses.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
        addNewActionToScreen("expense", actionDescription, actionValue);
    }
}
function precentageUpdate(){ // update the precentage of the expenses of the total incomes
    const totalBudgetElemnent = document.getElementById("total-precentage");
    const displayPrecentage = totalBudget.expenses.total <= totalBudget.incomes.total;
    if (displayPrecentage && totalBudget.expenses.total > 0) {
        totalBudgetElemnent.innerText = `${Math.floor((Math.abs(totalBudget.expenses.total)*100) / totalBudget.incomes.total)}%`;
    } else{
        totalBudgetElemnent.innerText = "-%";
    }
    // the precentages all the expenses elements
    const expensesPrecentageElements = document.querySelectorAll(".new-expense-precentage");
    totalBudget.expenses.descriptions.forEach((element, index) => {
        if (displayPrecentage) {
            expensesPrecentageElements[index].innerText = `${Math.floor(Math.abs(element.amount*100) / totalBudget.incomes.total)}%`;
        }else{
            expensesPrecentageElements[index].innerText = '-%'
        }
    });
    
}
function dispalyTotalBudgetUpdate(){ 
    // updating the total incomes and the total expenses
    document.getElementById("current-incomes").innerHTML=`+ ${totalBudget.incomes.total.toFixed(2)}`;
    document.getElementById("current-expenses").innerHTML= `- ${Math.abs(totalBudget.expenses.total).toFixed(2)}`;
     // update the total budget
    if (totalBudget.getTotalCalculation() >= 0) {
        document.getElementById("total-budget").innerHTML = `+ ${totalBudget.getTotalCalculation().toFixed(2)}`;
    }else{
        document.getElementById("total-budget").innerHTML = `- ${Math.abs(totalBudget.getTotalCalculation()).toFixed(2)}`;
    }
}
function matchIdToIndex() { // important function to keep the input/expense elements in the right order 
    
    const incomeElements = Array.from(document.querySelector("#income").children);
    const expensesElements = Array.from(document.querySelector("#expenses").children);

    // iterate over all the expenses/incomes elements, make sure that they id's match their indexes, change every second element bgc
    incomeElements.slice(1).forEach((element, index) => {
        element.id = `income-${index+1}`; // include the title h3 of each div at index 0
        index % 2 === 1 ? element.style.backgroundColor = "hsl(0, 0%, 97%)": element.style.backgroundColor = "";
        addMouseEvents(element.id, isIncome = true); 
    });
    expensesElements.slice(1).forEach((element, index) => {
        element.id = `expense-${index+1}`; // include the title h3 of each div at index 0
        index % 2 === 1 ? element.style.backgroundColor = "hsl(0, 0%, 97%)": element.style.backgroundColor = "";
        addMouseEvents(element.id, isIncome = false);
    });
}
function submitInput(){ // new action by the user
    if (validateDescription() && validateValueInput()) {
        updateChanges();
        dispalyTotalBudgetUpdate();
        precentageUpdate(); // Always updating the existing precentage of the expenses
        matchIdToIndex();
        updateLocalStorage();
        document.getElementById("add-description").value = "";
        document.getElementById("value").value = "";
        document.getElementById("add-description").focus();
        
    }
}

// adding the options to press enter to activate the button
document.getElementById("value").addEventListener("keydown", function(event){ // adding the option to submit by presseing enter
    if (event.key === 'Enter') {
        submitInput();
    }
});
document.getElementById("add-description").addEventListener("keydown", function(event){ // by pressing enter it will move you to the value field
    if (event.key === 'Enter') {
        document.getElementById("value").focus();
    }
});

// removing elements and updating functions
function removeElementFromObject(ancestorID, elementIndex) {
    elementIndex --; // because the title is also a child, the count of the element indexes in the dom is from 1 and not 0;
    let elementValue;
    if(ancestorID == 'income'){
        elementValue = totalBudget.incomes.descriptions[elementIndex].amount;
        totalBudget.incomes.descriptions.splice(elementIndex, 1);
        totalBudget.incomes.total -= elementValue;
    } else{
        elementValue = totalBudget.expenses.descriptions[elementIndex].amount;
        totalBudget.expenses.descriptions.splice(elementIndex, 1);
        totalBudget.expenses.total -= elementValue;
    }
    updateLocalStorage();
}
function removeElement(event){
    // get access to the desired ancestors
    const elementToRemove = event.target.parentNode.parentNode;
    const elementToRemoveAncestor = elementToRemove.parentNode;
    const elementIndex = (elementToRemove.id.split('-')[1]);
    // update the main object, remove the element;
    removeElementFromObject(elementToRemoveAncestor.id, elementIndex)
    // remove the element from the dom
    elementToRemoveAncestor.removeChild(elementToRemoveAncestor.children[elementIndex]);
    matchIdToIndex();
    //update the values displayed on the screen (total, total incomes/expenses);
    dispalyTotalBudgetUpdate();
    // iterate over all the expenses (if exist) and update the precentages;
    precentageUpdate();
}

//Change the form style in case of typing new input or new expense
document.getElementById('symbol-type').addEventListener('change', function(){ // change the check mark and the colors of the form
    if (this.value === '+') {
        incomeInputdisplay();
    } else if (this.value === '-') {
        expensesInputdisplay();
    }
})
function incomeInputdisplay() {
    const elementsToChange = document.querySelectorAll(".expense-field");
    elementsToChange.forEach((element) => {
        element.classList.remove(element.classList.item(0));
        element.classList.add("income-field");
    });
    const btnElement = document.querySelector(".img-container");
    btnElement.innerHTML = '<img src="img/green_checkmark.jpeg" alt="green check mark" />';
}
function expensesInputdisplay() {
    const elementsToChange = document.querySelectorAll(".income-field");
    elementsToChange.forEach((element) => {
        element.classList.remove(element.classList.item(0));
        element.classList.add("expense-field");
    });

    const btnElement = document.querySelector(".img-container");
    btnElement.innerHTML = '<img src="img/red_checkmark.jpeg"  alt="red check mark" />';
}
