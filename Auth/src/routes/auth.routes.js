import { Router } from "express";
import { AuthController } from '../controllers/authController.js'




export const RouterAuth = (ModelAutentication) => {
    const Routes = Router()
    const newAuth = new AuthController(ModelAutentication)
    Routes.post('/register', newAuth.Register)
    Routes.post('/login', newAuth.Login)

    return Routes


}