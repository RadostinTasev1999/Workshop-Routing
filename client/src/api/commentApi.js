import { useEffect, useReducer } from "react"
import useAuth from "../hooks/useAuth"
// import request from "../utils/requester"
import { useState } from "react"
import request from '../utils/requester'

const baseUrl = 'http://localhost:3030/data/comments'

function commentsReducer(state, action){

    switch (action.type) {
        case 'GET_ALL':
            return action.payload
        
        default:
            return state
    }
   
}


export const useComments = (gameId) => {
    //const { request } = useAuth()
    // const [gameComments, setComments] = useState([])

    const [comments, dispatch] = useReducer(commentsReducer,[]) // reducer is a function which knows how to update the state

    const { accessToken } = useAuth()

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`
        })

        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }
        
        request.get(`${baseUrl}?${searchParams.toString()}`,null,options)
            .then((response) => dispatch({type: 'GET_ALL', payload: response}))
    },[gameId, accessToken])
    
    return {
        comments,
        addComment: dispatch
    }
}

export const useCreateComment = () => {

    const { request } = useAuth()
    // const { userId } = useAuth()

    const createComment = (comment, gameId) => {

        const payload = {
            comment,
            gameId
        }

        return request.post(baseUrl,payload)
    }

    return {
        createComment
    }

}