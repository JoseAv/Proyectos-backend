import bcrypt from 'bcrypt'
const saltRounds = 10;


export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds)

    } catch (Error) {
        throw new Error('Error en hash')
    }
}