import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductState } from "./types";
interface FetchProductsParams {
  gender?: string;
  category?: string;
}
const initialState: {
  products: ProductState;
  productDetails: ProductState;
  productGenreAndCategory: ProductState;
} = {
  productGenreAndCategory: {
    data: null,
    error: null,
    status: "idle",
  },

  products: {
    data: null,
    error: null,
    status: "idle",
  },

  productDetails: {
    data: null,
    error: null,
    status: "idle",
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/all");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get products"
      );
    }
  }
);
export const fetchProductsByGenreAndCategory = createAsyncThunk(
  "products/fetchProductsByGenreAndCategory",
  async (
    { gender: gender, category: category }: FetchProductsParams,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/all?gender=${gender}?category=${category}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get genre"
      );
    }
  }
);
export const fetchProductDetails = createAsyncThunk<
  any,
  string | undefined,
  { rejectValue: string }
>("details/fetchProductDetails", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to get product id"
    );
  }
});
export const fetchAddNewProduct = createAsyncThunk(
  "newProduct/fetchAddNewProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/product/add`,
        product
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add new product"
      );
    }
  }
);

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.data = null;
        state.products.status = "loading";
        state.products.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.data = action.payload;
        state.products.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products.data = null;
        state.products.status = "failed";
        state.products.error = action.payload as string;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.productDetails.data = null;
        state.productDetails.status = "loading";
        state.productDetails.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails.data = action.payload as any;
        state.productDetails.status = "succeeded";
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productDetails.data = null;
        state.productDetails.status = "failed";
        state.productDetails.error = action.payload as string;
      })
      .addCase(fetchProductsByGenreAndCategory.pending, (state) => {
        state.productGenreAndCategory.data = null;
        state.productGenreAndCategory.status = "loading";
        state.productGenreAndCategory.error = null;
      })
      .addCase(fetchProductsByGenreAndCategory.fulfilled, (state, action) => {
        state.productGenreAndCategory.data = action.payload as any;
        state.productGenreAndCategory.status = "succeeded";
      })
      .addCase(fetchProductsByGenreAndCategory.rejected, (state, action) => {
        state.productGenreAndCategory.data = null;
        state.productGenreAndCategory.status = "failed";
        state.productGenreAndCategory.error = action.payload as string;
      })
      .addCase(fetchAddNewProduct.pending, (state) => {
        state.productGenreAndCategory.data = null;
        state.productGenreAndCategory.status = "loading";
        state.productGenreAndCategory.error = null;
      })
      .addCase(fetchAddNewProduct.fulfilled, (state, action) => {
        state.productGenreAndCategory.data = action.payload as any;
        state.productGenreAndCategory.status = "succeeded";
      })
      .addCase(fetchAddNewProduct.rejected, (state, action) => {
        state.productGenreAndCategory.data = null;
        state.productGenreAndCategory.status = "failed";
        state.productGenreAndCategory.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
