import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocationSlicec from "../slice/GetLocation.slice";

export const reducer = {
    getLocationSlice: GetLocationSlicec
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
};

const rootReducer = combineReducers(reducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});
export const persister = persistStore(store);
