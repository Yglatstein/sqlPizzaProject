import connection from "../../DB/database"
import jwt from "jwt-simple";
import bcrypt from 'bcrypt';

export async function postPlaceOrder(req, res){
    try{
        const secret = process.env.JWT_SECRET;
        const {customerId} = req.cookies
        const jwtCustomerId = jwt.decode(customerId, secret);
        const { customerID } = jwtCustomerId;

        const query = `UPDATE carts SET status = 'delivered' WHERE (customer_id = '${customerID}') ;`
        console.log(query)
        connection.query(query, (err, results, fields) => {
            try {
                if (err) {
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

