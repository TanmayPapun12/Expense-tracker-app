document.addEventListener('DOMContentLoaded', () => {
  loadExpenses();
});

function addExpense() {
  const expenseName = document.getElementById('expenseName').value;
  const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

  if (!expenseName || isNaN(expenseAmount)) {
    alert('Please enter valid expense details.');
    return;
  }

  const expense = {
    name: expenseName,
    amount: expenseAmount,
  };

  saveExpense(expense);
  loadExpenses();
  clearForm();
}

function saveExpense(expense) {
  let expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

function loadExpenses() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  const expenses = getExpenses();

  if (expenses.length === 0) {
    expenseList.innerHTML = '<p>No expenses recorded.</p>';
  } else {
    expenses.forEach((expense, index) => {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <span>${expense.name}: $${expense.amount.toFixed(2)}</span>
        <button onclick="deleteExpense(${index})">Delete</button>
      `;
      expenseList.appendChild(expenseItem);
    });
  }
}

function deleteExpense(index) {
  let expenses = getExpenses();
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  loadExpenses();
}

function clearForm() {
  document.getElementById('expenseForm').reset();
}
