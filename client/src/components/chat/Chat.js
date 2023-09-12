import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const messageRef = useRef(null);

  const scrollToBottom = () => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [questions]);

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
      <div id="chat-messages" ref={messageRef}>
        {questions.map((data, index) => (
          <div key={index}>
            <p>You : {data.qn}</p>
            <br></br>
            <p>Bot : {data.ans}</p>
          </div>
        ))}
      </div>
      <input
        onChange={onChangeInputHandler}
        type="text"
        id="chat-input"
        placeholder="Ask anything about HR policies..."
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
