import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { cartItemsAtom } from "../recoil/cartItems/atom";
import { getCartItems } from "../api/cartItems";

export default function CartItems() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const user = useRecoilValue(userAtom);

  //retrieving the cart from db
  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems(user.id);
      setCartItems(data);
    };
    fetchCartItems();
  }, [user.id, setCartItems]);

  return (
    <div>
      <h2>CartItems</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li>
            Id {cartItem.product_id} Quantity: {cartItem.quantity}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={() => console.log(user.id)}>
        CONSOLE LOG USER ID
      </button>
    </div>
  );
}
