import express from 'express'
import { RouterAuth } from './routes/auth.routes.js'
import { ModelAutentication } from './model/modelAutentication.js'
import { comprobateJwt } from './middlewares/comprobateJWT.js'

const app = express()
app.use(express.json())
app.use(comprobateJwt)

app.use('/api/auth', RouterAuth(ModelAutentication))




app.listen(3000, () => {
    console.log('listen in port ', 3000)
})