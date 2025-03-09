document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer dynamically
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header not found");
            return response.text();
        })
        .then(data => document.getElementById("header").innerHTML = data)
        .catch(error => console.error("Error loading header:", error));

    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer not found");
            return response.text();
        })
        .then(data => document.getElementById("footer").innerHTML = data)
        .catch(error => console.error("Error loading footer:", error));

    // Form Validation
    let form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            let errorMessage = "";
            let mobile = document.getElementById("mobile")?.value.trim();
            let password = document.getElementById("password")?.value.trim();
            let errorContainer = document.getElementById("error-message");

            if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
                errorMessage += "Mobile number must be exactly 10 digits.<br>";
            }

            if (!password || password.length < 6) {
                errorMessage += "Password must be at least 6 characters long.<br>";
            } else if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
                errorMessage += "Password must include at least one uppercase letter, one number, and one special character (@$!%*?&).<br>";
            }

            if (errorMessage) {
                event.preventDefault();
                if (errorContainer) errorContainer.innerHTML = errorMessage;
            }
        });
    }
});
