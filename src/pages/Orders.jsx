import { useState } from "react";

import { supabase } from "../supabase";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);


  async function getOrders() {

    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false
      });


    if (error) {

      console.error(error);

      alert("Failed to retrieve orders");

      setLoading(false);

      return;
    }


    setOrders(data);

    setLoading(false);
  }


  return (
    <main className="orders-page">

      <h1>📋 My Orders</h1>


      <button
        className="orders-button"
        onClick={getOrders}
      >
        View Orders
      </button>


      {loading && (
        <p>Loading orders...</p>
      )}


      <div className="orders-table-wrapper">

        <table className="orders-table">

          <thead>

            <tr>

              <th>Food</th>

              <th>Quantity</th>

              <th>Price</th>

              <th>Name</th>

              <th>Phone</th>

            </tr>

          </thead>


          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>
                  {order.food_name}
                </td>

                <td>
                  {order.quantity}
                </td>

                <td>
                  ₹{order.price}
                </td>

                <td>
                  {order.customer_name}
                </td>

                <td>
                  {order.phone}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}

export default Orders;