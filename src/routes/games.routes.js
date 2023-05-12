import { Router } from "express";

const gamesRoutes = Router()

gamesRoutes.get("/games")
gamesRoutes.post("/games")

export default gamesRoutes