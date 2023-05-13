import joi from "joi"

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    cpf: joi.string().pattern(/^\d{11}$/).required(),
    birthday: joi.date().max(new Date(Date.now())).required()
})

export default customerSchema