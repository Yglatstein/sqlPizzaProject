import connection from "../../DB/database"

export async function getPizzaByID(req, res){
    try{
        const {pizza_id} = req.params
        console.log("pizza_id: ", pizza_id)

        const query = `SELECT * FROM pizzaMesh.pizzas WHERE pizzas.pizza_id = ${pizza_id};`;
        connection.query(query, (err, results, fields) => {
            try {
                if (err) {
                    throw err;
                    console.log(err)
                }
                res.send({results});
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        });
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function getAllPizza(req, res){
    try{
        const query = `SELECT * FROM pizzaMesh.pizzas;`;
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