// src/pages/counter/cartSlite.ts
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { Cart } from "../../model/ICart";
import requests from "../../api/request";
import { toast } from "react-toastify";

export interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
};

// --- Thunks ---

// Sepete ürün ekleme (ekledikten sonra güncel sepeti getir)
export const addItemToCart = createAsyncThunk<Cart | null, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            await requests.Cart.addItem(productId, quantity);
            // API bazen güncellenmiş sepeti dönmeyebilir -> kesin güncel veriyi al
            const updatedCart = await requests.Cart.get();
            toast.success("Ürün sepete eklendi!");
            return updatedCart ?? null;
        } catch (error: any) {
            toast.error("Ürün eklenirken bir sorun oluştu.");
            return thunkAPI.rejectWithValue({ error: error?.data ?? error });
        }
    }
);

// Ürün miktarını azaltma (azalttıktan sonra güncel sepeti getir)
export const decreaseItemQuantity = createAsyncThunk<Cart | null, { productId: number, quantity?: number }>(
    "cart/decreaseItemQuantity",
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            // Burada API'ye azaltma isteği gönder
            await requests.Cart.deleteItem(productId, quantity);
            // Sonrasında güncel sepeti al
            const updatedCart = await requests.Cart.get();
            toast.info("Ürün sayısı azaltıldı.");
            return updatedCart ?? null;
        } catch (error: any) {
            toast.error("Ürün azaltılırken bir sorun oluştu.");
            return thunkAPI.rejectWithValue({ error: error?.data ?? error });
        }
    }
);

// Sepeti getirme
export const getCartAsync = createAsyncThunk<Cart | null>(
    "cart/getCartAsync",
    async (_, thunkAPI) => {
        try {
            const result = await requests.Cart.get();
            return result ?? null;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error?.data ?? error });
        }
    }
);

// --- Slice ---

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        // addItemToCart
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload ?? null;
            state.status = "idle";
        });
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        });

        // decreaseItemQuantity
        builder.addCase(decreaseItemQuantity.fulfilled, (state, action) => {
            state.cart = action.payload ?? null;
            state.status = "idle";
        });
        builder.addCase(decreaseItemQuantity.rejected, (state) => {
            state.status = "idle";
        });

        // getCartAsync
        builder.addCase(getCartAsync.fulfilled, (state, action) => {
            state.cart = action.payload ?? null;
            state.status = "idle";
        });
        builder.addCase(getCartAsync.rejected, (state) => {
            state.status = "idle";
        });

        // pending
        builder.addMatcher(
            isAnyOf(
                addItemToCart.pending,
                decreaseItemQuantity.pending,
                getCartAsync.pending
            ),
            (state) => {
                state.status = "pending";
            }
        );
    }
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
