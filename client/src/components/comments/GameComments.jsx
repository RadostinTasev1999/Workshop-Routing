import { useNavigate } from "react-router"
import { useCreateComment } from "../../api/commentApi"



export default function GameComments(
    { gameId }
){

    const navigate = useNavigate()
    const { createComment } = useCreateComment()

    const onCreateComment = async(formData) => {

        const { comment } = Object.fromEntries(formData)

        await createComment(comment,gameId)

        navigate(`/games/${gameId}`)
        
    }


    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={onCreateComment}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
}