import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getCustomers(req, res) {
    try {
        const costumers = await db.query(`SELECT * FROM customers`)
        const results = costumers.rows.map(customer => {
            const newBirthDate = dayjs(customer.birthday).format("YYYY-MM-DD")
            return {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                cpf: customer.cpf,
                birthday: newBirthDate
            }
        })
        res.send(results)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postNewCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const existentCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if (existentCustomer.rowCount) return res.sendStatus(409)
        const noUTCBirthday = dayjs(birthday).format("YYYY-MM-DD")
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, noUTCBirthday])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])
        if (!customer.rowCount) return res.sendStatus(404)
        const result = customer.rows.map(customer => {
            const newBirthDate = dayjs(customer.birthday).format("YYYY-MM-DD")
            return {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                cpf: customer.cpf,
                birthday: newBirthDate
            }
        })
        res.send(result[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}