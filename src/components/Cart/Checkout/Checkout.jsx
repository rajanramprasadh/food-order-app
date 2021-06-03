import { useRef, useContext, useState } from "react";

import classes from "./Checkout.module.css";

import CartContext from "../../../store/cart-context";
// import CheckoutContext from "../../../store/checkout-context";

const isEmpty = (value) => value.trim() === "";
const isFiveCharacters = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidation] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })

  const cartCtx = useContext(CartContext);
  // const checkoutCtx = useContext(CheckoutContext);

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveCharacters(enteredPostalCode);

    // checkoutCtx.formInputValidity = {
    //   name: enteredNameIsValid,
    //   street: enteredStreetIsValid,
    //   city: enteredCityIsValid,
    //   postalCode: enteredPostalCodeIsValid
    // };

    setFormInputsValidation({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (formIsValid) {
      return ;
    }
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`
  const postalControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={cartCtx.hideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
