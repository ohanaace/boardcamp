import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getCustomers(req, res){
    try {
        const costumers = await db.query(`SELECT * FROM customers`)
        res.send(costumers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postNewCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body
    try {
        const existentCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if(existentCustomer.rowCount) return res.sendStatus(409)
        const noUTCBirthday = dayjs(birthday).format("YYYY-MM-DD")
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, noUTCBirthday])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}