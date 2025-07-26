const form = document.getElementById("form");
const tipInput = document.getElementById("tip-input");
const resetButton = document.getElementById("reset-button");

const rules = {
    bill: val => {
        if (val) {
            if (isNaN(Number(val)))
                return {valid: false, message: "Enter a valid number"}
            if (val <= 0)
                return {valid: false, message: "Can't be zero or less than zero"};
            return {valid: true, message: ""};
        } else
            return {valid: false, message: "Required"}
    },
    rate: val => {
        if (val) {
            if (isNaN(Number(val)))
                return {valid: false, message: "Enter a valid number"}
            if (val <= 0 || val >= 100)
                return {valid: false, message: "Enter a value between 0 and 100"};
            return {valid: true, message: ""};
        } else
            return {valid: false, message: "Required"}
    },
    people: val => {
        if (val) {
            if (isNaN(Number(val)))
                return {valid: false, message: "Enter a valid number"}
            if (val <= 0)
                return {valid: false, message: "Can't be zero or less than zero"};
            return {valid: true, message: ""};
        } else
            return {valid: false, message: "Required"}
    }
}

const formInputs = {
    bill: {
        message: document.querySelector(".bill-input .error-message"),
        input: document.querySelector(".bill-input input")
    },
    rate: {
        message: document.querySelector(".tip-rate .error-message"),
        input: null
    },
    people: {
        message: document.querySelector(".people-input .error-message"),
        input: document.querySelector(".people-input input")
    }
}

function getData() {
    let data = Object.fromEntries(new FormData(form).entries());
    if (tipInput.dataset.active !== "custom")
        data.rate = tipInput.dataset.active;
    else
        data.rate = data.customRate;
    return data;
}

function validate(data) {
    let isValid = true;
    for (const [key, value] of Object.entries(data)) {
        const check = rules[key] ? rules[key](value) : null;
        if (check && !check.valid) {
            const formInput = formInputs[key];
            formInput.message.innerText = check.message;
            formInput.message.classList.remove("hide");
            if (formInput.input)
                formInput.input.classList.add("error");
            isValid = false;
        }
    }
    return isValid;
}

function validationReset(inputs) {
    for (const [key, value] of Object.entries(inputs)) {
        const formInput = formInputs[key];
        formInput.message.classList.add("hide");
        formInput.message.innerText = "";
        if (formInput.input)
            formInput.input.classList.remove("error");
    }
}

function calculate(data) {
    const tip = data.bill * (data.rate / 100);
    const tipPerPerson = tip / data.people;
    const totalPerPerson = (Number(data.bill) + tip) / data.people;
    document.getElementById("tip-amount").querySelector(".amount").innerText = "$" + tipPerPerson.toFixed(2);
    document.getElementById("total").querySelector(".amount").innerText = "$" + totalPerPerson.toFixed(2);
}

function onFormChange() {
    validationReset(formInputs);
    let data = getData();
    if (validate(data)) {
        calculate(data);
    }
}


form.addEventListener("input", onFormChange);

tipInput.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
        tipInput.dataset.active = event.target.dataset.type;
        onFormChange();
    }
})

resetButton.addEventListener("click", () => {
    form.reset();
    validationReset(formInputs);
    tipInput.dataset.active = "";
    document.getElementById("tip-amount").querySelector(".amount").innerText = "$0.00";
    document.getElementById("total").querySelector(".amount").innerText = "$0.00";
})