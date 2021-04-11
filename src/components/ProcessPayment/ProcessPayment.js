import React, { useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeAtQHje2ICnTUd7bNBbVCQOkF8ArgTZ7EiysAW90ulsX5XBeYdJPh4EamwO7F9mxDhR86quwCxov9EAbxb7Qyg00JjDVccsW');


const ProcessPayment = ({handlePaymentSuccess}) => {

      return (
        <Elements stripe={stripePromise}>
          <SimpleCardForm handlePaymentSuccess={handlePaymentSuccess} />
          {/* <SplitCardForm/> */}
        </Elements>
    );
};

export default ProcessPayment;