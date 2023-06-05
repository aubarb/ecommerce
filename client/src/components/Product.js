import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { addCartItems } from "../api/cartItems";
import { toast } from "react-toastify";

export default function Product({ product }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const { id, name, price, description, image } = product;
  const [quantity, setQuantity] = useState(1);
  const user = useRecoilValue(userAtom);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  //Sending items to the cart in DB.
  const addToCart = async (id) => {
    if (!isAuthenticated) {
      toast.error("You must login first");
    } else {
      if (id && quantity && user.id) {
        const response = await addCartItems(id, quantity, user.id);
        if (response.status === 200) {
          toast.success(
            quantity === 1
              ? `${quantity} ${name} added to cart!`
              : `${quantity} ${name}s added to cart!`
          );
          setQuantity(1);
        } else {
          toast.error(response.data);
        }
      }
    }
  };

  return (
    <>
      <div className="card">
        <h5 className="card-header text-center">{name}</h5>
        <div
          className="card-body"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#${id}Modal`}
        >
          <img
            className="card-img-top img-fluid m-auto"
            style={{ width: "200px" }}
            src={image}
            alt={name}
          />
          <h5 className="card-text">$ {price}</h5>
        </div>
        <div className="card-footer">
          <form>
            <div className="input-group align-item-center">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-secondary btn-sm border-0 bg-success text-white m-1"
                  type="button"
                  onClick={decrement}
                >
                  -
                </button>
              </div>
              <input
                className="form-control form-sm text-center sm my-1 p-0 rounded"
                value={quantity}
                onChange={(event) => setQuantity(parseInt(event.target))}
                disabled
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary btn-sm border-0 bg-success text-white m-1"
                  type="button"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  name={name}
                  onClick={() => addToCart(id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="modal fade"
        id={`${id}Modal`}
        tabindex="-1"
        aria-labelledby={`${id}ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}ModalLabel`}>
                {name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center m-auto">
              <img
                classNameName="card-img-top img-fluid m-auto"
                style={{ width: "200px" }}
                src={image}
                alt={name}
              />
              <p className="text-justify">{description}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
