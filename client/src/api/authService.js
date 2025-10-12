import request from '../utils/requester.js'

const baseUrl = 'http://localhost:3030/jsonstore/users'

//  const useLogin = () => {

//     const login = async (email, password) => {
//         const payload = {
//             email,
//             password
//         }

//         const response = await request.post(`${baseUrl}/login`,payload)
       
//         return response
//     }

//     return {
//         login
//     }
// }

 const useRegister = () => {
    const register = async (email, password) => {
        const payload = {
            email,
            password
        }

        request.post(`${baseUrl}/register`,payload) 
    }

    return {
        register
    }

}

  export default {
    // useLogin,
    useRegister
  }