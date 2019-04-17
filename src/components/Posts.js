import React, { Component } from 'react'

class Posts extends Component {
  render() {
    return (
      <div>
        {this.props.allPosts.map((post,index) =>{
          return (
            <div key={index} className="card post">
              {post}
            </div>
          )
        })}
      </div>
      
    )
  }
}

export default Posts
