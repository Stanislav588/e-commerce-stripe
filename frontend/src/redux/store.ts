import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import paymentReducer from "./paymentSlice";
import wishListReducer from "./wishListSlice";
const productPersistConfig = {
  key: "products",
  storage,
};

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: persistedProductReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
