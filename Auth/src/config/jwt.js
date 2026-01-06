import jwt from "jsonwebtoken";
const secret = 'esto es un secreo de prueba no usar asi'

export const signJWT = async (id) => {
    try {
        return jwt.sign({ id }, secret, { expiresIn: '1h' });
    } catch (error) {
        console.log(error)
        throw new Error('Error en la firma')
    }
}



export const verifyJWT = async (token) => {
    try {
        return await jwt.verify(token, secret)
    } catch (error) {
        throw new Error('Esto es un error')
    }
}