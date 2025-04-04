//TODO Can delete once working in app.tsx

console.log("in client.js");

// 1. Start the Ollama server
window.electronAPI.serveOllama();

// 2. Run the model
window.electronAPI.onOllamaServe((event, data) => {
  if (!data.success) {
    initalSpinner.style.display = "none";
    statusMsg.textContent =
      "Error: " + (data.content || "Unknown error occurred.");
    return;
  }
  if (data.content === "system") {
    // Ollama was already running, and we just connected to it, let the user know
    document.getElementById("status-container").style.display = "flex";
    settingsIcon.style.display = "inline-block";
  }
  window.electronAPI.runOllama();
});

// 3. Monitor the run status
window.electronAPI.onOllamaRun((event, data) => {
  if (!data.success) {
    initalSpinner.style.display = "none";
    statusMsg.textContent = "Error: " + data.content;
    return;
  }
  if (data.content.done) {
    console.log("it got loaded");
    return;
  }
  statusMsg.textContent = data.content;
});
