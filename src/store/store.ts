import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice';

export const store = configureStore({
    reducer: {
        garage: garageReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
