import { Component } from "react";
import  request  from "../../../utils/requester";

import CommentItem from './comment-item/CommentItem'

const commentsUrl = 'http://localhost:3030/data/comments'

export default class AdminComments extends Component {

    constructor(props){
        // https://www.geeksforgeeks.org/reactjs/react-constructor-and-super-keyword/
        // super call other constructor methods that is instantiated
        // it is used to access parent properties and methods from the child components.
        super(props)

        // Initialize state
        this.state = {
            comments: []
        }
    }

    async componentDidMount(){
        const comments = await request.get(commentsUrl);
        console.log('Comments are:', comments)
        this.setState({ comments }, () => {
            console.log(this.state)
        })
    }

    deleteCommentHandler(commentId){
        console.log('delete', commentId)

        this.setState({
            comments: this.state.comments.filter(comment => comment._id !== commentId)
        })

    }

    render() {
        return (
            <ul>
                {this.state.comments.map(comment => <CommentItem key={comment._id} id={comment._id} comment={comment.comment} onDelete={this.deleteCommentHandler}/>)}
            </ul>
        );
    }
}