import { Router } from "express";
import { getCustomers } from "../controllers/customers-controllers.js";

const customersRoutes = Router()

customersRoutes.get("/customers", getCustomers)
customersRoutes.get("/customers/:id")
customersRoutes.post("/customers")
customersRoutes.put("/customers/:id")

export default customersRoutes