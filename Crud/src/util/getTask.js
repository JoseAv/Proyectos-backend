import { schemaCreate, schemaUpdate } from '../schema/validation.js'
import { get_tasks, create_task, update_task } from '../repositories/get.js'

export const getTask = async (req, res) => {
    {
        try {
            const id = req.params.id ?? null
            const info = await get_tasks(id)
            return res.status(200).json(info)
        } catch (error) {
            return res.status(400).json({ messaage: 'No se pudo obtener la tarea' })
        }
    }

}

export const postTask = async (req, res) => {
    try {
        const task = req.body
        const validation = await schemaCreate(task)
        if (!validation.success) throw new Error('No cumple la validacion')
        await create_task(task)
        return res.status(200).json({ meesage: 'Creado con exito' })
    } catch (error) {
        return res.status(400).json({ message: 'No se pudo crear' })
    }
}



export const put_task = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const task = { ...req.body, id }
        const validation = await schemaUpdate(task)
        if (!validation.success) throw new Error('No cumple la validacion')
        await update_task(task)
        return res.status(200).json({ meesage: 'Actualizado con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'no se pudo actualizarS' })
    }
}