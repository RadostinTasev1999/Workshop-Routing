//import { useUserContext } from "./useUserContext";
import { UserContext } from "../contexts/UserContext"
import { useContext, useMemo } from "react";
import { useCallback } from "react";
import request from "../utils/requester"

export default function useAuth() {

    const { accessToken, ...authData } = useContext(UserContext)

    const options = {
        headers:{
            'X-Authorization': accessToken
        }
    }

    const requestWrapper = useCallback((method,url, data, options = {}) => {

        const authOptions = {
            ...options,
              headers:{
                 'X-Authorization': accessToken,
                 ...options.headers
        }
    }

    return request.baseRequest(method,url,data,accessToken ? authOptions : options)

},[accessToken])
    
     
// TODO: use UseMemo (https://react.dev/reference/react/useMemo)
// const requestObject = useMemo(() => (
//     // outer function
//     {
//             get: requestWrapper.bind(null,'GET'),
//             put: requestWrapper.bind(null,'PUT'),
//             post: requestWrapper.bind(null,'POST'),
//             delete: requestWrapper.bind(null,'DELETE')
    
// }
//     ),[requestWrapper])

    const requestObj = useMemo(() => ({
            get: requestWrapper.bind(null,'GET'),
            put: requestWrapper.bind(null,'PUT'),
            post: requestWrapper.bind(null,'POST'),
            delete: requestWrapper.bind(null,'DELETE')
    }),[requestWrapper])

    return {
        ...authData,
        isAuthenticated: !!authData.accessToken,
        userId: authData._id,
        options,
        request: requestObj
    }

}