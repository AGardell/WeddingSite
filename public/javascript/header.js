let hamburger = document.getElementById("hamburger");
let links = document.getElementById("links");

hamburger.addEventListener("click", () => {
    links.classList.toggle("open-links");
    hamburger.classList.toggle("open-links");
});