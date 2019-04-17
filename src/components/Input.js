import React from 'react'
import Posts from './Posts'
export default class Input extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            posts:[],
        }
    }

    handlePostInput =(e)=> {
        e.preventDefault()
        const newPost = e.target.elements.newPost.value
        const posts = [...this.state.posts, newPost ]
        this.setState({
            posts:posts
        })

        e.target.elements.newPost.value=""
    }

    render (){
        return (
            <div>

                <Posts allPosts = {this.state.posts}/>

                <div className= "card shadow-lg">
                <form onSubmit={this.handlePostInput}>

                    <div className= "form-group">

                    <label className="sr-only" >Post Body</label>
                    <textarea type="text" name= "newPost"/>
                    </div>


                    <button className="subbtn mb-2 btn btn-primary" type="submit">Post</button>

                </form>
                </div>

            </div>
        )
    }
}