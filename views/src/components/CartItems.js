import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { cartItemsAtom } from "../recoil/cartItems/atom";
import { productsAtom } from "../recoil/products/atom";
import { getCartItems } from "../api/cartItems";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";

export default function CartItems() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const products = useRecoilValue(productsAtom);
  const user = useRecoilValue(userAtom);

  //retrieving the cart from db
  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems(user.id);
      setCartItems(data);
    };
    fetchCartItems();
  }, [user.id, setCartItems]);

  let total = 0

  const renderCartItems = () => {
    if (!cartItems) {
      return <h1>You cart is empty!</h1>
    }
    return cartItems.map((cartItem) => {
      const product = products.find(p => p.id === cartItem.product_id);
      total = total + (product.price * cartItem.quantity);
      return (
        <tr key={cartItem.id}>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{cartItem.quantity}</td>
          <td>${cartItem.quantity * product.price}</td>
        </tr>
      )
    });
  }

  return (
    <div>
      <h2>CartItems</h2>
      <div className="container">
        <table className="table table-striped">
          <thead className="bg-dark text-light">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {renderCartItems()}
          </tbody>
          <tfoot className="bg-success text-white">
            <tr>
              <td colSpan="3" className="font-weight-bold">Total: </td>
              <td className="font-weight-bold">${total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
