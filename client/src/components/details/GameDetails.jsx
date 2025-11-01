import CommentForm from "../comments/CommentForm"
import GameComments from "../comments/GameComments"
import { useNavigate, useParams } from "react-router"
// import { useEffect } from "react"
// import gameService from "../../services/gameService"
// import { useState } from "react"
import { Link } from "react-router"
import { useDeleteGame, useGameId } from "../../api/gameApi"
import useAuth from "../../hooks/useAuth"
import { useComments } from "../../api/commentApi"
import { useOptimistic, useState } from "react"
import { useCreateComment } from "../../api/commentApi"
import { v4 as uuid } from 'uuid'



export default function GameDetails(){

    let params = useParams()
    const { _id: userId } = useAuth()
    const navigate = useNavigate()
    const gameId = params.gameId
    const { game } = useGameId(gameId)
    const { deleteGame } = useDeleteGame()
    const { gameComments } = useComments(gameId) // current game comments on server

    const { createComment } = useCreateComment()
    const [updatedComments, setUpdatedComments] = useState(gameComments)

    const [optimisticComments, setOptimisticComments] = useOptimistic(gameComments) // on mount initial state will be empty array
    


     const onCreateComment = async(formData) => {

        const comment = formData.get('comment')
        // optimistic update
        const newOptimisticComment = {
            gameId,
            comment,
            _id: uuid(),
            pending: true
        }

        setOptimisticComments(optmisticState => [...optmisticState, newOptimisticComment]) // update state with optimisticComment (this will trigger re-render)
        // Server update
        const newComment = await createComment(comment,gameId) // Send post request to server with body {comment, gameId}

        // Local state update
        setUpdatedComments(state => [...state, newComment]) // update updatedComments state with repsonse object from server (this will trigger re-render)
       console.log('Updated comments are:', updatedComments)
       
        navigate(`/games/${gameId}`) // trigger navigation to Details compononent (this will trigger re-render)
    }

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

                <GameComments gameComments={optimisticComments} />
                
            {
                isOwner && (
                        <div className="buttons">
                            <Link to={`/games/${game._id}/edit`} className="button">Edit</Link>
                            <a href="#" onClick={onDelete} className="button">Delete</a>
                        </div>
                )
            }
                
            </div>

            <CommentForm  formAction={onCreateComment}/>

        </section>
    )
}