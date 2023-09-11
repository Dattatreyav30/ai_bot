import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState({ chat: "" });
  const onChangeInputHandler = (e) => {
    setInput(e.target.value);
  };

  const [questions, setQuestions] = useState([]);

  const onClickEventHandler = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setQuestions((prevQns) => [...prevQns, input]);
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const responseData = response.json();

    setInput({ chat: "" });
  };
  return (
    <form id="chat-container" onSubmit={onClickEventHandler}>
      <h2>AI Chatbot</h2>
      <div id="chat-messages">
        {questions.map((qn) => (
          <div>
            <strong>User1 : {qn}</strong>
          </div>
        ))}
      </div>        
      <input
        onChange={onChangeInputHandler}
        type="text"
        id="chat-input"
        placeholder="Type your message..."
        value={input.chat}
      />
      <button id="send-button">Send</button>
    </form>
  );
};

export default Chat;
