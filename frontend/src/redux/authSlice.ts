import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserInfo {
  accessToken: string;
  createdAt: string;
  email: string;
  fullName: string;
  message: string;
  updatedAt: string;
  _id: string;
  error: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (value: LoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/register",
        value,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);
export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (value: LoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        value,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login user"
      );
    }
  }
);
export const fetchLogOut = createAsyncThunk(
  "user/fetchLogOut",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      const { data } = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

interface UserState {
  data: null | { id: string; fullName: string; password: string };
  status: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
}
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;
const initialState: { user: UserState } = {
  user: {
    data: initialUser,
    status: "idle",
    error: null,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user.data = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.user.data = null;
        state.user.status = "loading";
        state.user.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.data = action.payload;
        state.user.status = "succeeded";
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.user.data = null;
        state.user.status = "failed";
        state.user.error = action.payload as string;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.user.data = null;
        state.user.status = "loading";
        state.user.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.data = action.payload;
        state.user.status = "succeeded";
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.user.data = null;
        state.user.status = "failed";
        state.user.error = action.payload as string;
      })
      .addCase(fetchLogOut.pending, (state) => {
        state.user.data = null;
        state.user.status = "loading";
        state.user.error = null;
      })
      .addCase(fetchLogOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.data = action.payload;
        state.user.status = "succeeded";
      })
      .addCase(fetchLogOut.rejected, (state, action) => {
        state.user.data = null;
        state.user.status = "failed";
        state.user.error = action.payload as string;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
