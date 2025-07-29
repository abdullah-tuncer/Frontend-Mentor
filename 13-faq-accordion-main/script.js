function createElement(data) {
    let template = `
        <article class="faq-item" data-show="false">
            <div class="head">
                <h3 class="question-title">
                    ${data.question}
                </h3>
                <button type="button">
                    <img data-active="true" src="assets/images/icon-minus.svg" alt="">
                    <img data-active="false" src="assets/images/icon-plus.svg" alt="">
                </button>
            </div>
            <p class="solution" aria-hidden="true">
                ${data.solution}
            </p>
        </article>
    `;
    let div = document.createElement("div");
    div.innerHTML = template.trim();
    return div.firstChild;
}

function handleClick(event) {
    if (event.target.closest("button") || event.target.closest("h3")) {
        if (event.currentTarget.dataset.show === "true") {
            event.currentTarget.querySelector("p").ariaHidden = true;
            event.currentTarget.dataset.show = "false";
        } else {
            event.currentTarget.querySelector("p").ariaHidden = false;
            event.currentTarget.dataset.show = "true";
        }
    }
}

function addQuestions(questions) {
    const questionsElement = document.getElementById("questions");
    questions.forEach(v => {
        const element = createElement(v);
        element.addEventListener("click", handleClick)
        questionsElement.appendChild(element);
        questionsElement.appendChild(document.createElement("hr"));
    })
}

fetch("./data.json").then(res => res.json()).then(data => {
    addQuestions(data);
});