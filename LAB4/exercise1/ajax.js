const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const loading = document.getElementById("loading");
const form = document.getElementById("registerForm");

let isUsernameAvailable = false;

// Real-time checking when user types
usernameInput.addEventListener("keyup", function () {

    const username = usernameInput.value.trim();

    if (username === "") {
        feedback.textContent = "";
        return;
    }

    loading.style.display = "block";
    feedback.textContent = "";

    // AJAX request using Fetch API
    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            loading.style.display = "none";

            if (data.usernames.includes(username.toLowerCase())) {
                feedback.textContent = "Username already taken";
                feedback.className = "taken";
                isUsernameAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.className = "available";
                isUsernameAvailable = true;
            }
        })
        .catch(error => {
            loading.style.display = "none";
            feedback.textContent = "Error checking username";
            feedback.className = "taken";
        });
});

// Prevent form submission if username unavailable
form.addEventListener("submit", function (event) {

    if (!isUsernameAvailable) {
        event.preventDefault();
        alert("Please choose an available username before submitting!");
    } else {
        alert("Registration Successful!");
    }
});
