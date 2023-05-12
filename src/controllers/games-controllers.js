import { db } from "../database/database.js"

export async function getGames(req, res) {
    try {
        const gameList = await db.query(`
        SELECT * FROM games`)
        res.send(gameList.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function postNewGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body
    try {
        const oldGame = await db.query(`SELECT * FROM games WHERE name=$1`, [name])
        if (oldGame.rowCount) return res.sendStatus(409)
        await db.query(`
        INSERT INTO games 
            (name, image, "stockTotal", "pricePerDay") 
            VALUES 
                ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}