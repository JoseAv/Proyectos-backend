import express from 'express'
import { getTask } from './util/getTask.js'
const app = express()

app.get('/all', getTask)
app.get('/one/:id', getTask)

app.listen(3000, () => {
    console.log('listen in port', 3000)
})