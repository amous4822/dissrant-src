import React, { Component } from 'react'
import * as firebase from "firebase";
import {Redirect} from 'react-router-dom'

export class Register extends Component {

  constructor(props){
    super(props)

    this.state = {
      redirect:false,
      groupCode:'',
    }
  }

  registerMail= async (e) => {
    e.preventDefault()
    const email = e.target.elements.InputEmail1.value;
    const password = e.target.elements.InputPassword1.value;
    const groupCode = e.target.elements.groupCode.value;
    const userName = e.target.elements.userName.value;
    this.setState({
      groupCode:groupCode
    })

    const postRef = firebase.database().ref().child('rooms/' + groupCode + "/members")
        
    postRef.once("value").then((snap) => {

      if(snap.val() != null){
        let users=[]
        snap.forEach(childSnap => {
          users.push(childSnap.val())
        })

        if(users.includes(userName)){
          alert("Another user with the same username is already present in the group")
        } else {
          this.createUser(email, password, userName, postRef, groupCode)
        }
      } else {
        this.createUser(email, password, userName, postRef,groupCode)
      }

    })
  }

  createUser = async (email, password , username, postRef, groupCode)=> {

    await firebase.auth().createUserWithEmailAndPassword(email,password)
      .catch(e => {
        alert(e.message) 
        firebase.auth().signOut() 
    })

    if(firebase.auth().currentUser != null){
      
      await firebase.auth().currentUser.updateProfile({
        displayName : username+ "~" + groupCode,
      })
    
      let newChild = postRef.push()
      newChild.set(username)

      this.setState({
        redirect:true
      })
    }
  }

  renderRedirect = () => {

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/messaging',
        state: { groupCode: this.state.groupCode }
      }} />
    }
  }

  render() {

    return (
      <div>

      {this.renderRedirect()}

      <div className="card shadow-lg">
        <form onSubmit = {this.registerMail}>

          <div className="form-group">
            <label htmlFor="InputEmail1">Email address</label>
            <input type="email" className="form-control" id="InputEmail1" placeholder="Enter email"/>
          </div>

          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input type="text" className="form-control" id="userName" placeholder="User Name"/>
          </div>

          <div className="form-group">
            <label htmlFor="groupCode">Group Code</label>
            <input type="text" className="form-control" id="groupCode" placeholder="Group Code"/>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input type="password" className="form-control" id="InputPassword1" placeholder="Password"/>
          </div>

          <button className="btn btn-primary">Register</button>
        </form>

      </div>
          
      </div>

    )
  }
}

export default Register
