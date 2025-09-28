import { useParams } from "react-router"
import { useEffect } from "react"
import gameService from "../../api/gameService"
import { useState } from "react"
import { Link } from "react-router"


export default function GameDetails(){

    let params = useParams()
    const gameId = params.gameId
    console.log('Game ID is:', gameId)
    const [game,setGame] = useState({})

    useEffect(() => {
        gameService.gameDetails(gameId)
            .then((game) => setGame(game))
    },[gameId])

    const onDelete = () => {
        console.log('Delete game')
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>


                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    <p className="no-comment">No comments.</p>
                </div>

                <div className="buttons">
                    <Link to={`/games/${game._id}/edit`}  className="button">Edit</Link>
                    <a href="#" onClick={onDelete}  className="button">Delete</a>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    )
}