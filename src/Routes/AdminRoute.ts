import express from "express"
import { verifyToken } from "../middleware/Authorization"
import { authentication, createAdmin, dropAdmin, getAdmin, updateAdmin } from "../controller/admincontroller"
import { verifyAddAdmin, verifyAuthentication, verifyEditAdmin } from "../middleware/verifyAdmin"
const app = express()

app.use(express.json())
/** add middleware process to verify token */
app.get(`/`, getAdmin)

/** add middleware process to verify token and verify request data */
app.post(`/`, [ verifyAddAdmin], createAdmin)

/** add middleware process to varify token and verify request data */
app.put(`/:id`, [ verifyEditAdmin], updateAdmin)

/** add middleware process to verify token */
app.delete(`/:id`, dropAdmin)

/** add middleware process to verify token */
app.post(`/auth`, [verifyAuthentication], authentication)
export default app