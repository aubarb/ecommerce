import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { cartItemsAtom } from "../recoil/cartItems/atom";
import { productsAtom } from "../recoil/products/atom";
import { getCartItems } from "../api/cartItems";
import Checkout from "./Checkout";

export default function CartItems() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
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

  let total = 0;

  const decrement = (cartItem) => {
    if (cartItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) => {
          if (item.product_id === cartItem.product_id) {
            const updatedCartItem = {
              ...item,
              quantity: cartItem.quantity - 1,
            };
            return updatedCartItem;
          }
          return item;
        })
      );
    }
  };
  const increment = (cartItem) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.product_id === cartItem.product_id) {
          const updatedCartItem = {
            ...item,
            quantity: cartItem.quantity + 1,
          };
          return updatedCartItem;
        }
        return item;
      })
    );
  };
  const remove = (cartItem) => {
    setCartItems(
      cartItems.filter((item) => (item.product_id !== cartItem.product_id))
    );
    
  }

  const renderCartItems = () => {
    return cartItems.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product_id);
      total = total + product.price * cartItem.quantity;
      return (
        <tr key={cartItem.id}>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>
            <div className="input-group align-item-center">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-secondary btn-sm border-0 bg-success text-white m-1"
                  type="button"
                  onClick={() => decrement(cartItem)}
                >
                  -
                </button>
              </div>
              <input
                className="form-control form-sm text-center sm my-1 p-0 rounded"
                value={cartItem.quantity}
                //onChange={(event) => setQuantity(parseInt(event.target))}
                disabled
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary btn-sm border-0 bg-success text-white m-1"
                  type="button"
                  onClick={() => increment(cartItem)}
                >
                  +
                </button>
              </div>
            </div>
          </td>
          <td>${cartItem.quantity * product.price}</td>
          <td>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => remove(cartItem)}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  };


  return (
    <div>
      <div className="container">
        {cartItems.length === 0
        ? <h1 className="text-center m-5">You cart is empty!</h1>
        :
          <div>
            <table className="table table-striped">
              <thead className="bg-dark text-light">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>{renderCartItems()}</tbody>
              <tfoot className="bg-success text-white">
                <tr>
                  <td colSpan="3" className="font-weight-bold">
                    Total:{" "}
                  </td>
                  <td className="font-weight-bold">${total}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
            <Checkout userId={user.id}/>
          </div>
        }
      </div>
    </div>
  );
}
