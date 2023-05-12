import { Router } from "express"
import gamesRoutes from "./games.routes.js"
import costumersRoutes from "./costumers.routes.js"
import rentalsRoutes from "./rentals.routes.js"

const routers = Router()

routers.use(gamesRoutes)
routers.use(costumersRoutes)
routers.use(rentalsRoutes)

export default routers
