import { Router } from "express";

const costumersRoutes = Router()

costumersRoutes.get("/costumers")
costumersRoutes.get("/costumers/:id")
costumersRoutes.post("/costumers")
costumersRoutes.put("/costumers/:id")

export default costumersRoutes