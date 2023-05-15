import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getRentals(req, res) {
    try {
        const result = await db.query(`SELECT rentals.*, games.name AS "gameName", games.id, customers.id, customers.name AS "customerName" FROM rentals
            JOIN games ON games.id = rentals."gameId"
            JOIN customers ON customers.id = rentals."customerId";`)
            const {gameName, gameId, customerName, customerId} = result.rows[0]
        const rentals = result.rows.map(rental => {
            const date = dayjs(rental.rentDate).format("YYYY-MM-DD")
            const gameInfo = {id: gameId, name: gameName}
            const customerInfo = {id: customerId, name: customerName}
            const returnedDate = rental.returnDate === null ? null : dayjs(rental.returnDate).format("YYYY-MM-DD")
            return {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: date,
                daysRented: rental.daysRented,
                returnDate: returnedDate,
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                game: gameInfo,
                customer: customerInfo
            }
        })
        res.send(rentals)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postNewRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const existentGame = await db.query(`SELECT * FROM games WHERE games.id=$1`, [gameId])
        const registeredCustomer = await db.query(`SELECT * FROM customers WHERE customers.id=$1`, [customerId])
        if (!existentGame.rowCount || !registeredCustomer.rowCount) return res.sendStatus(400)
        const availableStock = await db.query(`
        SELECT * FROM games WHERE games.id=$1
            AND (SELECT COUNT(*) FROM rentals 
            WHERE rentals."gameId"=$1 AND rentals."returnDate" IS NULL) < games."stockTotal"`, [gameId])
        if (!availableStock.rowCount) return res.sendStatus(400)
        const date = dayjs().format("YYYY-MM-DD")
        await db.query(`INSERT INTO rentals ("gameId", "customerId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        SELECT $1, $2, $4, $3, null, games."pricePerDay" * $3, null FROM games WHERE games.id=$1;`, [gameId, customerId, daysRented, date])
        res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res) {
    const { id } = req.params
    try {
        const currentRental = await db.query(`SELECT * FROM rentals WHERE rentals.id=$1`, [id])
        if (!currentRental.rowCount) return res.sendStatus(404)
        const { daysRented, rentDate, returnDate, originalPrice } = currentRental.rows[0]
        if (returnDate !== null) return res.sendStatus(400)
        const devolutionDate = dayjs().format("YYYY-MM-DD")
        const daysDiff = dayjs(devolutionDate).diff(rentDate, "d")
        console.log(daysDiff)
        let delayFee = 0
        if (daysDiff > daysRented) {
           const pricePerDay = parseInt(originalPrice / daysRented)
           console.log(pricePerDay)
            delayFee = pricePerDay * (daysDiff - daysRented)
        }
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE rentals.id=$3`, [devolutionDate, delayFee, id])
        res.sendStatus(200)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE rentals.id=$1`, [id])
        if (!rental.rowCount) return res.sendStatus(404)
        if (rental.rows[0].returnDate === null) return res.sendStatus(400)
        await db.query(`DELETE FROM rentals WHERE rentals.id=$1`, [id])
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}