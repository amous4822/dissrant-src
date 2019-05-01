import React from 'react'
import Posts from './Posts'
import * as firebase from 'firebase'



export default class Input extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            groupCode: "",
            username: "",
            posts:[],
        }

        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => this.setGroupCode(user))        
    }

    setGroupCode = (user) => {

        if(user.displayName){
        this.setState({
            groupCode: user.displayName.split("~")[1],
            username: user.displayName.split("~")[0],
        })

        const postRef = firebase.database().ref().child( 'rooms/' + this.state.groupCode + '/posts' )
        postRef.on("value", snap => {
        let post=[]
        snap.forEach(childSnap => {
            post.push(childSnap.val())
        })
            this.setState({
                posts : post
            })
        })
        this.unsubscribe()
    }
    }


    handlePostInput =(e)=> {

        e.preventDefault()
        const postRef = firebase.database().ref().child( 'rooms/' + this.state.groupCode + '/posts'  )
        const newPost = this.state.username+": " + e.target.elements.newPost.value

        let newChild = postRef.push()
        newChild.set(newPost)
        
        const posts = [ ...this.state.posts, newPost ]

        this.setState({
            posts : posts
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