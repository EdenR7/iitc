let totalBudget = { // Main data structure
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


const date = getDate();
document.getElementById("date").innerText = date;
function getDate(){
    const curDate = new Date();
    return `${curDate.toLocaleString('en-US', { month: 'long' })} ${curDate.getFullYear()}`;
}


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

function addNewAction(typeOfAction, description, amount){ // display the new action on the screen seperate between income to expense
    if (typeOfAction === "income"){
        let newElementHtml = `
        <div id="income-${totalBudget.incomes.descriptions.length}" class="flex-group data-card">
            <div class="description-text">${description}</div>
            <div class="value-text">+ ${amount.toFixed(2)}</div>
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
function updateChanges(){ // update the main object and also call the addNewAction to display the new action on the screen
    const actionDescription = document.getElementById("add-description").value;
    const actionValue = Number(document.getElementById("value").value);
    if (document.getElementById('symbol-type').value === "+") { // income
        totalBudget.incomes.total += actionValue;
        totalBudget.incomes.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
        addNewAction("income", actionDescription, actionValue);
    }else if (document.getElementById('symbol-type').value === "-") { // expense
        totalBudget.expenses.total += actionValue;
        totalBudget.expenses.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
        addNewAction("expense", actionDescription, actionValue);
    }
}
function precentageUpdate(){
    const totalBudgetElemnent = document.getElementById("total-precentage");
    const displayPrecentage = totalBudget.expenses.total <= totalBudget.incomes.total;
    if (displayPrecentage && totalBudget.expenses.total > 0) {
        totalBudgetElemnent.innerText = `${Math.floor((Math.abs(totalBudget.expenses.total)*100) / totalBudget.incomes.total)}%`;
    } else{
        totalBudgetElemnent.innerText = "-%";
    }
    const expensesPrecentageElements = document.querySelectorAll(".new-expense-precentage")
    totalBudget.expenses.descriptions.forEach((element, index) => {
        if (displayPrecentage) {
            expensesPrecentageElements[index].innerText = `${Math.floor(Math.abs(element.amount*100) / totalBudget.incomes.total)}%`;
        }else{
            expensesPrecentageElements[index].innerText = '-%'
        }
    });
    
}
function dispalyTotalBudgetUpdate(){
    document.getElementById("current-incomes").innerHTML=`+ ${totalBudget.incomes.total.toFixed(2)}`;
    document.getElementById("current-expenses").innerHTML= `- ${Math.abs(totalBudget.expenses.total).toFixed(2)}`;
    if (totalBudget.getTotalCalculation() > 0) { 
        document.getElementById("total-budget").innerHTML = `+ ${totalBudget.getTotalCalculation().toFixed(2)}`;
    }else{
        document.getElementById("total-budget").innerHTML = `- ${Math.abs(totalBudget.getTotalCalculation()).toFixed(2)}`;
    }
}
function matchIdToIndex() { // make sure the id's of each element still match its index in case of change, also colored the bgc of each second element

    // both include the title h3 of each div at index 0
    const incomeElements = Array.from(document.querySelector("#income").children);
    const expensesElements = Array.from(document.querySelector("#expenses").children);
    incomeElements.forEach((element, index) => {
        index === 0 ? element.id = `incomes-title` : element.id = `income-${index}`; 
        if(index % 2 === 0 && index > 0){
            element.style.backgroundColor = "hsl(0, 0%, 97%)"
        }
    });
    expensesElements.forEach((element, index) => {
        index === 0 ? element.id = `expenses-title` : element.id = `expense-${index}`; 
        if(index % 2 === 0 && index > 0){
            element.style.backgroundColor = "hsl(0, 0%, 97%)"
        }
    });
}
function submitInput(){ // new action by the user
    if (validateDescription() && validateValueInput()) {
        updateChanges();
        dispalyTotalBudgetUpdate();
        precentageUpdate(); // Always updating the existing precentage of the expenses
        matchIdToIndex();
        document.getElementById("add-description").value = "";
        document.getElementById("value").value = "";
    }
}
document.getElementById("value").addEventListener("keydown", function(event){ // adding the option to submit by presseing enter
    if (event.key === 'Enter') {
        submitInput();
    }
});
document.getElementById("add-description").addEventListener("keydown", function(event){ // adding the option to submit by presseing enter
    if (event.key === 'Enter') {
        submitInput();
    }
});

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
    btnElement.innerHTML = '<img src="img/check-mark-symbol-tick.jpg" alt="green check mark" />';
    btnElement.style.borderColor = "green";
}
function expensesInputdisplay() {
    const elementsToChange = document.querySelectorAll(".income-field");
    elementsToChange.forEach((element) => {
        element.classList.remove(element.classList.item(0));
        element.classList.add("expense-field");
    });

    const btnElement = document.querySelector(".img-container");
    btnElement.innerHTML = '<img src="img/red-tick-checkmark-icon.jpg"  alt="red check mark" />';
    btnElement.style.borderColor = "red";
}

// add the edit option
// make it responsive 