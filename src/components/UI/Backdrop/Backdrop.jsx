import { useContext } from 'react';

import classes from "./Backdrop.module.css";

import CartContext from  '../../../store/cart-context';

const Backdrop = (props) => {
  const cartCtx = useContext(CartContext);
  return <div className={classes.backdrop} onClick={cartCtx.hideCart} />;
};

export default Backdrop;
