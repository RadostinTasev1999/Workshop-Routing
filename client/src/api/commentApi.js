import { useEffect, useReducer } from "react"
import useAuth from "../hooks/useAuth"
// import request from "../utils/requester"

import request from '../utils/requester'

const baseUrl = 'http://localhost:3030/data/comments'

function commentsReducer(state, action){
    // action = {type: 'GET_ALL', payload: response}
    // action = { type: 'ADD_COMMENT', payload: commentData }
    console.log('Action in commentsReducer is:', action)

    switch (action.type) {
        case 'GET_ALL':
            return action.payload
        case 'ADD_COMMENT':
            return [...state, action.payload]
        default:
            return state
    }
   
}


export const useComments = (gameId) => {
    //const { request } = useAuth()
    // const [gameComments, setComments] = useState([])

    const [gameComments, dispatch] = useReducer(commentsReducer,[]) // reducer is a function which knows how to update the state
    console.log('Game comments are:', gameComments)
    const { accessToken } = useAuth()

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`,
            load: `author=_ownerId:users`
        })

        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }
        console.log('URL endpoint is:', `${baseUrl}?${searchParams.toString()}`)
        request.get(`${baseUrl}?${searchParams.toString()}`,null,options)
            .then((response) => dispatch({type: 'GET_ALL', payload: response}))
    },[gameId, accessToken])
    
    return {
        gameComments,
        addComment: (commentData) => dispatch({ type: 'ADD_COMMENT', payload: commentData })
    }
}

export const useCreateComment = () => {

    const { request,email } = useAuth()

    const createComment = (comment, gameId) => {

        const payload = {
            comment,
            gameId,
            author:{
                email
            }
        }

        return request.post(baseUrl,payload)
    }

    return {
        createComment
    }

}