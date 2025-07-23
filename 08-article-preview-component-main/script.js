const author = document.getElementsByClassName("author")[0];
const share = document.getElementsByClassName("share-icons")[0];
const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("share-button-active");
    author.classList.toggle("mobile-hide");
    share.classList.toggle("hidden");
})

