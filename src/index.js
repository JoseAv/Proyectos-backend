import express from 'express'
import { db } from './db/pg.js'
const app = express()



app.listen(3000, () => {
    console.log('listen in port', 3000)
})