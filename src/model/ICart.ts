export interface CartItem {
    imageUrl: string;
    name: string;
    price: number;
    productId: number;
    quantity: number;
}

export interface Cart {

    id: number;
    userId: string;
    cartItems: CartItem[];

}