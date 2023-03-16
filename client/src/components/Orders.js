import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getOrders } from "../api/orders";
import { ordersAtom } from "../recoil/orders/atom";
import { userAtom } from "../recoil/user/atom";
import OrderDetails from "../modals/orderDetails";

export default function Orders() {
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const user = useRecoilValue(userAtom);

  //retrieving the orders from db
  useEffect(() => {
    if (user.id) {
      const fetchOrders = async () => {
        const data = await getOrders(user.id);
        setOrders(data);
      };
      fetchOrders();
    }
  }, [user.id]);

  const renderOrders = () => {
    return orders.map((order) => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.created_at}</td>
          <td>${order.total}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#orderDetailsModal${order.id}`} // pass the id to the modal id
            >
              Details
            </button>
            <OrderDetails orderId={order.id} />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="container m-5">
        {orders.length === 0 ? (
          <h1 className="text-center m-5">You have no orders yet!</h1>
        ) : (
          <div>
            <table className="table table-striped">
              <thead className="bg-dark text-light">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Total</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>{renderOrders()}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
