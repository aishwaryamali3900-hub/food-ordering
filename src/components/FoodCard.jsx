import { Link } from "react-router-dom";

function FoodCard(props) {
  return (
    <div className="food-card">

      <h2>{props.name}</h2>

      <p>🍴 Category: {props.category}</p>

      <p>💰 Price: ₹{props.price}</p>

      <Link to={`/order/${props.id}`}>
        <button>
          Order Now
        </button>
      </Link>

    </div>
  );
}

export default FoodCard;