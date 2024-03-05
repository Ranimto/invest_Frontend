import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authRedux/Features/auth/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Active DevTools en mode Dev
});
