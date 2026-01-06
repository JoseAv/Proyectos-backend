import { describe } from 'zod/v4/core'
import { db } from '../db/pg.js'
import { QueryTypes } from 'sequelize'

export const get_tasks = async (id = null) => {
    try {
        const dbResponse = await db.query('select fn_get_task(:id) as result;', {
            replacements: {
                id
            },
            type: QueryTypes.SELECT,
        })
        if (!dbResponse || !dbResponse[0] || !dbResponse[0]?.result) throw new Error('DB no devolvio data')
        return dbResponse[0].result
    } catch (error) {
        throw new Error(String(error))
    }

}


export const create_task = async (task) => {
    try {
        return await db.query('CALL p_new_tasks(:title, :description)', {
            replacements: {
                ...task
            },
            type: QueryTypes.SELECT,
        })

    } catch (error) {
        throw new Error(String(error))
    }

}


export const update_task = async (task) => {
    try {
        return await db.query('CALL p_update_task(:id,:title, :description, :status)', {
            replacements: {
                id: task.id,
                title: task.title ?? null,
                description: task.description ?? null,
                status: task.status ?? null
            },
            type: QueryTypes.SELECT,
        })

    } catch (error) {
        throw new Error(String(error))
    }

}

