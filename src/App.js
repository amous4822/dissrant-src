import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import Routes from './components/Routes'
import * as firebase from 'firebase'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      isAuthenticated : false,
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log("user:" , user)
        this.userHasAuthenticated(true)
      } else {
        console.log("not logged in")
        this.userHasAuthenticated(false)
      }
    })
  }

  // async componentDidMount(){
  //   var user = await firebase.auth().currentUser;

  //   if (user) {
  //     this.userHasAuthenticated(true);
  //   } else {
  //     this.setState({isAuthenticated:false})
  //   }
  // }

  userHasAuthenticated = authenticated => {
    this.setState ({
      isAuthenticated : authenticated
    })

  }

  handleLogout =() => {
    
    firebase.auth().signOut()

    
  }

  render() {

    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      <div>
      <nav className="navbar navbar-expand-lg color-white">
        <Link className="navbar-brand" to="/">DissRant</Link>
        <ul className="navbar-nav ml-auto">
        { 
          this.state.isAuthenticated ? 

            <React.Fragment>
              <li onClick={this.handleLogout}><a href="/">Logout</a></li>
            </React.Fragment> :

            <React.Fragment>   
              <li><a href="/login">Login</a></li>    
              <li><a href="/register">Signup</a></li>
            </React.Fragment>
        }
        </ul>
      </nav>
      <Routes authProps = {authProps}/>
      </div>
    )  
  }
}

export default App;
