import express from 'express'
import { getTask, postTask, put_task } from './util/getTask.js'
const app = express()
app.use(express.json())
app.get('/all', getTask)
app.get('/one/:id', getTask)
app.post('/create', postTask)
app.put('/update/:id', put_task)



app.listen(3000, () => {
    console.log('listen in port', 3000)
})