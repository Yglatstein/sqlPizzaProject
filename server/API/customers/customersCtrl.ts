import connection from "../../DB/database"

import jwt from "jwt-simple";
import bcrypt from 'bcrypt';
import { response } from "express";
const saltRounds = 10;


export async function getCustomerByCookie(req, res) {
    try {
      const secret = process.env.JWT_SECRET;
      const {customerId} = req.cookies

      if(!customerId) {
        res.send({results: "no user found"})
      } else{
        const jwtCustomerId = jwt.decode(customerId, secret);
      console.log(jwtCustomerId)
      const { customerID } = jwtCustomerId;
      console.log("here")
      const query = `SELECT * FROM customers WHERE customer_id = '${customerID}';`
      connection.query(query,(err, results) =>{
          if(err){
            throw err
          }
          res.send({results: results[0]})
        })
      }
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}

export async function postCustomerLogin(req, res){
    try {
        console.log("here")
        const { email, password } = req.body;
        if (!email || !password)
          throw new Error("some parameters are missing");
        const query = `SELECT * from customers WHERE email='${email}'`;
        connection.query(query, async (err, results, fields) => {
          try {
            if (err) throw err;
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (!isMatch) throw new Error("Email or password incorrect");
    
            const cookie = { customerID: results[0].customer_id };
            const secret = process.env.JWT_SECRET;
            if (!secret) throw new Error("Couldn't load secret from .env");
    
            const JWTCookie = jwt.encode(cookie, secret);
    
            res.cookie("customerId", JWTCookie);
            res.send({ ok: true, customerArray: results });
          } catch (error) {
            console.log(err);
            res.status(500).send({ ok: false, error: err });
          }
        });
      } catch (error) {
        res.status(500).send({ notOK: error });
      }
}

export async function postCustomerRegister(req, res){
    try {
        const { firstName, lastName, email, password, address, payment} = req.body;
        if (!firstName || !lastName || !email || !password || !address || !payment){
          throw new Error("missing data from client on register");
        }

        console.log("here")
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        const query = `INSERT INTO pizzaMesh.customers (first_name, last_name, email, address, payment_details, password) VALUES ('${firstName}', '${lastName}', '${email}', '${address}', '${payment}', '${hashPassword}')`;
        connection.query(query, (error, results, fields) => {
          try {
            if (error) throw error;
    
            const secret = process.env.JWT_SECRET;
            if (!secret) throw new Error("Coudln't load secret from .env");
            //@ts-ignore
            const cookie = { userID: results.insertId };
            const JWTCookie = jwt.encode(cookie, secret);
    
            res.cookie("userId", JWTCookie);
            res.send({ ok: true, message: results });
          } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, error: error });
          }
        });
      } catch (error) {
        res.status(500).send({ notOK: error });
      }
}

export async function getCustomerLogout(req, res){
    try {
        res.clearCookie("customerID");
        res.send({ success: true });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}