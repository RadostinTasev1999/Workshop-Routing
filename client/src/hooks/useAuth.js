import { useUserContext } from "./useUserContext";
import { UserContext } from "../contexts/UserContext"
import request from "../utils/requester"

export default function useAuth() {

    const authData = useUserContext(UserContext);

    const options = {
        headers:{
            'X-Authorization': authData.accessToken
        }
    }

    const requestWrapper = (method,url, data, options = {}) => {

        const optionWrapper = {
            ...options,
         headers:{
            'X-Authorization': authData.accessToken,
            ...options.headers
        }
            }
            
       return request.baseRequest(method,url,data,authData.accessToken ? optionWrapper : options)
    } 

    return {
        ...authData,
        isAuthenticated: !!authData.accessToken,
        options,
        request: {
            get: requestWrapper.bind(null,'GET'),
            put: requestWrapper.bind(null,'PUT'),
            post: requestWrapper.bind(null,'POST'),
            delete: requestWrapper.bind(null,'DELETE')
        }
    }

}