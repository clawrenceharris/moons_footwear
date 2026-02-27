/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import type { CartItem } from "../types/product";

interface CartStore {
  cart: CartItem[];
  getSubtotal: () => number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  incrementItemQuantity: (
    productId: number,
    color?: string,
    size?: string,
  ) => void;
  decrementItemQuantity: (
    productId: number,
    color?: string,
    size?: string,
  ) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  getSubtotal: () => {
    const cart = get().cart;
    return cart
      ? get().cart.reduce((total, current) => total + current.price, 0)
      : 0;
  },
  addItem: (newItem) => {
    const existing = get().cart.find((item) => item.id === newItem.id);
    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        ),
      });
    } else {
      set({ cart: [...get().cart, newItem] });
    }
  },

  removeItem: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },
  incrementItemQuantity: (productId, _color, _size) => {
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    });
  },

  decrementItemQuantity: (productId, _color, _size) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0), // remove if quantity hits 0
    });
  },
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
