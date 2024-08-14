// src/hooks/useProducts.js
import { useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
  products: [],
  loading: true,
  error: null,
};

// Define action types
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Create a reducer function
const reducer = (state, {type,payload}) => {
    // console.log(state);
    // return
    
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
        error: null,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
        error:payload,
      };
    default:
      return state;
  }
};

// Custom hook using useReducer
const useProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, payload: error.message });
      }
    };

    fetchProducts();
  }, []);

  return state;

  
};
// console.log(useProducts);

export default useProducts;
