let incomeEntries = [];
let expenseEntries = [];
let savingsGoal = [];

const incmSrc = document.getElementById('incm_src');
const income = document.getElementById('incm');
const expensecause = document.getElementById('exp_reason');
const expAmnt = document.getElementById('exp_amt');
const savcause = document.getElementById('sav_goal')
const tarAmnt = document.getElementById('tar_amt');
const incomeBtn = document.getElementById('incomebtn');
const expBtn = document.getElementById('expbtn');
const savBtn = document.getElementById('savbtn');
incomeBtn.addEventListener("click",function(){
    const incm = parseFloat(income.value);
    const desc = incmSrc.value;
    if(desc!=="" && incm>0){
        addincome(incm,desc);
    }
    else{
        alert("Please enter valid inputs");
    }
});
function addincome(incm,desc){
    const incomeDtls = {
        source : desc,
        amount : incm
    };
    incomeEntries.push(incomeDtls);
    alert("income added succesfully");
   // console.log(incm);
    //console.log(desc);
    incmSrc.value ="";
    income.value ="";
    console.log(incomeEntries);
    displayIncomes();
}
function displayIncomes() {
    const incomeList = document.getElementById('incomelists');
    incomeList.innerHTML = '';
    incomeEntries.forEach((income,index) => {
        const li = document.createElement('li');
        li.textContent = `${income.source}: $${income.amount} `;
        incomeList.appendChild(li);
    });
    updateIncomeSummary();
}
function calculateTotalIncome(){
    let totalIncome = 0;
    incomeEntries.forEach((income,index)=>{
        totalIncome += income.amount;
    });
    return totalIncome;
}
function updateIncomeSummary(){
   const totalIncome = calculateTotalIncome();
   console.log(totalIncome);
    const totalIncomeElement = document.querySelector('#summary p:nth-of-type(1)');
    totalIncomeElement.textContent = `Total income: $${totalIncome}`;

}


expBtn.addEventListener("click",function(){
    const expAmount = parseFloat(expAmnt.value);
    const expCause = expensecause.value;
    if(expCause!=="" && expAmount>0){
        addExpense(expAmount,expCause);
    }
});
function addExpense(expAmount,expCause){
    const expDtls = {
        cause : expCause,
        amount: expAmount
    };
    expenseEntries.push(expDtls);
    console.log(expenseEntries);
    alert("Expenses added succesfully");
   // console.log(incm);
    //console.log(desc);
    expensecause.value ="";
    expAmnt.value ="";
    displayExpenses();
}
function displayExpenses(){
    const expenseList = document.getElementById('expenselists');
    expenseList.innerHTML = '';
    expenseEntries.forEach((expense,index) =>{
        const li = document.createElement('li');
        li.textContent = `${expense.cause}: $${expense.amount}`;
        console.log(expenseList);
        expenseList.appendChild(li);
    });
    updateExpenseSummary();
}
function calculateTotalExpenses(){
    let totalExpenses = 0;
    expenseEntries.forEach((expense) =>{
        totalExpenses +=expense.amount;
    });
    return totalExpenses;
}

function updateExpenseSummary (){
    const totalExpenses = calculateTotalExpenses();
    const totalExpenseElement = document.querySelector('#summary p:nth-of-type(2)');
    totalExpenseElement.textContent = `Total expenses: $${totalExpenses}`;
}


savBtn.addEventListener("click",function(){
    const tarAmount = parseFloat(tarAmnt.value);
console.log("Target Amount here:", tarAmount);
    const savCause = savcause.value;
    if(savCause!=="" && tarAmount>0){
        setGoal(tarAmount,savCause);
    }
});
function setGoal(tarAmount,savCause){
    const savDtls = {
        cause : savCause,
        amount : tarAmount
    };
    savingsGoal.push(savDtls);
    console.log(savingsGoal);
    alert("Target goal is added succesfully");
   // console.log(incm);
    //console.log(desc);
    // tarAmnt.value = "";
    // savcause.value = "";
    displayGoal();
}
function displayGoal(){
    const goal = document.getElementById('savingsgoal');
    
    savingsGoal.forEach((savings,imddex) =>{
        const li = document.createElement('li');
        li.textContent = `${savings.cause} : $${savings.amount}`;
        goal.appendChild(li);
    });
    updateSavingsSummary();
}

function calculateSavings(){
    let savings = calculateTotalIncome()-calculateTotalExpenses();
    return savings;
}

function updateSavingsSummary(){
    const savings = calculateSavings();
    const tarAmount = parseFloat(tarAmnt.value);
    console.log("Current Savings:", savings);
console.log("Target Amount:", tarAmount);
    const savingsElement = document.querySelector('#summary p:nth-of-type(3)');
    if(savings>tarAmount){
    savingsElement.textContent = `Congratulations, You have achieved it.Your savings(${savings}) have crossed your savings goal(${tarAmount}).You have saved ${savings-tarAmount} more`;
    }
    else if(savings===tarAmount){
       savingsElement.textContent = `Congratulations, You have achieved it.Your savings(${savings}) have crossed your savings goal(${tarAmount}).`; 
    }
    else{
        savingsElement.textContent = `You need ${tarAmount-savings} more to achieve your savings goal`;
    }
    tarAmnt.value = "";
    savcause.value = "";
}

