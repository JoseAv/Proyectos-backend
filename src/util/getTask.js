import { get_tasks, create_task, update_task } from '../repositories/get.js'

export const getTask = async (req, res) => {
    {
        try {
            const id = req.params.id ?? null
            const info = await get_tasks(id)
            return res.status(200).json(info)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}

export const postTask = async (req, res) => {
    try {
        const task = req.body
        await create_task(task)

        return res.status(200).json({ meesage: 'Creado con exito' })
    } catch (error) {
        return res.status(400).json(error)
    }
}



export const put_task = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (!id) throw new Error('id is necesary')

        const task = { ...req.body, id }
        await update_task(task)

        return res.status(200).json({ meesage: 'Actualizado con exito' })
    } catch (error) {
        return res.status(400).json(error)
    }
}