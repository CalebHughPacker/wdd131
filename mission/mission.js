const themeSelector = document.getElementById('theme');
function changeTheme(){
    if (themeSelector.value === "dark"){
        document.body.classList.add("dark");
        document.getElementById("logo").src = "byui-logo_white.png";
    } else {
        document.body.classList.remove("dark");
        document.getElementById("logo").src = "byui-logo_blue.webp";
    }
}

themeSelector.addEventListener('change', changeTheme);