import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import { supabase } from "../supabase";

function Order() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [food, setFood] = useState(null);

  const [customerName, setCustomerName] = useState("");

  const [phone, setPhone] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    getFood();

  }, [id]);


  async function getFood() {

    setLoading(true);

    const { data, error } = await supabase
      .from("foods")
      .select("*");

    if (error) {

      console.error(error);

      alert("Could not load food");

      setLoading(false);

      return;
    }

    const selectedFood = data.find(
      (item) =>
        String(item.id) === String(id)
    );

    if (!selectedFood) {

      console.log("URL ID:", id);

      console.log("Foods:", data);

      setFood(null);

    } else {

      setFood(selectedFood);

    }

    setLoading(false);
  }


  async function placeOrder() {

    if (
      !customerName.trim() ||
      !phone.trim()
    ) {

      alert(
        "Please enter your name and phone number"
      );

      return;
    }


    if (quantity < 1) {

      alert(
        "Quantity must be at least 1"
      );

      return;
    }


    const totalPrice =
      food.price * quantity;


    const { error } = await supabase
      .from("orders")
      .insert([
        {
          food_name: food.name,

          price: totalPrice,

          customer_name: customerName,

          phone: phone,

          quantity: quantity
        }
      ]);


    if (error) {

      console.error(error);

      alert("Order failed");

      return;
    }


    alert(
      "Order placed successfully! 🎉"
    );

    navigate("/orders");
  }


  if (loading) {

    return (
      <main className="order-page">
        <h2>Loading food...</h2>
      </main>
    );
  }


  if (!food) {

    return (
      <main className="order-page">

        <h2>Food not found</h2>

        <button
          onClick={() => navigate("/menu")}
        >
          Back to Menu
        </button>

      </main>
    );
  }


  return (
    <main className="order-page">

      <h1>🛒 Place Your Order</h1>


      <div className="order-food">

        <h2>{food.name}</h2>

        <p>
          🍴 Category: {food.category}
        </p>

        <p>
          💰 Price: ₹{food.price}
        </p>

      </div>


      <div className="order-form">

        <label htmlFor="customerName">
          Your Name
        </label>

        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          placeholder="Enter your name"
        />


        <label htmlFor="phone">
          Phone Number
        </label>

        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Enter phone number"
        />


        <label htmlFor="quantity">
          Quantity
        </label>

        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
        />


        <section className="order-details">

          <h3>Order Details</h3>

          <p>
            Food:
            <strong>
              {" "}{food.name}
            </strong>
          </p>

          <p>
            Quantity:
            <strong>
              {" "}{quantity}
            </strong>
          </p>

          <p>
            Total:
            <strong>
              {" "}₹{food.price * quantity}
            </strong>
          </p>

        </section>


        <button onClick={placeOrder}>
          Place Order
        </button>

      </div>

    </main>
  );
}

export default Order;