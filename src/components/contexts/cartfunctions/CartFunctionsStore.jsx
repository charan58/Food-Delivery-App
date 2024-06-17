import React, { useState } from 'react';
import { CartContext } from './CartFunctions';

function CartFunctionsStore({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setCartCount(cartCount + 1);
  };

  const updateCartItem = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setCartCount(cartCount - 1);
  };

  return (
    <CartContext.Provider value={[cart, cartCount, addToCart, updateCartItem, removeCartItem]}>
      {children}
    </CartContext.Provider>
  );
}

export default CartFunctionsStore;
