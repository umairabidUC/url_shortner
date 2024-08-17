import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import { urlsAPI } from './api/urlApiSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            [urlsAPI.reducerPath]: urlsAPI.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(urlsAPI.middleware)
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];