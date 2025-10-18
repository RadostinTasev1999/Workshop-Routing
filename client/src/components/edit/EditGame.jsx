import { useParams } from "react-router"
//import gameService from "../../services/gameService"
import { useNavigate } from "react-router"
import { useEditGame, useGameId } from "../../api/gameApi"

export default function EditGame(){

    const params = useParams()
    const gameId = params.gameId
    const navigate = useNavigate()
    const { edit } = useEditGame()
    const { game } = useGameId(gameId)

    const editAction = async(formData) => {
        const { title, category, maxLevel, imageUrl, summary} = Object.fromEntries(formData)

        console.log('Edit form values are:', title, category, maxLevel)

        console.log('GameId is:', gameId)

        const payload = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        }

        await edit(gameId,payload)

        navigate(`/games/${gameId}`)

    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" action={editAction}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={game.title}/>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={game.category}/>

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={game.maxLevel}/>

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl}/>

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={game.summary}></textarea>
                    <input className="btn submit" type="submit" defaultValue="Edit Game"/>

                </div>
            </form>
        </section>
    )
}