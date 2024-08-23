import api from "../../../network/api"
import { UserService } from "../../lib/services/Users/service"
import SignInButton from "../compound/SignInbutton"

export const Login = () => {

    api.get('/test')
    UserService().getAll()




    return (
        <>
            <SignInButton />
        </>
    )
}