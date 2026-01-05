import express from 'express'
import { get_all_task } from './repositories/get.js'
const app = express()

app.get('/all', async (_, res) => {
    try {
        const info = await get_all_task()
        return res.status(200).json(info)
    } catch (error) {
        return res.status(400).json(error)
    }
})

app.get('/one/:id', async (_, res) => {
    try {


    } catch (error) {

        return res.status(400).json(error)
    }


})






app.listen(3000, () => {
    console.log('listen in port', 3000)
})