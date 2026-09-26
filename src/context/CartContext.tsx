"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "@/lib/types";

export interface CartItem {
  id: string; // unique per product+variant combo
  slug: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  size?: string;
  color?: string;
  quantity: number;
}

interface WishItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
}

interface State {
  items: CartItem[];
  wishlist: WishItem[];
}

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_WISH"; item: WishItem }
  | { type: "HYDRATE"; state: State };

const initialState: State = { items: [], wishlist: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_WISH": {
      const exists = state.wishlist.find((w) => w.slug === action.item.slug);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((w) => w.slug !== action.item.slug)
          : [...state.wishlist, action.item],
      };
    }
    default:
      return state;
  }
}

interface CartContextValue extends State {
  addItem: (
    product: Product,
    opts?: { size?: string; color?: string; quantity?: number; image?: string }
  ) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWish: (product: Product) => void;
  isWished: (slug: string) => boolean;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lumera-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue["addItem"] = (product, opts = {}) => {
      const size = opts.size;
      const color = opts.color;
      const id = [product.id, size ?? "", color ?? ""].join("|");
      dispatch({
        type: "ADD",
        item: {
          id,
          slug: product.slug,
          productId: product.id,
          name: product.name,
          image: opts.image ?? product.images[0],
          price: product.price,
          originalPrice: product.originalPrice,
          size,
          color,
          quantity: opts.quantity ?? 1,
        },
      });
    };

    const toggleWish: CartContextValue["toggleWish"] = (product) => {
      dispatch({
        type: "TOGGLE_WISH",
        item: {
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          price: product.price,
          originalPrice: product.originalPrice,
        },
      });
    };

    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((n, i) => n + i.price * i.quantity, 0);

    return {
      ...state,
      addItem,
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      toggleWish,
      isWished: (slug) => state.wishlist.some((w) => w.slug === slug),
      count,
      subtotal,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
