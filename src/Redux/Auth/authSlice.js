import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/login", credentials);
      return response.data;
    } catch (error) {
      let errorMessage = "Une erreur s'est produite lors de la connexion";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Email ou mot de passe incorrect";
        } else if (error.response.status === 422) {
          errorMessage = "Veuillez vérifier vos identifiants";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLogged");
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Échec de la déconnexion"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: localStorage.getItem("isLogged") === "true" || false,
    user: null,
    loading: false,
    error: null,
    token: localStorage.getItem("authToken") || null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogged = true;
        state.error = null;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("isLogged", "true");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isLogged = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLogged = false;
        state.token = null;
        state.error = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("isLogged");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
