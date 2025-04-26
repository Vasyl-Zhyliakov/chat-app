import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Users } from "../Types/message";

type initial = {
  messages: Message[];
  isBotTyping: boolean;
};

const initialState: initial = {
  messages: [],
  isBotTyping: false,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: Users.user,
      });

      state.isBotTyping = true;
    },

    addBotMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: Users.chatBot,
      });
      state.isBotTyping = false;
    },
  },
});
