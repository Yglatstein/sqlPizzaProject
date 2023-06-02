import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import pizza1 from "../assets/images/pizzas/mushrooms_party.png"
import pizza2 from "../assets/images/pizzas/pinapple_pessto.png"
import pizza3 from "../assets/images/pizzas/happy_onions.png"
import PizzaCard2 from '../components/pizzaCard/PizzaCard2';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "./pizzaDetails.scss"

const images = [pizza1,pizza2,pizza3]
interface Pizza {
  pizza_id: number;
  pizza_category: string;
  pizza_name: string;
  pizza_price: number;
  pizza_description: string;
}

const PizzaDetails = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>(
    {
      pizza_id: 0,
      pizza_category: "null",
      pizza_name: "null",
      pizza_price: 0,
      pizza_description: "null"
    }
  );

  async function getPizzaDetails() {
    const { data } = await axios.get(`/api/pizza/${id}`);
    console.log(data.results[0])
    setPizza(data.results[0]);
  }
  async function addToCart() {
    const { data } = await axios.post(`/api/cart/${pizza.pizza_id}`);
  }
  useEffect(() => {
    getPizzaDetails();
  }, []);

  return (
    <div className='pizza__card__Details'>
    <div className='pizza__img__details'>
            <img src={images[pizza.pizza_id -1]} alt=''/>
        </div>
        <div className="pizza__content">
            <a href={`/menu/${pizza.pizza_id}`}><h5>{pizza.pizza_name}</h5></a>
            <p>{pizza.pizza_description}</p>
            <span className="pizza__price">{pizza.pizza_price} </span>
            <button onClick={addToCart} className='addToCartBtn'>
                <i><AiOutlineShoppingCart/></i>
            </button>
        </div>
  </div>
  )
}

export default PizzaDetails