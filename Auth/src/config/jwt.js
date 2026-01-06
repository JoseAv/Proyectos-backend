const secret = 'esto es un secreo de prueba no usar asi'

export const signJWT = async (id) => {
    try {
        return await jwt.sign({ id }, secret, { expiresIn: '1h' });
    } catch (error) {
        throw new Error('Esto es un error')
    }
}



export const verifyJWT = async (token) => {
    try {
        return await jwt.verify(token, secret)
    } catch (error) {
        throw new Error('Esto es un error')
    }
}