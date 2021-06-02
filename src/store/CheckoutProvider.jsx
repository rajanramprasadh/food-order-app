import { useReducer } from "react";

import CheckoutContext from "./checkout-context";

const defaultCheckoutState = {
  formInputValidity: {
    name: true,
    street: true,
    city: true,
    postalCode: true,
  },
};

const checkoutReducer = (state, action) => {
  return defaultCheckoutState;
};

const CheckoutProvider = (props) => {
  const [checkoutState, dispatchCheckoutAction] = useReducer(
    checkoutReducer,
    defaultCheckoutState
  );

  const { formInputValidity } = defaultCheckoutState;
  const checkoutContext = {
    formInputValidity: {
      name: formInputValidity.name,
      street: formInputValidity.street,
      city: formInputValidity.city,
      postalCode: formInputValidity.postalCode,
    },
  };

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
