import React, { useEffect, useState } from 'react'
import "./cart.scss"
import PizzaCartCard from '../components/pizzaCard/PizzaCartCard';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {incrementByAmount, resetTotal, cartSelector} from '../features/cart/cartSlice'




const Cart = () => {
  const countotal = useAppSelector(cartSelector);
  console.log(cartSelector)
  const dispatch = useAppDispatch();
  const [pizzas, setPizzas] = useState<any[]>([]);
  async function getCustomerCart() {
    const { data } = await axios.get("/api/cart");
    setPizzas(data);
  }
  useEffect(() => {
    getCustomerCart();
  }, []);
  return (
    <div>
        <div className="cart__container">
          <div className='row'>
            <div className='col'>
              {pizzas.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <>
                  <h5>Summary of your order</h5>
                  <div className="table">
                      {pizzas.map((item) => (
                        <PizzaCartCard pizzas={pizzas} setPizzas={setPizzas} cart_id = {item.cart_id} pizza_id={item.pizza_id}/>
                      ))}
                  </div>
                </>
              )}

              <div className="col2">
                <h6>
                  Subtotal: $
                  <span className="cart__subtotal">{countotal}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn">
                    <a href="/menu">Continue Shopping</a>
                  </button>
                  {pizzas.length === 0 ? (
                    <button disabled className="addTOCart__btn">
                      Proceed to checkout
                    </button>
                   ) : (
                    <button className="addTOCart__btn">
                      <a href="/checkout">Proceed to checkout</a>
                    </button>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart