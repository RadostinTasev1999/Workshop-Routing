import GameComments from "../comments/GameComments"
import { useNavigate, useParams } from "react-router"
// import { useEffect } from "react"
// import gameService from "../../services/gameService"
// import { useState } from "react"
import { Link } from "react-router"
import { useDeleteGame, useGameId } from "../../api/gameApi"
import useAuth from "../../hooks/useAuth"
import { useComments } from "../../api/commentApi"


export default function GameDetails(){

    let params = useParams()
    const { _id: userId } = useAuth()
    const navigate = useNavigate()
    const gameId = params.gameId
    const { game } = useGameId(gameId)
    const { deleteGame } = useDeleteGame()
    const { comments } = useComments(gameId)

    console.log('Comments are:', comments)

    const onDelete = async () => {
        await deleteGame(gameId)
        navigate('/games')
    }

    const isOwner = userId === game._ownerId    

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
            {
                isOwner && (
                        <div className="buttons">
                            <Link to={`/games/${game._id}/edit`} className="button">Edit</Link>
                            <a href="#" onClick={onDelete} className="button">Delete</a>
                        </div>
                )
            }
                
            </div>

            <GameComments gameId={gameId}/>

        </section>
    )
}