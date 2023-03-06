import React from "react";
import { useRecoilValue } from "recoil";
import { checkout } from "../api/checkout";
import { cartItemsAtom } from "../recoil/cartItems/atom";

export default function Checkout({userId}) {

  const cartItems = useRecoilValue(cartItemsAtom);

  const processCheckout = async () => {
    const data = await checkout(cartItems, userId);
    const url = data.url
    window.location.href = url; 
  }

  return (
    <>
      <h4 className="my-3">Checkout </h4>
      <button className="btn btn-success" onClick={processCheckout}>Pay</button>
    </>
  )
}