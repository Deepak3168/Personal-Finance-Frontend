document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get values from the form
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    // Prepare data to send
    const expenseData = {
        name: name,
        amount: amount,
        category: category
    };

    // Make a POST request to the Flask API
    fetch('https://expensetrackerapi-mwui.onrender.com/expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success (optional: display success message, clear the form, etc.)
        console.log('Success:', data.message);
        console.log(data.message)
        alert(` ${data.message}`);

        // Optionally clear the form
        document.getElementById('expenseForm').reset();
    })
    .catch((error) => {
        // Handle errors (optional: display error message)
        console.error('Error:', error);
        alert('Failed to add expense!');
    });
});
