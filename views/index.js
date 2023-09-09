const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    appendMessage("You", message);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      appendMessage("bot", data.message.content);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
    chatInput.value = "";
  }
});

function appendMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
