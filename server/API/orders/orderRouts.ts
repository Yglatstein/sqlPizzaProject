import express from 'express';
import { postPlaceOrder } from './orderCtrl';

const router = express.Router();

router
.post("/", postPlaceOrder)


export default router;