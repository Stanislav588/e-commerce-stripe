import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductState } from "./types";

const initialState: { product: ProductState } = {
  product: {
    data: null,
    status: "idle",
    error: null,
  },
};

export const fetchAddProductToWishList = createAsyncThunk(
  "wishlist/fetchAddProductToWishList",
  async (
    { productId }: { productId: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/wishlist/add",
        { productId },
        { withCredentials: true }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  }
);
export const fetchProductFromWishList = createAsyncThunk(
  "product/fetchProductFromWishList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/wishlist", {
        withCredentials: true,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get product from wishlist"
      );
    }
  }
);
export const fetchRemoveFromWishList = createAsyncThunk(
  "remove/fetchRemoveFromWishList",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/remove/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove product from wishlist"
      );
    }
  }
);

const wishListSlice = createSlice({
  initialState,
  name: "wishlist",
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddProductToWishList.pending, (state) => {
        state.product.data = null;
        state.product.status = "loading";
        state.product.error = null;
      })
      .addCase(fetchAddProductToWishList.fulfilled, (state, action) => {
        state.product.data = action.payload as any;
        state.product.status = "succeeded";
      })
      .addCase(fetchAddProductToWishList.rejected, (state, action) => {
        state.product.data = null;
        state.product.status = "failed";
        state.product.error = action.payload as string;
      })
      .addCase(fetchProductFromWishList.pending, (state) => {
        state.product.data = null;
        state.product.status = "loading";
        state.product.error = null;
      })
      .addCase(fetchProductFromWishList.fulfilled, (state, action) => {
        state.product.data = action.payload as any;
        state.product.status = "succeeded";
      })
      .addCase(fetchProductFromWishList.rejected, (state, action) => {
        state.product.data = null;
        state.product.status = "failed";
        state.product.error = action.payload as string;
      })
      .addCase(fetchRemoveFromWishList.pending, (state) => {
        state.product.data = null;
        state.product.status = "loading";
        state.product.error = null;
      })
      .addCase(fetchRemoveFromWishList.fulfilled, (state, action) => {
        state.product.data =
          state.product.data?.filter((item) => item._id !== action.payload) ||
          null;
        state.product.status = "succeeded";
      })
      .addCase(fetchRemoveFromWishList.rejected, (state, action) => {
        state.product.data = null;
        state.product.status = "failed";
        state.product.error = action.payload as string;
      });
  },
});

export default wishListSlice.reducer;
