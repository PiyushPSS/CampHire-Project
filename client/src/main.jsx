import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="807653075376-ip4d1rjph8oufnebm7u5t103v6m3aetp.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
