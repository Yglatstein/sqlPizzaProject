import express from 'express';

import { getCustomerCartByCookie, deletePizzaFromCart , postAddPizzaToCart, postUpdateCartAfterOrder  } from './cartsCtrl';

const router = express.Router();

router
.get("/", getCustomerCartByCookie)
.post("/:pizza_id", postAddPizzaToCart)
.post("/", postUpdateCartAfterOrder)
.delete("/:cart_id", deletePizzaFromCart)



export default router;