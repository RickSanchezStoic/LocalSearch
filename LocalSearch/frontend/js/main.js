// Import components
async function loadComponent(url) {
    const resp = await fetch(url);
    return await resp.text();
}

// Load folder selection
(async () => {
    const folderHTML = await loadComponent('frontend/components/folder_select.html');
    document.getElementById('folderContainer').innerHTML = folderHTML;

    const processBtn = document.getElementById('processBtn');
    const directoryInput = document.getElementById('directoryInput');
    const forceCheckbox = document.getElementById('forceCheckbox');
    const loadingDiv = document.getElementById('loadingDiv');
    const folderScreen = document.getElementById('folderScreen');
    const chatContainer = document.getElementById('chatContainer');

    let selectedPath = "";


    // logic below only for when the app is run from an instance of the engine class, since all the processing has happened etc

        function initChatFromURL() {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("value");

    if (!value) return;

    selectedPath = value;
    loadingDiv.classList.remove('hidden');

    fetch('/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedPath, force: false })
    })
    .then(resp => resp.json())
    .then(async data => {
        loadingDiv.classList.add('hidden');
        folderScreen.classList.add('hidden');

        const chatHTML = await loadComponent('frontend/components/chat_interface.html');
        chatContainer.innerHTML = chatHTML;
        chatContainer.classList.remove('hidden');

        import('./chat.js').then(mod => mod.initChat(selectedPath));
    })
    .catch(console.error);
}

// If DOM is ready, run immediately; otherwise wait for DOMContentLoaded
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initChatFromURL);
} else {
    initChatFromURL();
}

// logic ends here



    processBtn.addEventListener('click', async () => {
        const folderPath = directoryInput.value.trim();
        if (!folderPath) { alert("Please enter a folder path"); return; }

        selectedPath = folderPath;
        const force = forceCheckbox.checked;

        loadingDiv.classList.remove('hidden');

        try {
            const resp = await fetch('/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: selectedPath, force })
            });
            const data = await resp.json();
            loadingDiv.classList.add('hidden');
            folderScreen.classList.add('hidden');

            // Load chat interface
            const chatHTML = await loadComponent('frontend/components/chat_interface.html');
            chatContainer.innerHTML = chatHTML;
            chatContainer.classList.remove('hidden');

            import('./chat.js').then(mod => mod.initChat(selectedPath));
        } catch (e) {
            alert("Failed to process folder: " + e);
            loadingDiv.classList.add('hidden');
        }
    });
})();
