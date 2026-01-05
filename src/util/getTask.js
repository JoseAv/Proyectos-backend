import { get_tasks } from '../repositories/get.js'

export const getTask = async (req, res) => {
    {
        try {
            let id = req.params.id ?? null
            const info = await get_tasks(id)
            return res.status(200).json(info)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}