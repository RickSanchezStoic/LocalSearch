export function initChat(folderPath) {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Add initial bot intro message
    appendBotMessage("Hello! I'm your local AI assistant. Ask me anything based on your documents.");

    function appendUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble user';
        div.textContent = text;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble bot';
        div.textContent = text;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener('click', async () => {
        const question = userInput.value.trim();
        if (!question) return;
        appendUserMessage(question);
        userInput.value = "";

        try {
            const resp = await fetch('/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, path: folderPath })
            });
            const data = await resp.json();
            appendBotMessage(data.answer);
        } catch (e) {
            appendBotMessage("Error fetching answer: " + e);
        }
    });

    // Allow Enter key to submit
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
}
