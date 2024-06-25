import express from "express"
import path from "path"
import cors from "cors"
import AdminRoute from "./Routes/AdminRoute"
import coffeRoute from "./Routes/coffeRoute"
import orderRoute from "./Routes/order"


const app = express()
const PORT: number = 8001

app.use(cors())

app.use(`/admin`, AdminRoute)
app.use(`/coffe`, coffeRoute)
app.use(`/order`,orderRoute)
app.use(`/public`, express.static(path.join(__dirname, `public`)))
app.listen(PORT, () => console.log(`Server Coffe project run on port ${PORT}`))