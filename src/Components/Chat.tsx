import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { messagesSlice } from "../features/messagesSlice";
import "./chat.css";
import { Users } from "../Types/message";

export const Chat = () => {
  const [inputValue, SetInputValue] = useState("");

  const dispatch = useAppDispatch();
  const { messages, isBotTyping } = useAppSelector((state) => state.messages);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const scrollCallback = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollCallback();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim()) {
      dispatch(messagesSlice.actions.addUserMessage(inputValue));
      SetInputValue("");

      setTimeout(() => {
        dispatch(messagesSlice.actions.addBotMessage("Answer"));
      }, 500);
    }
  };

  const handleClear = () => {
    dispatch(messagesSlice.actions.clearChat());
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h1 className="chat__title">AI Agent</h1>
        <svg
          className="chat__close-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handleClear}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>

      <div className="chat__scroll-wrapper">
        <div className="chat__messages">
          {messages.map((message) =>
            message.sender === Users.user ? (
              <div
                className="chat__message chat__message--user"
                key={message.id}
              >
                {message.text}
              </div>
            ) : (
              <div
                className="chat__message chat__message--bot"
                key={message.id}
              >
                {message.text}
              </div>
            )
          )}
          <div ref={chatRef}></div>
        </div>
      </div>

      <div className="chat__footer">
        <form
          action="#"
          method="post"
          className="chat__form"
          onSubmit={handleSubmit}
        >
          <input
            className="chat__input"
            type="text"
            name="user-message"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="chat__button" type="submit" disabled={isBotTyping}>
            <svg
              className="chat__send-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
              <path d="m21.854 2.147-10.94 10.939"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
