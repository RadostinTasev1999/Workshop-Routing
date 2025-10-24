import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
// import request from "../utils/requester"
import { useState } from "react"

const baseUrl = 'http://localhost:3030/jsonstore/comments'

// export default {
//     async getAll(gameId) {
//         const comments = await request.get(baseUrl)

//         const gameComments = Object.values(comments) // Returns an array of values of the enumerable own properties of an object
//         const filteredComments = gameComments.filter((comment) => comment.gameId === gameId)

//         return filteredComments
//     },

//     create(email,gameId,comment){

//         return request.post(baseUrl, {email, gameId, comment })
//     }
// }


export const useComments = (gameId) => {
    const { request } = useAuth()
    const [comments, setComments] = useState({})

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`
        })
        
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then((response) => setComments(response))
    },[request,gameId])
    
    return {
        comments
    }
}

export const useCreateComment = () => {

    const { request } = useAuth()

    const createComment = (comment, gameId) => {
        return request.post(`${baseUrl}/${gameId}`,{comment})
    }

    return {
        createComment
    }

}