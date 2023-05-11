import connection from "../../DB/database"

import jwt from "jwt-simple";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getCustomerCartByCookie(req, res) {
    try {
        const secret = process.env.JWT_SECRET;
        const {customerId} = req.cookies
        const jwtCustomerId = jwt.decode(customerId, secret);
        const { customerID } = jwtCustomerId;
        
        const query = `SELECT * FROM pizzaMesh.carts WHERE carts.customer_id = "${customerID}" AND carts.status != "delivered";`;
        connection.query(query, (err, results, fields) => {
            try {
                if (err) {
                    throw err;
                    console.log(err)
                }
                res.send(results);
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        });

      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}


export async function postAddPizzaToCart(req, res){
    try{
        const {pizza_id} = req.params
        console.log("pizza id  ", req.params.id, pizza_id)
        const secret = process.env.JWT_SECRET;
        console.log("secret: ", secret)
        const {customerId} = req.cookies
        const jwtCustomerId = jwt.decode(customerId, secret);
        console.log(jwtCustomerId)
        const { customerID } = jwtCustomerId;
        console.log("customer id: ", customerID)

        const query = `INSERT INTO pizzamesh.carts (customer_id, pizza_id, status) VALUES ('${customerID}', '${pizza_id}', 'open');`;
        connection.query(query, (err, results, fields) => {
            try {
                if (err){
                    console.log(err)
                    throw err;
                } 
                res.send(results);
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        });

        

    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function postUpdateCartAfterOrder(req, res){
    try{
        const {pizza_id} = req.params
        const secret = process.env.JWT_SECRET;
        const {customerID} = req.cookies
        const jwtCustomerId = jwt.decode(customerID, secret);
        const { customerId } = jwtCustomerId;

        const query = `INSERT INTO pizzamesh.carts (customer_id, pizza_id, status) VALUES("${customerId}", "${pizza_id}", "open",)`;
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
                res.send(results);
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        });

    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function deletePizzaFromCart(req, res){
    try{
        const {cart_id} = req.params
        const secret = process.env.JWT_SECRET;
        const {customerId} = req.cookies
        const jwtCustomerId = jwt.decode(customerId, secret);
        console.log(jwtCustomerId)
        const { customerID } = jwtCustomerId;

        const query = `DELETE FROM pizzamesh.carts WHERE cart_id = ${cart_id}`;
        console.log("query: ", query)
        connection.query(query, (err, results, fields) => {
            try {
                if (err) {
                    console.log(err)
                    throw err;
                }
                res.send({ok: "true"});
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        });

    }catch(error){
        res.status(500).send({error: error.message})
    }
}