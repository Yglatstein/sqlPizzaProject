import express from 'express';
import { getPizzaByID , getAllPizza} from './pizzasCtrl';

const router = express.Router();

router
.get("/", getAllPizza)
.get("/:pizza_id", getPizzaByID)



export default router;