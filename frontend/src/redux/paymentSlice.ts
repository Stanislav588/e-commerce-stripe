import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartProductDetails, ProductState } from "./types";

const initialState: ProductState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchAddPayment = createAsyncThunk(
  "payment/fetchAddPayment",
  async (
    { products }: { products: CartProductDetails[] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/create-session",
        { products },

        { withCredentials: true }
      );

      if (data) {
        window.location.href = data.url;
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error payment");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddPayment.pending, (state) => {
        state.data = null;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAddPayment.fulfilled, (state, action) => {
        state.data = action.payload as any;
        state.status = "succeeded";
      })
      .addCase(fetchAddPayment.rejected, (state, action) => {
        state.data = null;
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
