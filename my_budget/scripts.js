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
function updateChanges(){
    const actionDescription = document.getElementById("add-description").value;
    const actionValue = Number(document.getElementById("value").value);
    if (document.getElementById('symbol-type').value === "+") { // income
        totalBudget.incomes.total += actionValue;
        totalBudget.incomes.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
    }else if (document.getElementById('symbol-type').value === "-") { // expense
        totalBudget.expenses.total += actionValue;
        totalBudget.expenses.descriptions.push({
            description: actionDescription,
            amount: actionValue
        });
    }
}
function calculatePrecentage(){
    if (totalBudget.expenses.total < totalBudget.incomes.total && totalBudget.expenses.total > 0) {
        return Math.round((Math.abs(totalBudget.expenses.total)*100) / totalBudget.incomes.total);
    } else{
        return "-";
    }
}
function dispalyTotalBudgetUpdate(){
    document.getElementById("current-incomes").innerHTML=`+ ${totalBudget.incomes.total.toFixed(2)}`;
    document.getElementById("current-expenses").innerHTML=`- ${Math.abs(totalBudget.expenses.total).toFixed(2)} <span id="precentage">${calculatePrecentage()}%</span>`;

    if (totalBudget.getTotalCalculation() > 0) { 
        document.getElementById("total-budget").innerHTML = `+ ${totalBudget.getTotalCalculation().toFixed(2)}`;
    }else{
        document.getElementById("total-budget").innerHTML = `- ${Math.abs(totalBudget.getTotalCalculation()).toFixed(2)}`;
    }
}
function submitInput(){
    if (validateDescription() && validateValueInput()) {
        updateChanges();
        dispalyTotalBudgetUpdate();
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


document.getElementById('symbol-type').addEventListener('change', function(){ // change the check mark and the colors of the form
    if (this.value === '+') {
        incomeInputdisplay();
    } else if (this.value === '-') {
        expensesInputdisplay();
    }
})
function incomeInputdisplay() {
    const elementsToChange = [document.querySelector("select"), document.getElementById("add-description"), document.getElementById("value")]
    elementsToChange.forEach((element) => {
        element.classList.remove(element.classList.item(0));
        element.classList.add("income-field");
    });
    const btnElement = document.querySelector(".img-container");
    btnElement.innerHTML = '<img src="img/check-mark-symbol-tick.jpg" alt="green check mark" />';
    btnElement.style.borderColor = "green";
}
function expensesInputdisplay() {
    const elementsToChange = [document.querySelector("select"), document.getElementById("add-description"), document.getElementById("value")]
    elementsToChange.forEach((element) => {
        element.classList.remove(element.classList.item(0));
        element.classList.add("expense-field");
    });

    const btnElement = document.querySelector(".img-container");
    btnElement.innerHTML = '<img src="img/red-tick-checkmark-icon.jpg"  alt="red check mark" />';
    btnElement.style.borderColor = "red";
}
