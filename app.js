let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const balanceEl = document.getElementById("balance");
const transactionsList = document.getElementById("transactionsList");

function updateBalance() {
  const total = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  balanceEl.innerText = `${total}`;
}

function addTransaction() {
  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);

  if (description === "" || isNaN(amount) || amount === 0) {
    alert("Please Enter valid details.");
    return;
  }

  const transaction = { id: Date.now(), description, amount };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactions() {
  transactionsList.innerText = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.innerHTML = `${transaction.description} <span>₹${transaction.amount}</span>
        <button onclick="deleteTransaction(${transaction.id})" class="closeBtn">X</button>`;
    if (transaction.amount < 0) {
      li.style.backgroundColor = "#ffcccc";
    } else {
      li.style.backgroundColor = "#ccffcc";
    }
    transactionsList.appendChild(li);
  });

  updateBalance();
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.style.display = transactions.length > 0 ? "block" : "none";
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function clearAll() {
  const userConfirmed = window.confirm(
    "Are you sure you want to delete all transactions?"
  );
  if (!userConfirmed) {
    return;
  }
  transactions = [];
  localStorage.removeItem("transactions");
  renderTransactions();
}

window.onload = renderTransactions;
