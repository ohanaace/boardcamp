import { Router } from "express";

const rentalsRoutes = Router()

rentalsRoutes.get("/rentals")
rentalsRoutes.post("/rentals")
rentalsRoutes.post("/rentals/:id/return")
rentalsRoutes.delete("/rentals/:id")

export default rentalsRoutes