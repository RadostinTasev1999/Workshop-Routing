import styles from './GameComments.module.css'

export default function GameComments(
    { gameComments  }
){

    console.log('Comments in Game Comments are:', gameComments)
    return (
        <>
        <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {
                              gameComments.length !== 0
                                    ?
                            (
                                gameComments.map(({_id,comment,_ownerId,pending}) => (
                                    <li key={_id} className={`comment ${pending ? styles['comment-pending'] : ''}` .trim()}>
                                        <p>{_ownerId}: {comment}</p>
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