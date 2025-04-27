import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { messagesSlice } from "../features/messagesSlice";
import "./chat.css";
import { Users } from "../Types/message";
import { CloseIcon } from "./Icons/CloseIcon";
import { SendIcon } from "./Icons/SendIcon";

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
        <CloseIcon handleClear={handleClear} />
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
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
