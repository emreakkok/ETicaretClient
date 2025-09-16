import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { Cart } from "../model/ICart";
import requests from "../api/request";

interface CartContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    deleteItem: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
}

export function CartContextProvider({ children }: PropsWithChildren<any>) {
    const [cart, setCart] = useState<Cart | null>(null);

    // ✅ Backend API ile senkronize silme
    function deleteItem(productId: number) {
        if (!cart) return;

        // Backend'e silme isteği gönder
        requests.Cart.deleteItem(productId)
            .then(() => {
                // Başarılı olursa sepeti yeniden yükle
                return requests.Cart.get();
            })
            .then(updatedCart => {
                setCart(updatedCart);
            })
            .catch(error => {
                console.error("Ürün silinirken hata:", error);
            });
    }

    // ✅ Miktar artırma - Backend API ile
    function increaseQuantity(productId: number) {
        if (!cart) return;

        requests.Cart.addItem(productId, 1) // quantity=1 ile artır
            .then(updatedCart => {
                setCart(updatedCart);
            })
            .catch(error => {
                console.error("Miktar artırılırken hata:", error);
            });
    }

    // ✅ Miktar azaltma - Backend API ile
    function decreaseQuantity(productId: number) {
        if (!cart) return;

        const currentItem = cart.cartItems.find(i => i.productId === productId);
        if (!currentItem) return;

        // Miktar 1 ise tamamen sil, değilse 1 azalt
        const quantityToRemove = currentItem.quantity === 1 ? currentItem.quantity : 1;

        requests.Cart.deleteItem(productId, quantityToRemove)
            .then(() => {
                // Başarılı olursa sepeti yeniden yükle
                return requests.Cart.get();
            })
            .then(updatedCart => {
                setCart(updatedCart);
            })
            .catch(error => {
                console.error("Miktar azaltılırken hata:", error);
            });
    }

    return (
        <CartContext.Provider
            value={{ cart, setCart, deleteItem, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
}