let budgetAmountEl = document.getElementById("budgetAmount");
let totalExpensesAmountEL = document.getElementById("totalExpensesAmount");
let balanceAmountEl = document.getElementById("balanceAmount");
let budgetInputErrMsgEl = document.getElementById("budgetInputErrMsg");
let expenseTitleInputErrMsgEl = document.getElementById(
  "expenseTitleInputErrMsg"
);
let expenseAmountInputErrMsgEL = document.getElementById(
  "expenseAmountInputErrMsg"
);

let budgetInputEL = document.getElementById("budgetInput");
let expenseTitleInputEL = document.getElementById("expenseTitleInput");
let expenseAmountInputEl = document.getElementById("expenseAmountInput");

let setBudgetBtnEl = document.getElementById("setBudgetBtn");
let addExpenseBtnEl = document.getElementById("addExpenseBtn");

let expensesHistoryEL = document.getElementById("expensesHistory");

let budgetFormEl = document.getElementById("budgetForm");
let expenseFormEl = document.getElementById("expenseForm");
let expenseCount = 0;
console.log("js file called");
budgetInputEL.addEventListener("change", function (event) {
  console.log("event", event);
  if (event.target.value === "") {
    budgetInputErrMsgEl.textContent = "*Required";
  } else {
    budgetInputErrMsgEl.textContent = "";
  }
});
expenseFormEl.addEventListener("change", function (event) {
  if (event.target.value === "") {
    expenseTitleInputErrMsgEl.textContent = "*Required";
  } else if (event.target.value === "") {
    expenseAmountInputErrMsgEL.textContent = "*Required";
  } else {
    expenseTitleInputErrMsgEl.textContent = "";
    expenseAmountInputErrMsgEL.textContent = "";
  }
});

function validateFormData() {
  if (budgetInputEL.value == "") {
    budgetInputErrMsgEl.textContent = "*Required";
    return false;
  } else {
    budgetInputErrMsgEl.textContent = "";
    return true;
  }
}

function validateFormData2() {
  if (expenseTitleInputEL.value === "") {
    expenseTitleInputErrMsgEl.textContent = "*Required";
  } else if (expenseAmountInputEl.value === "") {
    expenseAmountInputErrMsgEL.textContent = "*Required";
  } else {
    addExpenseHistory();
  }
}

function addExpenseHistory() {
  let updatedExpensesValue = totalExpensesAmountEL.textContent;
  let updatedBalanceValue = balanceAmountEl.textContent;
  expenseCount = expenseCount + 1;

  let listId = "expense" + expenseCount;
  console.log(listId);
  let delIconId = "del" + expenseAmountInputEl.value + Math.random();
  let amountSpentId = "amountSpent" + Math.random();
  let expenseItem = document.createElement("li");
  expenseItem.id = listId;

  let divItem = document.createElement("div");
  divItem.classList.add("d-flex");

  expenseItem.appendChild(divItem);

  let expenseTitle = document.createElement("p");
  expenseTitle.classList.add("list-item-margin");
  divItem.appendChild(expenseTitle);

  expenseTitle.textContent = expenseTitleInputEL.value;

  let amountSpent = document.createElement("p");
  amountSpent.id = amountSpentId;
  amountSpent.classList.add("list-item-margin");
  divItem.appendChild(amountSpent);

  amountSpent.textContent = expenseAmountInputEl.value;

  let delIconContainer = document.createElement("div");
  divItem.appendChild(delIconContainer);

  let iconContainer = document.createElement("i");
  iconContainer.classList.add("fas", "fa-trash-alt");
  divItem.appendChild(iconContainer);

  expensesHistoryEL.appendChild(expenseItem);

  iconContainer.onclick = function () {
    deleteListElement(listId, amountSpentId);
  };

  totalExpensesAmountEL.textContent =
    parseInt(updatedExpensesValue) + parseInt(expenseAmountInputEl.value);
  balanceAmountEl.textContent =
    parseInt(updatedBalanceValue) - parseInt(expenseAmountInputEl.value);
  expenseTitleInputEL.value = "";
  expenseAmountInputEl.value = "";
}

function deleteListElement(listId, amountSpentId) {
  let listIdEl = document.getElementById(listId);
  let amountSpentToBeCal = document.getElementById(amountSpentId);
  expensesHistory.removeChild(listIdEl);
  balanceAmountEl.textContent =
    parseInt(balanceAmountEl.textContent) +
    parseInt(amountSpentToBeCal.textContent);
  totalExpensesAmountEL.textContent =
    parseInt(totalExpensesAmountEL.textContent) -
    parseInt(amountSpentToBeCal.textContent);
}

function submitBudgetFormData() {
  let amount = parseInt(budgetAmountEl.textContent);
  let prevBal = parseInt(balanceAmountEl.textContent);
  console.log(prevBal);
  if (amount > 0) {
    budgetAmountEl.textContent = budgetInputEL.value;
    balanceAmountEl.textContent = budgetInputEL.value - amount + prevBal;
  } else {
    budgetAmountEl.textContent = budgetInputEL.value;
    balanceAmountEl.textContent = budgetInputEL.value;
  }
  budgetInputEL.value = "";
}

budgetFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  validateFormData();
  let bool = validateFormData();
  if (bool) {
    setBudgetBtnEl.addEventListener("click", submitBudgetFormData());
  }
  //
});
expenseFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  validateFormData2();
});
