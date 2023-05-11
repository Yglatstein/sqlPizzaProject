import express from "express";
import connection from "./DB/database";

require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.post("/api/create-database", (req, res) => {
  const query = "create db;";
  connection.query(query, (err, results, fields) => {
    try {
      if (err) throw err;
      console.log(results);
      res.send({ results, ok: true });
    } catch (error) {
      console.log(error);
      res.send({ ok: false, error: error.message });
    }
  });
});

import cartsRoutes from "./API/carts/cartsRouts";
app.use("/api/cart", cartsRoutes)

import customersRoutes from "./API/customers/customersRouts";
app.use("/api/customer", customersRoutes)

import ordersRoutes from "./API/orders/orderRouts";
app.use("/api/order", ordersRoutes)

import pizzasRoutes from "./API/pizzas/pizzasRouts";
app.use("/api/pizza", pizzasRoutes)

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});