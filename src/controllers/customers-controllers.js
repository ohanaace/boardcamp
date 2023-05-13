import { db } from "../database/database.js"

export async function getCustomers(req, res){
    try {
        const costumers = await db.query(`SELECT * FROM customers`)
        res.send(costumers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}