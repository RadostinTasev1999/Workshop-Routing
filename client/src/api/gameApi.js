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

    const { request } = useAuth()

    // const { options } = useAuth()

    // console.log('Option in useCreateGame are:', options)
   
    const create = (gameData) => {
        return request.post(baseUrl,gameData)
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

    const { request } = useAuth()

    const edit = (gameId,payload) => {
        return request.put(`${baseUrl}/${gameId}`,payload)
    }

    return {
        edit
    }
}

export const useDeleteGame = () => {

    const { request } = useAuth()

    const deleteGame = (gameId) => {
        return request.delete(`${baseUrl}/${gameId}`,null)
    }

    return {
        deleteGame
    }

}

export const useLatestGames = () => {

    const [latestGames, setLatestGames] = useState([]);

    const PAGESIZE = 3;

   useEffect(() => {
    const searchParams = new URLSearchParams({
        sortBy: '_createdOn desc',
        pageSize: PAGESIZE,
        select: '_id,imageUrl,title' // URL-encoded string of comma-separated property names
        // The returned entries will only have the selected properties, which may greatly reduce network traffic.
    });
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then((response) => {
                if (response.code === 404) {
                    throw new Error(response.message)
                }
                setLatestGames(response)
            })
            .catch((err) => {
                console.error('On Rejection function called', err.message)
            })
   },[]);

    return {
        latestGames
    }
}