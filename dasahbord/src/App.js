// src/App.js
import React from 'react';
import Product from './components/Product';
import { CartProvider } from './components/CartProvider';
import Cart from './components/Cart';
import useProducts from './hooks/useProducts';

const App = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CartProvider>
      <div>
        <h1>Shopping Cart</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
