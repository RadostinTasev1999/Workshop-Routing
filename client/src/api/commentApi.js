import { useEffect, useReducer } from "react"
import useAuth from "../hooks/useAuth"


const baseUrl = 'http://localhost:3030/data/comments'

function commentsReducer(state, action){
    // action = {type: 'GET_ALL', payload: response}
    // action = { type: 'ADD_COMMENT', payload: commentData }
    // {type: 'GET_ALL', payload: response}
    // {type: 'GET_ALL', payload: response}
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
    
    const { request } = useAuth()

    const [gameComments, dispatch] = useReducer(commentsReducer,[]) // reducer is a function which knows how to update the state
    console.log('Game comments are:', gameComments)     
    

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`,
            load: `author=_ownerId:users`
        })

        
        console.log('URL endpoint is:', `${baseUrl}?${searchParams.toString()}`)
      
        request.get(`${baseUrl}?${searchParams.toString()}`,null)
            .then((response) => dispatch({type: 'GET_ALL', payload: response}))
    },[gameId,request])
    
    return {
        gameComments,
        addComment: (commentData) => dispatch({ type: 'ADD_COMMENT', payload: commentData })
    }
}

export const useCreateComment = () => {

    const { request } = useAuth()

    const createComment = (comment, gameId) => {

        const payload = {
            comment,
            gameId   
        }

        const searchParams = new URLSearchParams({
            load: 'author=_ownerId:users'
        });

        /*propName=id:collection

          propName - name of the property which will receive the matched
          object from the related collection.

          id - the name of the property from the current collection, which holds the foreigh key 
          _id.

          collection - the name of the related foreign collection.
        */ 

        return request.post(`${baseUrl}?${searchParams.toString()}`,payload)
    }

    return {
        createComment
    }

}