import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  isCartShown: false,
  isCheckout: false,
  addItem: () => {},
  removeItem: (id) => {},
  hideCart: () => {},
  showCart: () => {},
  orderFood: () => {},
});

export default CartContext;
