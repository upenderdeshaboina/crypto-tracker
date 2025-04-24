import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState: persistedState ? { crypto: persistedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().crypto);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 