const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const dismissBtn = document.getElementById("dismiss-btn");

let isError = false;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (isValidEmail(emailInput.value)) {
        emailInput.value = "";
        document.getElementById("success-container").classList.remove("hidden");
        document.getElementById("sign-up-container").classList.add("hidden");
    } else {
        const errorMessage = document.getElementById("email-error");
        errorMessage.classList.add("error");
        errorMessage.classList.remove("hidden");
        document.getElementById("email").classList.add("error");
        isError = true;
    }
});

emailInput.addEventListener("input", () => {
    if (isError) {
        const errorMessage = document.getElementById("email-error");
        errorMessage.classList.remove("error");
        errorMessage.classList.add("hidden");
        document.getElementById("email").classList.remove("error");
        isError = false;
    }
});

dismissBtn.addEventListener("click", () => {
    document.getElementById("success-container").classList.add("hidden");
    document.getElementById("sign-up-container").classList.remove("hidden");
});