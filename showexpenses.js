// Function to fetch expenses for a specific month
function fetchExpenses(month) {
    // Format the month to be in capitalized form for API (e.g., 'january' -> 'January')
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    // Make a GET request to fetch expenses for the selected month
    fetch(`https://expensetrackerapi-mwui.onrender.com/expenses/month?month=${formattedMonth}`)
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            const tableBody = document.getElementById('expenses-table-body');

            // Clear the existing table rows
            tableBody.innerHTML = '';

            // If data is available, populate the table
            if (data.length > 0) {
                data.forEach((expense, index) => {
                    // Create a new row for each expense
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${expense.category}</td>
                        <td>${expense.name}</td>
                        <td>₹${expense.amount}</td>
                        <td>${expense.date}</td>
                        <td>${expense.time}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                // If no expenses for the selected month, show a message
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No expenses found for ${formattedMonth}</td>`;
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
}

// Event listener to trigger expense fetch when the month is changed
document.getElementById('month').addEventListener('change', function() {
    const selectedMonth = this.value;
    fetchExpenses(selectedMonth);
});

// Initial fetch for January expenses on page load
window.onload = function() {
    fetchExpenses('january');
};
