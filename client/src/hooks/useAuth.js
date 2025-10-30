import { useUserContext } from "./useUserContext";
import { UserContext } from "../contexts/UserContext"
import request from "../utils/requester"
import { useCallback, useMemo } from "react";

export default function useAuth() {

    const authData = useUserContext(UserContext);

    const options = {
        headers:{
            'X-Authorization': authData.accessToken
        }
    }

    const requestWrapper = useCallback((method,url, data, options = {}) => {

        const authOptions = {
            ...options,
              headers:{
                 'X-Authorization': authData.accessToken,
                 ...options.headers
        }
    }

    return request.baseRequest(method,url,data,authData.accessToken ? authOptions : options)

},[authData.accessToken])
    
     
// TODO: use UseMemo (https://react.dev/reference/react/useMemo)
const requestObject = useMemo(() => (
    // outer function
    {
            get: requestWrapper.bind(null,'GET'),
            put: requestWrapper.bind(null,'PUT'),
            post: requestWrapper.bind(null,'POST'),
            delete: requestWrapper.bind(null,'DELETE')
    
}
    ),[requestWrapper])

    return {
        ...authData,
        isAuthenticated: !!authData.accessToken,
        userId: authData._id,
        options,
        request: requestObject
    }

}