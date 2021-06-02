import React from "react";

const CheckoutContext = React.createContext({
    formInputValidity: {
        name: true,
        street: true,
        city: true,
        postalCode: true
    }
});

export default CheckoutContext;