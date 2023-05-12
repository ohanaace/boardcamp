import { Router } from "express"
import { getGames, postNewGame } from "../controllers/games-controllers.js"
import newGameSchema from "../schemas/game.schema.js"
import validateSchema from "../middlewares/validateSchema.js"

const gamesRoutes = Router()

gamesRoutes.get("/games", getGames)
gamesRoutes.post("/games", validateSchema(newGameSchema), postNewGame)

export default gamesRoutes