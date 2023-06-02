import React, { FC, useEffect, useState } from "react";
import pizza1 from "../../assets/images/pizzas/mushrooms_party.png";
import pizza2 from "../../assets/images/pizzas/pinapple_pessto.png";
import pizza3 from "../../assets/images/pizzas/happy_onions.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./pizzaCard.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  incrementByAmount,
  resetTotal,
  cartSelector,
} from "../../features/cart/cartSlice";

const images = [pizza1, pizza2, pizza3];

interface PizzaCardProps {
  pizza_id: number;
  pizza_price: number;
  pizza_name: string;
  pizza_description?: string;
  pizza_category: string;
}

const PizzaCard2: FC<PizzaCardProps> = ({
  pizza_id,
  pizza_price,
  pizza_name,
  pizza_description,
  pizza_category,
}) => {
  const [user, setUser] = useState(null);
  const countotalt = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  
  async function getUserFromCookie () {
    const { data } = await axios.get("/api/customer/by-cookie");
    if (data.results != "no user found") setUser(data.results)
  }
  useEffect(() => {
    getUserFromCookie()
    }, []);

  async function addToCart() {
    console.log("user", user)
    const { data } = await axios.post(`/api/cart/${pizza_id}`);
    dispatch(incrementByAmount(pizza_price));
    alert("item added to cart")
  }

  return (
    <div className="pizza__card">
      <div className="pizza__img">
        <img src={images[pizza_id - 1]} alt="" />
      </div>
      <div className="pizza__content">
        <Link to={`/menu/${pizza_id}`}>
          <h5>{pizza_name}</h5>
        </Link>
        <span className="pizza__price">{pizza_price} </span>
        {user === null ? (
          <button disabled onClick={addToCart} className="addToCartBtn">
            <i>
              <AiOutlineShoppingCart />
            </i>
          </button>
        ) : (
          <button onClick={addToCart} className="addToCartBtn">
            <i>
              <AiOutlineShoppingCart />
            </i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PizzaCard2;
