const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 1, text: "Udemy", amount: -10 },
  { id: 1, text: "Camera", amount: 150 }
]

let transactions = dummyTransactions;

/** Add transactions to DOM list */
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // 既に負の記号がついているため、絶対値に変換する
  item.innerHTML = `
  ${transaction.text}
  <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn">x</button>
  `

  list.appendChild(item)
}

/** Update balance, income and expense */
function updateValues() {
  const amounts = transactions.map(transaction =>  transaction.amount )

  const total = amounts
                  .reduce( (acc, item) => (acc += item), 0)
                  .toFixed(2);
  const income = amounts
                  .filter(item => item > 0)
                  .reduce((acc, item) => (acc += item), 0)
                  .toFixed(2);
  const expense = amounts
                  .filter(item => item < 0)
                  // マイナスを消すため絶対値にする
                  .reduce((acc, item) => (acc += Math.abs(item)), 0)
                  .toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `-$${expense}`;
}

/** Init app */
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues()
}

init()