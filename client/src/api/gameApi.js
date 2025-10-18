import useAuth from '../hooks/useAuth.js'
import request from '../utils/requester.js'
import { UserContext } from '../contexts/UserContext.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

const baseUrl = 'http://localhost:3030/data/games'


// export default {
//      create(gameData){
//     //    const createGame = request('POST',baseUrl,gameData)
//         const createGame = request.post(baseUrl,gameData)
       
//         return createGame
//     },
//     async getAll(){
//         const result = await request.get(baseUrl)

//         const games = Object.values(result)

//          console.log('Result from getAll method is:', games)

//         return games
//     },

//     async gameDetails(_id){
        
//         const result = await request.get(`${baseUrl}/${_id}`)

//         console.log('Game details are:', result)
//         return result

//     },

//     async editGame(payload,_id){
        
//         const result = await request.put(`${baseUrl}/${_id}`, payload)

//         return result
//     }
// }

// -----------------------------------------------



export const useCreateGame = () => {

    // const { accessToken } = useContext(UserContext)

    // const options = {
    //     header: {
    //        'X-Authorization': accessToken
    //     }
    // }

    const { options } = useAuth()

    console.log('Option in useCreateGame are:', options)
   
    const create = (gameData) => {
        return request.post(baseUrl,gameData, options)
    }

    return {
        create
    }
}

export const useGamesCatalog = () => {

    const [games, setGames] = useState([])
    

    useEffect(() => {
      request.get(`${baseUrl}`)
            .then(
                (response) => {
                    if (response.code === 404) {
                        throw new Error(response.message)
                   }else{
                    setGames(response)
                   }

                }
                   
            )
            .catch((err) => {
                console.error('Error fetching resources:',err)
                
            })
    },[])

    return {
        games    
    }

}

export const useGameId = (gameId) => {

    const [game,setGame] = useState({})

    useEffect(() => {
        request.get(`${ baseUrl}/${gameId}`)
            .then((result) => setGame(result))
    },[gameId])

    return {
        game
    }
    
}

export const useEditGame = () => {

    const { options } = useAuth()

    const edit = (gameId,payload) => {
        return request.put(`${baseUrl}/${gameId}`,payload,options)
    }

    return {
        edit
    }
}

export const useDeleteGame = () => {

    const { options } = useAuth()

    const deleteGame = (gameId) => {
        return request.delete(`${baseUrl}/${gameId}`,null,options)
    }

    return {
        deleteGame
    }

}