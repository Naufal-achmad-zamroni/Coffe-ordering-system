import express from "express"
import path from "path"
import cors from "cors"
import AdminRoute from "./src/Routes/AdminRoute"


const app = express()
const PORT: number = 8000

app.use(cors())

app.use(`/admin`, AdminRoute)

app.use(`/public`, express.static(path.join(__dirname, `public`)))
app.listen(PORT, () => console.log(`Server Egg Farm run on port ${PORT}`))