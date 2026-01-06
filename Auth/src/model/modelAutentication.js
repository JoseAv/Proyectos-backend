import { QueryTypes } from "sequelize"
import { dbPostgre } from '../config/db.js'

export class ModelAutentication {

    static registerUser = async ({ email, password }) => {
        try {
            const responseDb = await dbPostgre.query('select fn_register(:fn_email, :fn_password) as result;', {
                replacements: { fn_email: email, fn_password: password },
                type: QueryTypes.SELECT
            })

            return responseDb[0].result

        } catch (error) {
            console.log(error)
        }
    }


    static login = async ({ email }) => {
        try {
            const responseDb = await dbPostgre.query('select fn_login(:fn_email) as result;', {
                replacements: { fn_email: email },
                type: QueryTypes.SELECT
            })
            return responseDb[0].result

        } catch (error) {
            throw new Error('Error en la db')
        }
    }



    static userExist = async ({ id }) => {
        try {
            const responseDb = await dbPostgre.query('select fn_comprobate_user(:fn_id) as result;', {
                replacements: { id },
                type: QueryTypes.SELECT
            })
            return responseDb[0].result

        } catch (error) {
            throw new Error('Error en la db')
        }
    }




}