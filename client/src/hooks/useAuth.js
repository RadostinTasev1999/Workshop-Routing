import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { request } from "../utils/requester"

export default function useAuth(){

    const { accessToken } = useContext(UserContext)

    const options = {
        headers: {
            'X-Authorization': accessToken
        }
    }

    const requestWrapper = (method, url, data, options = {}) => {

        const optionsWrapper = {
            ...options,
            headers: {
                'X-Authorization': accessToken,
                ...options.headers
            }
        }

    return request.baseRequest(method,url, data, optionsWrapper)

    }

    return {
        accessToken,
        options,
        request: requestWrapper
    }
}