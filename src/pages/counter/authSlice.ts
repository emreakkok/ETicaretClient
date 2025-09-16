import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "../../api/request"; // Kendi request dosyanın yolu

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: any;
}

// Başlangıç durumu - localStorage'da token varsa giriş yapmış kabul et
const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("jwt"),
    loading: false,
    error: null,
    user: null
};

// Login fonksiyonu - async thunk
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { userName: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await requests.Account.login(credentials);
            return { token: response.token, userName: credentials.userName };
        } catch (error: any) {
            return rejectWithValue(error.data?.title || "Giriş başarısız");
        }
    }
);

// Register fonksiyonu - async thunk  
export const registerAsync = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; userName: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            await requests.Account.register(userData);
            return userData;
        } catch (error: any) {
            return rejectWithValue(error.data?.title || "Kayıt başarısız");
        }
    }
);

// Mevcut kullanıcıyı API'dan çekecek olan thunk
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await requests.Account.getCurrentUser();
            return user;
        } catch (error: any) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("userName");
            return rejectWithValue(error.data?.title || "Oturum bilgileri alınamadı.");
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("jwt")) {
                return false;
            }
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // userName
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("jwt");
            localStorage.removeItem("userName");
        }
    },
    extraReducers: (builder) => {
        builder
            // loginAsync için tek bir addCase bloğu kullanıyoruz
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.userName; // userName olarak kaydet
                state.error = null;
                localStorage.setItem("jwt", action.payload.token);
                localStorage.setItem("userName", action.payload.userName);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            })
            // fetchCurrentUser için olan kısımlar
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Gelen user objesini direkt kaydet
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            });
    }
});

export const { logout, login } = authSlice.actions;
export const authReducer = authSlice.reducer;