import axios from 'axios';
import React, { useEffect } from 'react'
import { AiFillCheckCircle } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {incrementByAmount, resetTotal, cartSelector} from '../features/cart/cartSlice'



const Checkout = () => {
  const countotal = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  async function placeOrder(){
  const {data} = await axios.post("/api/order")
  dispatch(resetTotal())
  }
  useEffect(() => {
    placeOrder();
  }, []);
  
  return (
    <div>
       <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <AiFillCheckCircle className="checkoutIcon" />
          <h3>Thank you for your order!</h3>
        </div>
        <span>
          Your order is being processed and will be delivered as fast as
          possible.
        </span>
      </div>
    </div>
  )
}

export default Checkout