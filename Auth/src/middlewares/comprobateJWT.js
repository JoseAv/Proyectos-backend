import { verifyJWT } from '../config/jwt.js'

export const comprobateJwt = async (req, res, next) => {
    const header = req.header('Authorization')
    req.session = null
    if (header) {
        try {
            console.log(header)
            const verify = await verifyJWT(header)
            req.session = verify.id
        } catch (error) {
            req.session = null
        }
    }


    next()
}