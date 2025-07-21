import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import toastReducer from "./ToastSlice";
import authReducer from "./AuthSlice";
import searchReducer from "./SearchSlice"; // your persisted slice

// Root reducer
const rootReducer = combineReducers({
    toast: toastReducer,
    auth: authReducer,
    search: searchReducer, // this will be persisted
});

// Persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["search"], // ✅ only `search` state will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // redux-persist uses non-serializable values, we ignore these
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// Persistor for wrapping with PersistGate
export const persistor = persistStore(store);

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
