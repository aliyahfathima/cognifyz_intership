document.addEventListener("DOMContentLoaded", function () {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let chartInstance = null;

    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateChart() {
        let categories = ["Food", "Travel", "Shopping", "Bills", "Other"];
        let data = categories.map(cat =>
            expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
        );

        let ctx = document.getElementById("expenseChart").getContext("2d");

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "pie",
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"]
                }]
            }
        });
    }

    function updateUI() {
        let expenseList = document.getElementById("expenseList");
        expenseList.innerHTML = "";

        let totalIncome = 50000;
        let totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        let balance = totalIncome - totalExpenses;

        document.getElementById("totalIncome").textContent = `₹${totalIncome}`;
        document.getElementById("totalExpenses").textContent = `₹${totalExpenses}`;
        document.getElementById("balance").textContent = `₹${balance}`;

        expenses.forEach((expense, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">🗑️</button></td>
            `;
            expenseList.appendChild(row);
        });

        saveExpenses();
        updateChart();
    }

    document.getElementById("expenseForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("expenseName").value.trim();
        let amount = parseFloat(document.getElementById("expenseAmount").value);
        let category = document.getElementById("expenseCategory").value;

        if (name === "" || isNaN(amount) || amount <= 0) {
            alert("Please enter valid expense details.");
            return;
        }

        expenses.push({ name, amount, category });
        updateUI();

        document.getElementById("expenseForm").reset();
    });

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        updateUI();
    };

    updateUI();
});
