import { Router } from "express"
import gamesRoutes from "./games.routes.js"
import customersRoutes from "./customers.routes.js"
import rentalsRoutes from "./rentals.routes.js"

const routers = Router()

routers.use(gamesRoutes)
routers.use(customersRoutes)
routers.use(rentalsRoutes)

export default routers
