export class AuthController {
    AutenticationModel;
    constructor(ModelAutentication) {
        this.AutenticationModel = ModelAutentication
    }


    LogIn = (req, res) => {
        res.send('hola')
    }



}