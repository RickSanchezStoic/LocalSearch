const dirInput = document.getElementById("dir-input");
const processBtn = document.getElementById("process-btn");
const forceCheckbox = document.getElementById("force-checkbox");
const loadingDiv = document.getElementById("loading");

const directoryScreen = document.getElementById("directory-screen");
const chatScreen = document.getElementById("chat-screen");
const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let currentDir = "";

console.log("ni hao");

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("value");
    console.log("ni hao");
    if (value) {
        directoryScreen.style.display = "none";
        chatScreen.style.display = "block";
    }
});




// Step 1: Process directory
processBtn.addEventListener("click", async () => {

        currentDir = dirInput.value.trim();
    if (!currentDir) {
        alert("Please enter a folder path");
        return;
    }


    loadingDiv.style.display = "block";
    try {
        const response = await fetch("http://127.0.0.1:8000/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: currentDir, force: forceCheckbox.checked })
        });
        const data = await response.json();
        loadingDiv.style.display = "none";

        if (data.status === "done") {
            alert("Processing complete!");
            directoryScreen.style.display = "none";
            chatScreen.style.display = "block";
        } else {
            alert("Error: " + data.error);
        }
    } catch (e) {
        loadingDiv.style.display = "none";
        alert("Error: " + e);
    }
});

// Step 2: Chat functionality
sendBtn.addEventListener("click", async () => {
    const question = userInput.value.trim();
    if (!question) return;
    appendMessage("You", question);
    userInput.value = "";

    try {
        const response = await fetch("http://127.0.0.1:8000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, path: currentDir })
        });
        const data = await response.json();
        appendMessage("Bot", data.answer);
    } catch (e) {
        appendMessage("Bot", "Error: " + e);
    }
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "You" ? "user-msg" : "bot-msg";
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}
