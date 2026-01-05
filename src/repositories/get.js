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
        console.log(error)
        throw new Error(String(error))
    }

}
