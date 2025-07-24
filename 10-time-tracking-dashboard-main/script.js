const cardHead = {
    "Work": {
        class: "bg-orange",
        path: "images/icon-work.svg"
    },
    "Play": {
        class: "bg-blue",
        path: "images/icon-play.svg"
    },
    "Study": {
        class: "bg-pink",
        path: "images/icon-study.svg"
    },
    "Exercise": {
        class: "bg-green reset-top",
        path: "images/icon-exercise.svg"
    },
    "Social": {
        class: "bg-purple",
        path: "images/icon-social.svg"
    },
    "Self Care": {
        class: "bg-yellow",
        path: "images/icon-self-care.svg"
    },
}

function createCard(value) {
    let template = `
        <div class="card" data-period="weekly">
            <div class="head ${cardHead[value.title].class}">
                <div class="img-wrapper">
                    <img src="${cardHead[value.title].path}" alt="">
                </div>
            </div>
            <div class="card-content">
                <div class="title-container">
                    <p>${value.title}</p>
                    <div>
                        <img src="images/icon-ellipsis.svg" alt="">
                    </div>
                </div>
                <div class="time-container" data-type="daily">
                    <p class="time">${value.timeframes.daily.current}hrs</p>
                    <p class="update-time">
                        Last Week - ${value.timeframes.daily.previous}hrs
                    </p>
                </div>
                <div class="time-container" data-type="weekly">
                    <p class="time">${value.timeframes.weekly.current}hrs</p>
                    <p class="update-time">
                        Last Week - ${value.timeframes.weekly.previous}hrs
                    </p>
                </div>
                <div class="time-container" data-type="monthly">
                    <p class="time">${value.timeframes.monthly.current}hrs</p>
                    <p class="update-time">
                        Last Week - ${value.timeframes.monthly.previous}hrs
                    </p>
                </div>
            </div>
        </div>
    `;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = template.trim();
    return wrapper.firstChild;
}

fetch('./data.json').then(res => {
    if (!res.ok)
        return console.error("Something went wrong.");
    return res.json();
}).then(data => {
    const container = document.querySelector(".container");
    data.forEach(value => {
        container.appendChild(createCard(value))
    })
});

const buttonList = document.querySelector(".button-list-container ul");

buttonList.addEventListener("click", (event) => {
    const type = event.target.dataset.type;
    buttonList.dataset.active = type;
    document.querySelectorAll(".card[data-period]").forEach(element => element.dataset.period = type)
})