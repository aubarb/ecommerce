import React from "react"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51MgmUSF5PCqLYqt0tEsgmJpXafH0ju9tLgnTSuNndPerzaROYRmEApHXHnyEDDZfQbPK3x5JoPw1g3RG32kfKj4300RENYbdLD"
const stripePromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
};




