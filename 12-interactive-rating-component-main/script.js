const rateContainer = document.querySelector(".rate-container");
const tyContainer = document.querySelector(".thank-you-container");
const rateButtons = rateContainer.querySelector(".rate-buttons");

rateButtons.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
        rateButtons.dataset.active = event.target.dataset.rate;
    }
})

document.querySelector('form button[type="submit"]').addEventListener("click", (event) => {
    event.preventDefault();
    if (rateButtons.dataset.active) {
        rateContainer.classList.add("hidden");
        rateContainer.setAttribute("aria-hidden", "true");
        tyContainer.classList.remove("hidden");
        tyContainer.removeAttribute("aria-hidden");
        const chip = tyContainer.querySelector("p.chip");
        chip.querySelector("#selected-rate").innerText = rateButtons.dataset.active;
        chip.focus();
    }
})