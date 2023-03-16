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
    <div class="d-flex justify-content-center">
      <button className="btn btn-success btn-lg" onClick={processCheckout}>Checkout</button>
    </div>
  )
}