import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductState } from "./types";
import { NavigateFunction } from "react-router-dom";

const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
const initialState: { cartProducts: ProductState } = {
  cartProducts: {
    data: storedCart || null,
    status: "idle",
    error: null,
  },
};
export const fetchAddToCart = createAsyncThunk<
  Product[],
  { productId: string | undefined; size: number; navigate: NavigateFunction }
>(
  "cart/fetchAddToCart",
  async ({ productId, size, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/cart/add",
        {
          productId,
          size,
        },
        { withCredentials: true }
      );
      dispatch(fetchCartProduct());
      return res.data;
    } catch (error: any) {
      navigate("/auth/login");
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);
export const fetchCartProduct = createAsyncThunk<Product>(
  "product/fetchCartProduct",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/cart", {
        withCredentials: true,
      });
      localStorage.setItem("cart", JSON.stringify(res.data));

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get cart product"
      );
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "delete/fetchDeleteProduct",
  async (cartItem: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/products/remove/${cartItem}`, {
        withCredentials: true,
      });

      return cartItem;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart product"
      );
    }
  }
);
export const fetchCleanCart = createAsyncThunk(
  "clean/fetchCleanCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/cart/clean`, {
        withCredentials: true,
      });
    } catch (error: any) {
      dispatch(clearCart());
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart product"
      );
    }
  }
);

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    clearCart(state) {
      state.cartProducts.data = null;
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddToCart.pending, (state) => {
        state.cartProducts.data = null;
        state.cartProducts.status = "loading";
        state.cartProducts.error = null;
      })
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.cartProducts.data = action.payload as any;
        state.cartProducts.status = "succeeded";
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.cartProducts.data = null;
        state.cartProducts.status = "failed";
        state.cartProducts.error = action.payload as string;
      })
      .addCase(fetchCartProduct.pending, (state) => {
        state.cartProducts.data = null;
        state.cartProducts.status = "loading";
        state.cartProducts.error = null;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.cartProducts.data = action.payload as any;
        state.cartProducts.status = "succeeded";
      })
      .addCase(fetchCartProduct.rejected, (state, action) => {
        state.cartProducts.data = null;
        state.cartProducts.status = "failed";
        state.cartProducts.error = action.payload as string;
      })
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.cartProducts.status = "loading";
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.cartProducts.data =
          state.cartProducts.data?.filter(
            (item) => item._id !== action.payload
          ) || null;
        state.cartProducts.status = "succeeded";
      })
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.cartProducts.status = "failed";
        state.cartProducts.error = action.payload as string;
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
