import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/GlobalStyles.css";
import "@fontsource/poppins";

import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import { AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </Provider>
  </React.StrictMode>
);
