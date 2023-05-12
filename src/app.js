import express from "express"
import cors from "cors"
import routers from "./routes/index.routes.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(routers)

app.listen(5000, () => console.log("Rodando na porta 5000"))