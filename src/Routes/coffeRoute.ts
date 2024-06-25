import express from "express"
import { verifyToken } from "../middleware/Authorization"
import { createCoffe, dropCoffe, getCoffe, updatedCoffe } from "../controller/coffecontroller"
import uploadFile from "../middleware/uploadImageofCoffe"
import { verifyAddCoffe, verifyEditCoffe } from "../middleware/verifyCoffe"
const app = express()

app.use(express.json())
/** add middleware process to verify token */
app.get(`/`, getCoffe)

/** add middleware process to varify token, upload an image, and verify request data */
app.post(`/`, [uploadFile.single("image"), verifyAddCoffe], createCoffe)

/** add middleware process to varify token, upload an image, and verify request data */
app.put(`/:id`, [ uploadFile.single("image"), verifyEditCoffe], updatedCoffe)

/** add middleware process to verify token */
app.delete(`/:id`, dropCoffe)
export default app