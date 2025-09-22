import { request } from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/games'


export default {
     create(gameData){
       const createGame = request('POST',baseUrl,gameData)

       return createGame
    },
    async getAll(){
        return request('GET',baseUrl)
    }
}
