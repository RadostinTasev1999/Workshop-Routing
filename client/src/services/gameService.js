import request from '../utils/requester.js'

const baseUrl = 'http://localhost:3030/jsonstore/games'


export default {
     create(gameData){
    //    const createGame = request('POST',baseUrl,gameData)
        const createGame = request.post(baseUrl,gameData)
       
        return createGame
    },
    async getAll(){
        const result = await request.get(baseUrl)

        const games = Object.values(result)

         console.log('Result from getAll method is:', games)

        return games
    },

    async gameDetails(_id){
        
        const result = await request.get(`${baseUrl}/${_id}`)

        console.log('Game details are:', result)
        return result

    },

    async editGame(payload,_id){
        
        const result = await request.put(`${baseUrl}/${_id}`, payload)

        return result
    }
}
