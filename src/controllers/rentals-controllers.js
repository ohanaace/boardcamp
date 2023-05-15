import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getRentals(req, res){
    try {
        const result = await db.query(`SELECT * FROM rentals;`)
        const rentals = result.rows.map(rental => {
            const date = dayjs(rental.rentDate).format("YYYY-MM-DD")
            return {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: date,
                daysRented: rental.daysRented,
                returnDate: rental.returnDate,
                originalPrice: rental.OriginalPrice,
                delayFee: rental.delayFee
            }
        })
        res.send(rentals)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postNewRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    try {
        const searchValidRental = await db.query(`
        SELECT "gameId", "customerId" FROM rentals
            JOIN games ON games.id=$1
            JOIN customers ON customers.id=$2`, [gameId, customerId])
        if(!searchValidRental.rowCount) return res.sendStatus(400)
        const availableStock = await db.query(`
        SELECT * FROM games WHERE games.id=$1
            AND (SELECT COUNT(*) FROM rentals WHERE rentals."gameId"=$1 AND rentals."returnDate" IS NULL) < games."stockTotal"`, [gameId])
        if(!availableStock.rowCount) return res.sendStatus(400)
        const date = dayjs().format("YYYY-MM-DD")
        await db.query(`INSERT INTO rentals ("gameId", "customerId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        SELECT $1, $2, $4, $3, null, games."pricePerDay" * $3, null FROM games WHERE games.id=$1;`, [gameId, customerId, daysRented, date])
        res.sendStatus(201)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRental(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}