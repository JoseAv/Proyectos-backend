import { ComprobationRegister } from '../validation/register.js'
import { hashPassword, comparePassword } from '../config/bCryp.js'
import { signJWT } from '../config/jwt.js'


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
            if (!compareUser) {
                res.status(401).json({ message: 'credenciales incorrectas' })
            }

            const token = await signJWT(userDb.id)

            res.status(dbResponse.status).json({ token, user: { id: userDb.id, email: userDb.email } })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error' })
        }

    }

    Profile = async (req, res) => {
        try {
            if (!req.session) {
                res.status(401).json({ message: 'Ruta protegida' })
            }
            const dbResponse = await this.AutenticationModel.userExist({ id: req.session })
            res.status(dbResponse.status).json({ ...dbResponse.user })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error' })
        }

    }



}