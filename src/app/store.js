import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../features/Home/countriesSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;
