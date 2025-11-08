import { Component } from "react";
 import request from '../../../../utils/requester'

export default class CommentItem extends Component {

    constructor(props){
        super(props)
        /*
        super:
        - call other constructor methods that is instantiated
        - used to access parent properties and methods from the child component
        */

        // this.deleteClickHandler = this.deleteClickHandler.bind(this);
    }

    async deleteClickHandler(){
        console.log('Deleted!')
        
         await request.delete(`http://localhost:3030/data/comments/${this.props.id}`,null,
            {              
                headers: {
                    'X-Admin': 'admin'
                }
            }
        )

        this.props.onDelete(this.props.id)

    }

    render(){
        return (
            <li>{this.props.comment} <button onClick={this.deleteClickHandler.bind(this)}>X</button></li>
        );
    }
}
