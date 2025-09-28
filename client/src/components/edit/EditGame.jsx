import { useParams } from "react-router"
import gameService from "../../api/gameService"
import { useNavigate } from "react-router"

export default function EditGame(){

    const params = useParams()
    const gameId = params.gameId
    const navigate = useNavigate()

    const editAction = (formData) => {
        const { title, category, maxLevel, imageUrl } = Object.fromEntries(formData)

        console.log('Edit form values are:', title, category, maxLevel)

        console.log('GameId is:', gameId)

        const payload = {
            title,
            category,
            maxLevel,
            imageUrl
        }

        gameService.editGame(payload,gameId)
            .then(() => navigate(`/games/${gameId}`) )

    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" action={editAction}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value=""/>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value=""/>

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value=""/>

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value=""/>

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Edit Game"/>

                </div>
            </form>
        </section>
    )
}