import z, { email, string, url } from 'zod'


const registerUser = z.object({
    email: email(),
    password: string().min(4)
})


export const ComprobationRegister = async ({ user }) => {
    return registerUser.safeParse(user)
}