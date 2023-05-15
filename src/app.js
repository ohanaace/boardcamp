import express from "express"
import cors from "cors"
import routers from "./routes/index.routes.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(routers)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))