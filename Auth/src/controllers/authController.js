import { ComprobationRegister } from '../validation/register.js'


export class AuthController {
    AutenticationModel;
    constructor(ModelAutentication) {
        this.AutenticationModel = ModelAutentication
    }


    LogIn = async (req, res) => {
        try {
            const user = req.body
            const comprobation = await ComprobationRegister({ user })

            if (!comprobation.success) {
                res.status(409).json({ message: 'Campos no validos' })
                return
            }

            res.status(200).json({ message: 'Creado con exito' })




        } catch (error) {
            res.status(400).json({ message: 'No creado el usuario' })
        }

    }



}