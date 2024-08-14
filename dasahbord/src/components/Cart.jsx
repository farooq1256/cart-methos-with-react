import React from 'react';
import { useCart } from './CartProvider';
import './Cart.css'; // Assuming you have a CSS file for styling

const Cart = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <div className="cart-container">
      <h4>Cart Items:</h4>
      <ul className="cart-items">
        {state.cart.map(item => (
          <li key={item.id} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
            <div className="item-actions">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
            <div className="item-total">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Total Items: {state.totalItems}</p>
        <p>Total Price: ${state.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
