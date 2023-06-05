import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { checkout } from "../api/checkout";
import { cartItemsAtom } from "../recoil/cartItems/atom";

export default function Checkout({ userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useRecoilValue(cartItemsAtom);

  const processCheckout = async () => {
    setIsLoading(true);
    const data = await checkout(cartItems, userId);
    const url = data.url;
    window.location.href = url;
  };

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-success btn-lg" onClick={processCheckout}>
        {isLoading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
}
