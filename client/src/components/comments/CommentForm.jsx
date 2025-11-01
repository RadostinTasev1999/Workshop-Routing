export default function CommentForm(
    { formAction }
){

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={formAction}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
}