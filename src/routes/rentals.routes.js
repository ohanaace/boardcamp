import { Router } from "express"
import { deleteRental, finishRental, getRentals, postNewRental } from "../controllers/rentals-controllers.js"
import rentalSchema from "../schemas/rentals.schema.js"
import validateSchema from "../middlewares/validateSchema.js"

const rentalsRoutes = Router()

rentalsRoutes.get("/rentals", getRentals)
rentalsRoutes.post("/rentals", validateSchema(rentalSchema), postNewRental)
rentalsRoutes.post("/rentals/:id/return", finishRental)
rentalsRoutes.delete("/rentals/:id", deleteRental)

export default rentalsRoutes