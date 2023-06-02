import React, { useEffect, useState } from "react";
import PizzaCard2 from "../components/pizzaCard/PizzaCard2";
import axios from "axios";


const Menu = () => {
  const [pizzas, setPizzas] = useState<any[]>([]);

  async function getMenu() {
    const { data } = await axios.get("/api/pizza");
    setPizzas(data);
  }
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div>
      {pizzas.map((pizza: any) => {
        return (
          <PizzaCard2
            pizza_id={pizza.pizza_id}
            pizza_category={pizza.pizza_category}
            pizza_name={pizza.pizza_name}
            pizza_price={pizza.pizza_price}
            pizza_description={pizza.pizza_description}
          />
        );
      })}
    </div>
  );
};

export default Menu;
