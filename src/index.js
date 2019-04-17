import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import App from './App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

const config = {
    apiKey: "AIzaSyDA1TNXkaL3XXjiuCf7fOxamYqR4XVfg7o",
    authDomain: "dissrant-fc0c9.firebaseapp.com",
    databaseURL: "https://dissrant-fc0c9.firebaseio.com",
    projectId: "dissrant-fc0c9",
    storageBucket: "",
    messagingSenderId: "1004262125748"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
