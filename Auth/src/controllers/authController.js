import { ComprobationRegister } from '../validation/register.js'
import { hashPassword, comparePassword } from '../config/bCryp.js'


export class AuthController {
    AutenticationModel;
    constructor(ModelAutentication) {
        this.AutenticationModel = ModelAutentication
    }


    Register = async (req, res) => {
        try {
            const user = req.body
            const comprobation = await ComprobationRegister({ user })
            if (!comprobation.success) {
                res.status(409).json({ message: 'Campos no validos' })
                return
            }
            const convertPassword = await hashPassword(user.password)
            const dbResponse = await this.AutenticationModel.registerUser({ ...user, password: convertPassword })

            res.status(dbResponse.status).json({ message: dbResponse.message })
        } catch (error) {
            res.status(400).json({ message: 'Error' })
        }

    }


    Login = async (req, res) => {
        try {
            const user = req.body
            const comprobation = await ComprobationRegister({ user })

            if (!comprobation.success) {
                res.status(409).json({ message: 'Campos no validos' })
                return
            }

            const dbResponse = await this.AutenticationModel.login({ ...user })
            const userDb = dbResponse.user
            if (dbResponse.status !== 200) {
                res.status(dbResponse.status).json({ message: dbResponse.message })
                return
            }
            const compareUser = await comparePassword(user.password, userDb.password)
            res.status(dbResponse.status).json({ message: dbResponse.message })
        } catch (error) {
            res.status(400).json({ message: 'Error' })
        }

    }


}