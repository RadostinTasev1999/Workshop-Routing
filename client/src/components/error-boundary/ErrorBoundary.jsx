import { Component } from "react";

export default class ErrorBoundary extends Component {

    constructor(props){
        console.log('Initialize error boundary')
        super(props)

        // Initialize state
        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }
    
    static getDerivedStateFromError(error){
        console.log('getDerivedStateFromError')
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            errorMessage: error.message
        }

    }

    /*
        Use getDerivedStateFromError() to render a fallback UI after an error has been thrown.

    */

    // componentDidCatch(error,errorInfo){
    //     console.log('Component did catch')
    // }

    

    render(){
        
        if (this.state.hasError) {
            return (
                <>
                    <h1>Error Page</h1>
                    <p>{this.state.errorMessage}</p>
                </>
            );
    }      

        return this.props.children;
    }
}