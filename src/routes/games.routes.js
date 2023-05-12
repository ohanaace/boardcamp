import { Router } from "express";
import { getGames } from "../controllers/games-controllers.js";

const gamesRoutes = Router()

gamesRoutes.get("/games", getGames)
gamesRoutes.post("/games")

export default gamesRoutes