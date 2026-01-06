import express from 'express'
import { dbPostgre } from './db/connect.js'


const app = express()
app.use(express.json())




app.listen(3000, () => {
    console.log('listen in port ', 3000)
})