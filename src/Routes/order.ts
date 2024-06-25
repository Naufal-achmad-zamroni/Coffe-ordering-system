import express from "express"
import { verifyToken } from "../middleware/Authorization"
import { createOrderList, dropOrder_list, getOrderList} from "../controller/order_list"
import { verifyaddList} from "../middleware/VerifyOrder_list"
const app = express()

app.use(express.json())
app.get(`/`, [], getOrderList)
app.post(`/`, [ verifyaddList], createOrderList)
app.delete(`/:id`, [verifyToken], dropOrder_list)
export default app