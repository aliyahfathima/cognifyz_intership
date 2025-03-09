document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer dynamically
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    // Form Validation
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        let errorMessage = "";
        let mobile = document.getElementById("mobile").value;
        let password = document.getElementById("password").value;
        
        if (mobile.length !== 10) {
            errorMessage += "Mobile number must be 10 digits.<br>";
        }

        if (password.length < 6) {
            errorMessage += "Password must be at least 6 characters long.<br>";
        }

        if (errorMessage) {
            event.preventDefault();
            document.getElementById("error-message").innerHTML = errorMessage;
        }
    });
});
