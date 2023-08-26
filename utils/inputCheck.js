const checkInputs = (user_name, password) => {
    if (user_name == '') {
        alert('Username'); // Display an alert if the username field is empty
    } if (password == '') {
        alert('Password'); // Display an alert if the password field is empty
    }
}

module.exports = checkInputs; // Export the checkInputs function
