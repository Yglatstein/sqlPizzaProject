import exp from 'constants';
import express from 'express';
import { postCustomerLogin, postCustomerRegister, getCustomerByCookie, getCustomerLogout} from './customersCtrl';

const router = express.Router();

router
.get("/by-cookie", getCustomerByCookie)
.get("/logout", getCustomerLogout)
.post("/login", postCustomerLogin)
.post("/register", postCustomerRegister)


export default router;