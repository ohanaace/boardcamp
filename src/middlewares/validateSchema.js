import customerSchema from "../schemas/customer-schema.js"

export default function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })

        if(schema === customerSchema){
           const invalidCpf = req.body.cpf.split("").find(el => isNaN(el))
           const invalidPhone = req.body.phone.split("").find(el => isNaN(el))
            if(invalidCpf || invalidPhone) return res.status(400).send("Cadastro inválido. Verifique os campos numéricos!")
        }
        if (validation.error) {
            const errors = validation.error.details.map(error => error.message)
            return res.status(400).send(errors)
        }
        next()
    }
}