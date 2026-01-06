import z from 'zod'

const validationCreate = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
})


const validationEdit = z.object({ id: z.number().positive().int(), status: z.string() }).merge(validationCreate.partial());


export const schemaCreate = async (task) => {
    return validationCreate.safeParse(task)
}


export const schemaUpdate = async (task) => {
    return validationEdit.safeParse(task)
}