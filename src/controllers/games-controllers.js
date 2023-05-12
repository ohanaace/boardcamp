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