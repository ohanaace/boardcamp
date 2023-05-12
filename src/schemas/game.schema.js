import joi from "joi"

const newGameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().positive().min(1).required(),
    pricePerDay: joi.number().integer().positive().min(1).required()
})

export default newGameSchema