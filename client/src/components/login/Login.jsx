import { useActionState, useContext } from 'react';
import { useLogin } from '../../api/authApi'
//import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';


export default function Login(){


   //const navigate = useNavigate();

   // Every time Login component renders, useLogin() hook will be called
   const { login } = useLogin()
   const { userLoginHandler } = useContext(UserContext)
    
    const loginHandler = async(prevState,formData) => {
        /*
         When the function is called, it will receive the previous state of the form (initially the initialState that you pass,
         subsequently its previous return value) as its initial argument,
         followed by the arguments that a form action normally receives.
        */
        // console.log('Form data is:', formData)
        const values = Object.fromEntries(formData)

        const loggedUser =  await login(values.email, values.password)
        userLoginHandler(loggedUser)
        console.log('LoggedUser', loggedUser)


        //navigate('/games')

        return loggedUser
    }

    const [state, loginAction,isPending ] = useActionState(loginHandler, { email: '', password: ''});

    console.log('State is login handler is:', state)
    
    //console.log('Values are:', values)
    

    
    return (
        <section id="login-page" className="auth">
            <form id="login" action={loginAction}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com"/>

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password"/>
                    <input type="submit" className="btn submit" value="Login" disabled={isPending} />
                    <p className="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}