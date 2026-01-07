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
    console.log(token)
    try {
        const comprobatio = jwt.verify(String(token).split(" ")[1], secret)
        return comprobatio
    } catch (error) {
        console.log(error)
        throw new Error('Esto es un error')
    }
}