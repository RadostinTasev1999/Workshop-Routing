//import styles from './GameComments.module.css'

export default function GameComments(
    { gameComments  }
){

    console.log('Optimistic comments are:', gameComments)
    return (
        <>
        <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {
                              gameComments.length > 0
                                    ?
                            (
                                gameComments.map(({_id,comment,pending}) => (
                                    <li key={_id} className="comment" style={{ backgroundColor: pending ? 'lightgray' : ''}} >
                                        <p>Author's comment is : {comment}</p>
                                    </li>
                                ))
                            )
                            :
                            (
                               <p className="no-comment">No comments.</p>
                            )
                        }
                        
                    </ul>
                    
                </div>
        </>
        
    )
}