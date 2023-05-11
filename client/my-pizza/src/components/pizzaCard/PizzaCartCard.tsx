import React, { FC, useEffect, useState } from "react";
import pizza1 from "../../assets/images/pizzas/mushrooms_party.png"
import pizza2 from "../../assets/images/pizzas/pinapple_pessto.png"
import pizza3 from "../../assets/images/pizzas/happy_onions.png"
import {AiOutlineShoppingCart, AiFillDelete} from "react-icons/ai";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {incrementByAmount, deccrementByAmount, resetTotal, cartSelector} from '../../features/cart/cartSlice'
import { useNavigate } from "react-router-dom";
import "./pizzaCard.scss"

import axios from "axios";
import { Navigate } from "react-router-dom";


const images = [pizza1,pizza2,pizza3]

interface PizzaCardProps {
  pizza_id: number;
  cart_id: number;
  setPizzas: CallableFunction;
  pizzas: any[];
}

const PizzaCard2: FC<PizzaCardProps> = ({
  pizza_id, cart_id, setPizzas, pizzas
}) => {
  const countotal = useAppSelector(cartSelector);
  console.log(cartSelector)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pizza_name, setPizzaName] = useState<string>("");
  const [pizza_price, setPizzaPrice] = useState<number>(0);

  async function getPizzaDetails() {
    const { data } = await axios.get(`/api/pizza/${pizza_id}`);
    console.log("pizza details: ", data.results)
    setPizzaName(data.results[0].pizza_name)
    setPizzaPrice(data.results[0].pizza_price)
    
  }
  useEffect(() => {
    getPizzaDetails();
  }, []);

  function updatePizzaArr(id: number){
    const newPizzaArray = pizzas.filter((pizza)=>pizza.pizza_id != id)
    setPizzas(newPizzaArray)
    alert("item removed to cart")
  }

  async function deleteFromCart() {
    console.log("here")
    const { data } = await axios.delete(`/api/cart/${cart_id}`);
    if(data.ok){
      dispatch(deccrementByAmount(pizza_price))
      updatePizzaArr(pizza_id)
    }
  }
  return <div className='pizza__card'>
    <div className='pizza__img'>
            <img src={images[pizza_id -1]} alt=''/>
        </div>
        <div className="pizza__content">
            <a href={`/menu/${pizza_id}`}><h5>{pizza_name}</h5></a>
            <span className="pizza__price">{pizza_price} </span>
        </div>
        <div className="delete__button">
          <button onClick={deleteFromCart}>
            <i><AiFillDelete/></i>
          </button>
        </div>
  </div>;
};

export default PizzaCard2;

// <Route path=`/pizza/:id` element={<PizzaDetails/>}/>

//pizzaDetails:
//const id = useParams()
//useEffect (() => {
//    const {data} = await axios.get("/api/pizzas/${id}")
//})