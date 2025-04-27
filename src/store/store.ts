import { configureStore } from '@reduxjs/toolkit';
import { messagesSlice } from '../features/messagesSlice';

export const store = configureStore({
    reducer: {
        messages: messagesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
