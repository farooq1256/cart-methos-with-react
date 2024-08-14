// src/components/CartProvider.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Helper function to calculate totals
const calculateTotals = (cart) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const itemToAdd = action.payload;
      // console.log(itemToAdd);
      // return
      
      const existingItem = state.cart.find(item => item.id === itemToAdd.id);
      let newCart;

      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item
        );
      } else {
        newCart = [...state.cart, itemToAdd];
      }

      const { totalItems, totalPrice } = calculateTotals(newCart);
      return { ...state, cart: newCart, totalItems, totalPrice };
    }

    case REMOVE_ITEM: {
      const itemIdToRemove = action.payload;
      const newCart = state.cart.filter(item => item.id !== itemIdToRemove);
      const { totalItems, totalPrice } = calculateTotals(newCart);
      return { ...state, cart: newCart, totalItems, totalPrice };
    }

    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const newCart = state.cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const { totalItems, totalPrice } = calculateTotals(newCart);
      return { ...state, cart: newCart, totalItems, totalPrice };
    }

    default:
      return state;
  }
};

// Create CartContext
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using CartContext
export const useCart = () => {
  return useContext(CartContext);
};
