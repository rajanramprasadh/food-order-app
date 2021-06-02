import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "HIDE_CART") {
    return {
      ...state,
      isCartShown: false,
      isCheckout: false
    };
  }
  if (action.type === "SHOW_CART") {
    return {
      ...state,
      isCartShown: true,
    };
  }
  if (action.type === "ORDER_FOOD") {
    return {
      ...state,
      isCheckout: true,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const hideCartHandler = () => {
    dispatchCartAction({ type: "HIDE_CART" });
  };

  const showCartHandler = () => {
    dispatchCartAction({ type: "SHOW_CART" });
  };

  const orderHandler = () => {
    dispatchCartAction({ type: "ORDER_FOOD" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isCartShown: cartState.isCartShown,
    isCheckout: cartState.isCheckout,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    hideCart: hideCartHandler,
    showCart: showCartHandler,
    orderFood: orderHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
