import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store.ts";
import { SnackbarProvider } from "notistack";
import { ShopContextProvider } from "./components/context/ContextApi.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);
