import { useEffect, useState } from "react";

import { supabase } from "../supabase";

import FoodCard from "../components/FoodCard";

function Menu() {

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoods();
  }, []);

  async function getFoods() {

    const { data, error } = await supabase
      .from("foods")
      .select("*");

    if (error) {

      console.error(error);

      alert("Failed to retrieve foods");

      return;
    }

    setFoods(data);
  }

  return (
    <main className="menu-page">

      <h1>🍔 Our Menu</h1>

      <div className="food-grid">

        {foods.map((food) => (

          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            category={food.category}
            price={food.price}
          />

        ))}

      </div>

    </main>
  );
}

export default Menu;