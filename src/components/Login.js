import React from 'react'
import * as firebase from 'firebase'
export default class Login extends React.Component {

    // constructor(props){
    //     super(props)
    // }

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
            .catch(e => {console.log(e.message)})
    }

    render(){
        return (
            
            <div className="card">
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