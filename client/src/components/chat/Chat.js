import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChangeInputHandler = (e) => {
    setInput(e.target.value);
  };

  const onClickEventHandler = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const newQuestion = { qn: input, ans: "..." };
    setQuestions((prevQns) => [...prevQns, newQuestion]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: input }),
      });
      const responseData = await response.json();

      setQuestions((prevQns) => {
        const updatedQuestions = [...prevQns];
        updatedQuestions[updatedQuestions.length - 1].ans =
          responseData.message.content;
        return updatedQuestions;
      });
    } catch (err) {
      console.log(err);
    }

    setInput("");
    setIsButtonDisabled(false);
  };

  return (
    <form id="chat-container" onSubmit={onClickEventHandler}>
      <h2>AI Chatbot</h2>
      <div id="chat-messages">
        {questions.map((data, index) => (
          <div key={index}>
            <strong>User1 : {data.qn}</strong>
            <br></br>
            <strong>Bot : {data.ans}</strong>
          </div>
        ))}
      </div>
      <input
        onChange={onChangeInputHandler}
        type="text"
        id="chat-input"
        placeholder="Type your message..."
        value={input}
      />
      <button
        className={isButtonDisabled ? "SendingButton" : ""}
        id="send-button"
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default Chat;
