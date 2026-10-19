import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import cartReducer from './cartSlice'; // Baad mein add karenge

const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
  },
});

export default store;