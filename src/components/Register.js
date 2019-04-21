import React, { Component } from 'react'
import * as firebase from "firebase";

export class Register extends Component {

  registerMail= async (e) => {
    e.preventDefault()
    const email = e.target.elements.InputEmail1.value;
    const password = e.target.elements.InputPassword1.value;
    const groupCode = e.target.elements.groupCode.value;
    const userName = e.target.elements.userName.value;
    console.log(email, password,groupCode,userName)

    firebase.auth().createUserWithEmailAndPassword(email,password)
      .catch(e => {
        console.log(e.message)
      })
  }

  render() {
  
    return (
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

    )
  }
}

export default Register
