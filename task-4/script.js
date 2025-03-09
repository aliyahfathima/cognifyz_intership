
const themeButton = document.getElementById("themeButton");
const body = document.body;
let colors = [, "#ffeb3b", "#ffcc80", "#90caf9", "#d1c4e9","#4169E1", 
    "#008080", 
    "#8000FF", 
    "#39FF14", 
    "#FF1493", 
    "#FF4500", 
    "#00CED1", 
    "#FF8C00", 
    "#2F4F4F" , "#FF007F", 
    "#00FF7F", 
    "#8A2BE2", 
    "#DC143C",
    "#FF4500", 
    "#1E90FF", 
    "#9400D3", 
    "#00FFFF", 
    "#FF69B4" ];
let currentIndex = 0;

themeButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % colors.length;
    body.style.transition = "background 1s ease-in-out";
    body.style.backgroundColor = colors[currentIndex];
});

// Dark Mode Toggle
const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.transition = "background 1s ease-in-out, color 0.5s ease";
        document.body.style.background = "#111";
        document.body.style.color = "#fff";
    } else {
        document.body.style.background = "#f4f4f4";
        document.body.style.color = "#000";
    }
});

// Show More Products
const loadMoreButton = document.getElementById("loadMore");
const extraProducts = document.querySelector(".extra-products");

loadMoreButton.addEventListener("click", function () {
    if (extraProducts.style.display === "none" || extraProducts.style.display === "") {
        extraProducts.style.display = "grid";
        loadMoreButton.textContent = "Show Less";
    } else {
        extraProducts.style.display = "none";
        loadMoreButton.textContent = "Show More Products";
    }
});
