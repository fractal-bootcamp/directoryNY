import api from "../../../network/api"
import { UserService } from "../../lib/services/users/service"
import SignInButton from "../compound/SignInbutton"

export const Login = () => {

    api.get('/test')
    UserService().getAll()
        .then(response => {
            console.log('All users:', response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });


    return (
        <>
            <SignInButton />
        </>
    )
}