import { Router } from "express"
import { getCustomerById, getCustomers, postNewCustomer } from "../controllers/customers-controllers.js"
import customerSchema from "../schemas/customer-schema.js"
import validateSchema from "../middlewares/validateSchema.js"

const customersRoutes = Router()

customersRoutes.get("/customers", getCustomers)
customersRoutes.get("/customers/:id", getCustomerById)
customersRoutes.post("/customers", validateSchema(customerSchema), postNewCustomer)
customersRoutes.put("/customers/:id")

export default customersRoutes