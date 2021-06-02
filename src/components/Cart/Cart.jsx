import { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";
import CheckoutProvider from "../../store/CheckoutProvider";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={cartCtx.hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={cartCtx.orderFood}>
          Order
        </button>
      )}
    </div>
  );

  let modal = "";
  if (cartCtx.isCartShown) {
    modal = (
      <Modal>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {cartCtx.isCheckout && <Checkout />}
        {!cartCtx.isCheckout && modalActions}
      </Modal>
    );
  }

  return <CheckoutProvider>{modal}</CheckoutProvider>;
};

export default Cart;
