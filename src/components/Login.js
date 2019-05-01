import React from 'react'
import * as firebase from 'firebase'
import {Redirect} from 'react-router-dom'


export default class Login extends React.Component {

    addEmail= (e) => {

        e.preventDefault()
        const email = e.target.elements.exampleInputEmail1.value;
        const password = e.target.elements.exampleInputPassword1.value;
        console.log(email, password)

        const auth = firebase.auth()
        auth.signInWithEmailAndPassword(email,password)
            .then( () => {
                this.props.userHasAuthenticated(true)
            })
            .catch(e => {alert(e.message)})
    }

    renderRedirect = () => {

        if (this.props.isAuthenticated) {
            
          return <Redirect to = {{
                pathname: '/messaging',
            }} 
            />
        }
      }

    render(){
        return (
            
            <div className="card">

                {this.renderRedirect()}
                <form onSubmit = {this.addEmail}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"><strong>Email</strong></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>                    
                    <button type="submit" className="subbtn btn btn-outline-dark btn-block ">Login</button>
                </form>
            </div>
            
        )
    }
}