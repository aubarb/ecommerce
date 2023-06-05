import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getOrderItems } from "../api/orders";
import { productsAtom } from "../recoil/products/atom";

export default function OrderDetails({ orderId }) {
  const [orderItems, setOrderItems] = useState([]);
  const products = useRecoilValue(productsAtom);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const result = await getOrderItems(orderId);
      setOrderItems(result);
    };
    fetchOrderItems();
  }, [orderId]);

  const renderOrderItems = () => {
    return orderItems.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      return (
        <tr>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{item.quantity}</td>
          <td>${(item.quantity * product.price).toFixed(2)}</td>
        </tr>
      );
    });
  };

  return (
    <div
      className="modal fade"
      id={`orderDetailsModal${orderId}`}
      tabIndex="-1"
      aria-labelledby="orderDetailsModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderDetailsModal">
              Order Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <table className="table table-striped">
                <thead className="bg-dark text-light">
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>{renderOrderItems()}</tbody>
              </table>
            </div>
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
  );
}
