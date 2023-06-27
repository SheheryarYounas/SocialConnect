import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { //Specifically for redux-persist. Redux-persist is used to persist the state of the app even after the user refreshes the page or closes the browser. You will have to clear the cache to clear the state.
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //This is the default storage engine for redux-persist
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, authReducer) //This is the persisted version of the reducer

const store = configureStore({ //Store is used to store the state of the app
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] //These are the actions that we want to ignore
      },
    }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

