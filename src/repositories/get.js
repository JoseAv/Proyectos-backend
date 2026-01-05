import { db } from '../db/pg.js'
import { QueryTypes } from 'sequelize'

export const get_all_task = async () => {
    try {
        const dbResponse = await db.query('select fn_get_task() as result;', {
            type: QueryTypes.SELECT,
        })

        if (!dbResponse || !dbResponse[0]) throw new Error('DB no devolvio data')

        return dbResponse[0].result
    } catch (error) {
        console.log(error)
        throw new Error(String(error))
    }

}