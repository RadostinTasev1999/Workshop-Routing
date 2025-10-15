import { useActionState, useContext } from "react"
import { useRegister } from "../../api/authApi"
import { UserContext } from "../../contexts/UserContext"
import {useNavigate} from "react-router"

export default function Register(){

    const navigate = useNavigate()
    const { register } = useRegister()
    const { userLoginHandler } = useContext(UserContext)

    const registerHandler = async(previousState, formData) => {

        const { email, password, 'confirm-password': rePassword } = Object.fromEntries(formData)

        if (password !== rePassword) {
            return window.alert('Passwords do not match!')
        }
        const authData = await register(email,password)

        userLoginHandler(authData)
        
        navigate('/games')

        return authData
    }

    const [state, formAction, isPending] = useActionState(registerHandler, { 'email': '', 'password': '', 'confirm-password': ''})

    console.log('State is:', state)
    

    return (
        <section id="register-page" className="content auth">
            <form id="register" action={formAction}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com"/>

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password"/>

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password"/>

                    <input className="btn submit" type="submit" value="Register" disabled={isPending}/>

                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}