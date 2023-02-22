import React, { useState } from "react";

export default function Product({
  id,
  sku,
  name,
  description,
  price,
  stock,
  categoryId,
}) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <div className="card">
        <h4 className="card-header text-center">{name}</h4>
        <img
          className="card-img-top img-fluid m-auto"
          style={{ width: "200px" }}
          src={require("./apple.png")}
          alt={name}
        />
        <div className="card-body">
          <span className="card-text">{description}</span>
          <h6 className="card-text">Only {stock} remaining!</h6>
          <h5 className="card-text">$ {price}</h5>
          <p>sku:{sku}</p>
        </div>
        <div className="card-footer">
          <form>
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={decrement}
                >
                  -
                </button>
              </div>
              <input
                type="number"
                className="form-control"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(parseInt(event.target.value))}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={increment}
                >
                  +
                </button>
                <button className="btn btn-primary" type="button">
                  Add to cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
