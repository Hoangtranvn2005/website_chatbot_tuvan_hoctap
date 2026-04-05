let isLoggedIn = false;
let currentUser = "";

function toPageUser() {
    window.location.href = "user.html";
}

function toggleSearch() {
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    if (searchBox.style.display == "flex") {
        searchBox.style.display = "none";
        searchButton.style.display = "inline-block";
    }
    else {
        searchBox.style.display = "flex";
        searchButton.style.display = "none";
    }
}


function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;
    const user = users[username];

    if (user && password == user.mk) {
        isLoggedIn = true;
        currentUser = username;

        document.getElementById("loginForm").style.display = "none";
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("displayName").textContent = currentUser;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
    }
    else {
        alert("Mật khẩu hoặc MSSV sai")
    }
}

window.onload = function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn == "true" && username) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("displayName").textContent = username;
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";

    document.getElementById("loginForm").style.display = "inline-block";
    document.getElementById("userInfo").style.display = "none";
}

function goToPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
     
    if(isLoggedIn == "true") {
        window.location.href = "quan-ly.html";
    }
    else {
        alert("Bạn chưa đăng nhập")
    }
}

document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        const keyword = this.value;
        window.location.href = `library.html?search=${encodeURIComponent(keyword)}`;
    }
})

function saveAndGo(event, title, url) {
    event.preventDefault();
    saveHistory(title);
    setTimeout(() => {
        window.location.href = url;
    }, 100);
}

function saveHistory(title) {
    const username = localStorage.getItem("username");
    if (!username) {
        return;
    }

    const historyKey = `history_${username}`;
    const currentHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

    if (!currentHistory.includes(title)) {
        currentHistory.push(title);
        localStorage.setItem(historyKey, JSON.stringify(currentHistory));
    }
}

function removeHistory() {
    const username = localStorage.getItem("username");
    if (!username) {
        return;
    }

    const historyKey = `history_${username}`;
    localStorage.removeItem(historyKey);
    location.reload();
}